import { useState, useEffect } from 'react';
import { useQuiz } from '../context/quiz-context';
import { shuffleArray } from '../utils/quizUtils';
import Answer from './Answer';
import ProgressBar from './ProgressBar';

export default function Quiz( {questions} ) {
    // Quiz context values
    const { currentQuestion, 
        setCurrentQuestion, 
        quizFinished, 
        setQuizFinished, 
        score, 
        setScore 
    } = useQuiz();

    const [shuffledAnswers, setShuffledAnswers] = useState([]);

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
        // If the quiz is finished, do nothing
        if (quizFinished) return;

        // Check if the selected answer is correct
        const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
       
        // If the selected answer is correct, increment the score
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        // If there are no questions, display a message (this should never happen)
        if(!questions?.length) {
            return <div>No questions available</div>;
        }

        moveToNextQuestion();
    }

    // Handle timer end
    function handleTimerEnd() {
        if (quizFinished) return;
        moveToNextQuestion();
    }

    return (
        <div id="quiz">
            <div id="question">
                <div className="quiz-status">
                    Question {currentQuestion + 1} of {questions.length}
                    {/* If the quiz is finished, display the final score */}
                    {quizFinished && <div>Final Score: {score}/{questions.length}</div>}
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
                {!quizFinished && <ProgressBar key={currentQuestion} timer={5000} onTimerEnd={handleTimerEnd} />}
            </div>
        </div>
    );
}