import logo from '../assets/quiz-logo.png';

export default function Header() {
    return (
        <header>
            <div>
                <img src={logo} alt="Quiz App Logo" />
                <h1>React Quiz</h1>
            </div>
        </header>
    )
}