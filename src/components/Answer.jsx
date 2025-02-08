export default function Answer( {answerText, onSelectAnswer, disabled} ) {
    return (
        <li className="answer">
            <button 
                onClick={onSelectAnswer}
                disabled={disabled}
            >
                {answerText}
            </button>
        </li>
    )
}