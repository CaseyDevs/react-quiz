import { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import questions from './questions';
import { QuizProvider } from './context/quiz-context';

// TODO:
// - Add a timer to the quiz
// Create a model for end screen
// - Add a score to the quiz
// - Add a high score to the quiz
// - Add a restart button to the quiz



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
