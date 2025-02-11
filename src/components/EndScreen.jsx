import quizCompleteImage from '../assets/quiz-complete.png';

export default function EndScreen({score, highScore, resetQuiz, questions, userAnswers}) {
    return (
         // Display the end screen when the quiz is finished
         <div id="summary">
            <img src={quizCompleteImage} alt="Quiz Complete" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{score}</span>
                    <span className="text">Score</span>
                </p>
                <p>
                    <span className="number">{highScore}</span>
                    <span className="text">High Score</span>
                </p>
            </div>
            <ol>
                {/* Display the user's answers to each question */}
                {questions.map((question, index) => (
                    <li key={index}>
                        <h3>{index + 1}</h3>
                        <p className="question">{question.text}</p>
                        <div className="user-answer">
                            <span 
                                // If the user's answer is correct, add the 'correct' class, otherwise add the 'wrong' class
                                className={`user-answer ${
                                    userAnswers[index].userAnswer === questions[index].correctAnswer 
                                        ? ' correct' 
                                        : ' wrong'  
                                }`}
                            >
                                {userAnswers[index].userAnswer}
                            </span>
                        </div>
                    </li>
                ))}
            </ol>


    
         {/* Restart the quiz */}
         <button id="btn-restart" onClick={resetQuiz}>Restart Quiz</button>
     </div>
    );
}