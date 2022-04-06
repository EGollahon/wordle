import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import initState from "./initState";

function configureStore(state = initState()) {
    return createStore(rootReducer, state);
}

export default configureStore;