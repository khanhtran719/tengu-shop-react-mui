import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "../reducers/index";

export const store = createStore(
    appReducer,
    applyMiddleware(thunkMiddleware)
);