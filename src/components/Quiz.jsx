import { useState, useEffect } from 'react';
import Answer from './Answer';

export default function Quiz( {questions} ) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // Shuffle answers for the current question when the component mounts
    useEffect(() => {
        const answers = [...questions[currentQuestion].answers];
        // Shuffle answers algorithm
        for (let i = answers.length - 1; i > 0; i--) {  // Loop through the answers array
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
            [answers[i], answers[j]] = [answers[j], answers[i]]; // Swap the answers
        }
        setShuffledAnswers(answers);
    }, [questions, currentQuestion]);
    
    // Handle answer selection
    function handleSelectAnswer(selectedAnswer) {
        if(!quizFinished) {
            console.log(questions[currentQuestion].correctAnswer);
            console.log(selectedAnswer);

            // Check if the answer is correct
            if (selectedAnswer === questions[currentQuestion].correctAnswer) {
                console.log('Correct answer');
            } else {
                console.log('Wrong answer');
            }
        
            // Check if there are more questions
            if (currentQuestion < questions.length - 1) {
                handleNextQuestion();
            } else {
                setQuizFinished(true);
                console.log('Quiz finished');
            }
        }
        return;
    }

    // Handle next question
    function handleNextQuestion() {
        setCurrentQuestion(currentQuestion + 1);
    }

    return (
        <div id="quiz">
            <div id="question">
            <h2>{questions[currentQuestion].text}</h2>
            <div id="question-overview">
                <ul id="answers">
                    {/* Display shuffled answers for the current question */}
                    {shuffledAnswers.map((answer, index) => (
                        <Answer key={index} answerText={answer} onSelectAnswer={() => handleSelectAnswer(answer)} />
                    ))}
                </ul>
            </div>
            </div>
        </div>
    )
}