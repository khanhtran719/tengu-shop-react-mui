import {Types} from "../actions/Types";

const initialState = {
    products: [],
    categories: [],
};

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ProductService.SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case Types.ProductService.SET_CATEGORY:
            return {
                ...state,
                categories: action.category
            }
        default:
            return state;
    }
}
