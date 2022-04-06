import Guess from "./Guess";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function Guesses() {
    const guesses = useSelector(state=>state.guesses);
    const change = useSelector(state=>state.change);
    const [gs, setGS] = useState(guesses);

    useEffect(() => {
        setGS(guesses);
    }, [change, guesses])

    let guessEles = gs.map((item, index) =>
        <Guess key={index} vl={item} top={(index * 67) + 'px'} />
    )

    return (
        <div id="guesses">
            {guessEles}
        </div>
    )
}

export default Guesses;