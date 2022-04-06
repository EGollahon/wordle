import GuessLetter from "./GuessLetter";

function Guess(props) {
    let guessLetterEles = props.vl.map((item, index) =>
        <GuessLetter key={index} vl={item} left={(index * 67) + 'px'} />
    )

    return (
        <div className="guess" style={{top: props.top, animation: 'boxVibrate 0.3s 1'}}>
            {guessLetterEles}
        </div>
    )
}

export default Guess;