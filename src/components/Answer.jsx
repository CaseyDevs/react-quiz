export default function Answer( {answerText, onSelectAnswer} ) {
    return (
        <li className="answer">
            <button onClick={onSelectAnswer}>{answerText}</button>
        </li>
    )
}