import Answer from './Answer';

export default function Quiz( {questions} ) {
    return (
        <div id="quiz">
            <div id="question">
            <h2>Example in react haha</h2>
            <div id="question-overview">
                <ul id="answers">
                    <Answer answerText="Option 1" onSelectAnswer={() => {}} />
                    <Answer answerText="Option 2" onSelectAnswer={() => {}} />
                    <Answer answerText="Option 3" onSelectAnswer={() => {}} />
                    <Answer answerText="Option 4" onSelectAnswer={() => {}} />
                </ul>
            </div>
            </div>
        </div>
    )
}