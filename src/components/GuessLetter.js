import {useEffect, useState} from "react";

function GuessLetter(props) {
    let [animation, setAnimation] = useState('none');

    let styles = {
        left: props.left,
        animation: animation
    }

    useEffect(() => {
        setAnimation('boxBounce 0.2s 1');
        setTimeout(function() {
            setAnimation('none');
        }, 200);
    }, [props.vl])

    return (
        <div className="guessLetter" style={styles}>
            {props.vl}
        </div>
    )
}

export default GuessLetter;