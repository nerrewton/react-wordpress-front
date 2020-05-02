import { combineReducers } from "redux";
import prueba from "./prueba";
import homePost from "./homePosts";
import metadata from './metadata';

export default combineReducers({
    prueba,
    homePost,
    metadata
});