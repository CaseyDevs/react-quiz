import { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import questions from './questions';
import { QuizProvider } from './context/quiz-context';

// TODO:
// - Create an end screen
// - Add a high score to the quiz
// - Add a restart button to the quiz
// - Reset the timer when the question changes
// - If timer runs out, mark the question as answered incorrectly
// - Highlight answer green if correct, red if incorrect
                

function App() {
    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);

    // Start quiz handler
    function handleStartQuiz() {
        setQuizStarted(true);
    }

    return (
        <>
            <Header />
            {/* Quiz start button displayed only if quiz is not started */}
            {!quizStarted ?
             <button onClick={handleStartQuiz} id="start-quiz-button">
                Start Quiz
            </button>
            : <QuizProvider>
                <Quiz questions={questions} />
            </QuizProvider>}
        </>
    )
}

export default App;
