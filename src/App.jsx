import { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';

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
            {!quizStarted ?
             <button onClick={handleStartQuiz} id="start-quiz-button">
                Start Quiz
            </button>
            : <Quiz />}
        </>
    )
}

export default App;
