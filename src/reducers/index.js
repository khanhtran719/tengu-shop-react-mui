import { combineReducers } from "redux";
import { CartReducer } from "./CartReducer";
import { AccountReducer } from "./AccountReducer";
import { ProductReducer } from "./ProductReducer";

export const appReducer = combineReducers({
    Cart: CartReducer,
    Account: AccountReducer,
    Product: ProductReducer
});