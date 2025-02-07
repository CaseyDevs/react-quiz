import { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import questions from './questions';

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
            : <Quiz questions={questions} />}
        </>
    )
}

export default App;
