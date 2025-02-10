import { createContext, useContext, useState } from "react";

// Quiz context
const QuizContext = createContext();

// Quiz provider
export function QuizProvider({ children }) {
    // Quiz state
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);

    // Quiz context value that will be used by the quiz component
    const value = {
        currentQuestion,
        setCurrentQuestion,
        quizFinished,
        setQuizFinished,
        score,
        setScore,
        highScore,
        setHighScore
    }
    
    return (
        // Provide the quiz context value to the quiz component
        <QuizContext.Provider value={ value}>
            {children}
        </QuizContext.Provider>
    )
}

// Quiz hook to access the quiz context
export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
}