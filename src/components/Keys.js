import Key from "./Key";
import {useDispatch} from "react-redux";
import {Delete} from "../redux/actions/Delete";
import {SubmitGuess} from "../redux/actions/SubmitGuess";

function Keys() {
    const dispatch = useDispatch();
    const keys = 'qwertyuiopasdfghjklzxcvbnm'.split("");

    let keysEle = keys.map((item, index) =>
        <Key key={index} vl={item} />
    )

    return (
        <div id="keys">
            {keysEle}
            <div className="key enter" onClick={() => dispatch(SubmitGuess())}>Enter</div>
            <div className="key delete" onClick={() => dispatch(Delete())}>Delete</div>
        </div>
    )
}

export default Keys;