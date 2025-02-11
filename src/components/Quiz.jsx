import { useState, useEffect } from 'react';
import { useQuiz } from '../context/quiz-context';
import { shuffleArray } from '../utils/quizUtils';
import Answer from './Answer';
import ProgressBar from './ProgressBar';
import EndScreen from './EndScreen';

export default function Quiz( {questions} ) {
    // Quiz context values
    const { currentQuestion, 
        setCurrentQuestion, 
        quizFinished, 
        setQuizFinished, 
        score, 
        setScore,
        highScore,
        setHighScore
    } = useQuiz();

    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    // Shuffle answers for the current question when the component mounts
    useEffect(() => {
        if (!questions?.[currentQuestion]) {
            return;
        }
        const shuffled = shuffleArray(questions[currentQuestion].answers);
        setShuffledAnswers(shuffled);
    }, [questions, currentQuestion]);

    // Move to the next question when the timer ends
    function moveToNextQuestion() {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizFinished(true);
        }
    }
    
    // Handle answer selection
    function handleSelectAnswer(selectedAnswer) {
        // Add the selected answer to the userAnswers array
        setUserAnswers(prevAnswers => [...prevAnswers, {
            userAnswer: selectedAnswer,
        }]);

        // If the quiz is finished, update the high score and reset the quiz
        if (quizFinished) {
            return;
        }


        // Check if the selected answer is correct
        const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
       
        // If the selected answer is correct, increment the score
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
            
        }

        // If the current question is the last question, update the high score
        if (currentQuestion === questions.length - 1) {
            // If the answer is correct, increment the score
            const finalScore = isCorrect ? score + 1 : score;

            // If the final score is greater than the high score, update the high score
            if (finalScore > highScore) {
                updateHighScore(finalScore);
                localStorage.setItem('highScore', finalScore);
            }
        }

        moveToNextQuestion();
    }

    // Handle timer end
    function handleTimerEnd() {
        if (quizFinished) return;
        moveToNextQuestion();
    }

    function updateHighScore(score) {
        // Get the high score from local storage
        const highScore = localStorage.getItem('highScore') || 0;
        // If the score is greater than the high score, update the high score
        if (score > highScore) {
            setHighScore(score);
            // Update the high score in local storage
            localStorage.setItem('highScore', score);
        }
    }

    // Reset the quiz  
    function resetQuiz() {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
        setUserAnswers([]);
        setShuffledAnswers([]);
    }


    return (
        <div id="quiz">
            {!quizFinished ? (
            <div id="question">
                <div className="quiz-status">
                    Question {currentQuestion + 1} of {questions.length}
                </div>
                {/* Display the current question */}
                <h2>{questions[currentQuestion].text}</h2>
                <div id="question-overview">
                    <ul id="answers">
                        {/* Display the shuffled answers for the current question */}
                        {shuffledAnswers.map((answer, index) => (
                            <Answer 
                                key={`${answer}-${index}`}
                                answerText={answer}
                                onSelectAnswer={() => handleSelectAnswer(answer)}
                                disabled={quizFinished}
                            />
                        ))}
                    </ul>
                </div>
                {/* Display the progress bar */}
                {!quizFinished && 
                <ProgressBar 
                  key={currentQuestion} // key is used to reset the timer when moving to a new question
                  timer={5000} 
                  onTimerEnd={handleTimerEnd} 
                />
                }
            </div>
            ) : (
                // Display the end screen when the quiz is finished
                <EndScreen score={score} highScore={highScore} questions={questions} resetQuiz={resetQuiz} userAnswers={userAnswers} />
            )}
        </div>
    );
}