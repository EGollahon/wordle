import Keys from "./components/Keys";
import Guesses from "./components/Guesses";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {SetAnswer} from "./redux/actions/SetAnswer";

function App() {
    const dispatch = useDispatch();
    const words = useSelector(state=>state.words);

    const generateAnswer = useCallback(() => {
        let index = Math.floor(Math.random() * words.length);
        return dispatch(SetAnswer(words[index]));
    }, [dispatch, words])

    useEffect(() => {
        generateAnswer();
    }, [generateAnswer])

    const handleKeyPress = (event) => {
        console.log(event.key);
    }

    return (
      <div className="App" onKeyPress={handleKeyPress}>
        <div id="alert">Sample alert</div>
        <Guesses/>
        <Keys/>
      </div>
    );
}

export default App;