import {useDispatch} from "react-redux";
import {InputLetter} from "../redux/actions/InputLetter";

function Key(props) {
    const dispatch = useDispatch();

    return (
        <div className="key" onClick={() => dispatch(InputLetter(props.vl))}>
            {props.vl}
        </div>
    )
}

export default Key;