import { useState } from 'react';
import Answer from './Answer';

export default function Quiz( {questions} ) {
    // Quiz state
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Handle answer selection
    function handleSelectAnswer(selectedAnswer) {
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
            console.log('Quiz finished');
        }
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
                    <Answer answerText={questions[currentQuestion].answers[0]} onSelectAnswer={handleSelectAnswer} />
                    <Answer answerText={questions[currentQuestion].answers[1]} onSelectAnswer={handleSelectAnswer} />
                    <Answer answerText={questions[currentQuestion].answers[2]} onSelectAnswer={handleSelectAnswer} />
                    <Answer answerText={questions[currentQuestion].answers[3]} onSelectAnswer={handleSelectAnswer} />
                </ul>
            </div>
            </div>
        </div>
    )
}