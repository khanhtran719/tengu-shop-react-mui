import { Types } from "../actions/Types";

const initialState = {
    carts: [],
    allQuantity: 0,
    bill: 0,

};

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CartService.ADD_PRODUCT:
            if (state.allQuantity === 0) {
                let cart = {
                    id: action.product._id,
                    title: action.product.title,
                    price: Math.round((action.product.price - action.product.price * (action.product.discount_rate / 100)) / 1000) * 1000,
                    discount: action.product.discount_rate,
                    img: action.product.img,
                    quantity: 1
                }
                state.carts.push(cart);
            } else {
                let check = false;
                state.carts.map((item, key) => {
                    if (item.id === action.product._id) {
                        state.carts[key].quantity++;
                        check = true;
                    }
                    return "";
                });
                if (!check) {
                    let _cart = {
                        id: action.product._id,
                        title: action.product.title,
                        price: Math.round((action.product.price - action.product.price * (action.product.discount_rate / 100)) / 1000) * 1000,
                        discount: action.product.discount_rate,
                        img: action.product.img,
                        quantity: 1
                    }
                    state.carts.push(_cart);
                }
            }
            return {
                ...state,
                allQuantity: state.allQuantity + 1,
                bill: state.bill + Math.round((action.product.price - action.product.price * (action.product.discount_rate / 100)) / 1000) * 1000
            }
        case Types.CartService.ADD_MORE_PRODUCT:
            if (state.allQuantity === 0) {
                let Cart = {
                    id: action.product._id,
                    title: action.product.title,
                    price: Math.round((action.product.price - action.product.price * (action.product.discount_rate / 100)) / 1000) * 1000,
                    discount: action.product.discount_rate,
                    img: action.product.img,
                    quantity: action.quantity
                }
                state.carts.push(Cart);
            } else {
                let _check = false;
                state.carts.map((item, key) => {
                    if (item.id === action.product._id) {
                        state.carts[key].quantity += action.quantity;
                        _check = true;
                    }
                    return "";
                });
                if (!_check) {
                    let __cart = {
                        id: action.product._id,
                        title: action.product.title,
                        price: Math.round((action.product.price - action.product.price * (action.product.discount_rate / 100)) / 1000) * 1000,
                        discount: action.product.discount_rate,
                        img: action.product.img,
                        quantity: action.quantity
                    }
                    state.carts.push(__cart);
                }
            }
            return {
                ...state,
                allQuantity: state.allQuantity + action.quantity,
                bill: state.bill + (Math.round((action.product.price - action.product.price * (action.product.discount_rate / 100)) / 1000) * 1000) * action.quantity
            }
        case Types.CartService.DEL_PRODUCT:
            let _quantity = state.carts[action.key].quantity;
            return {
                ...state,
                bill: state.bill - state.carts[action.key].price * _quantity,
                allQuantity: state.allQuantity - _quantity,
                carts: state.carts.filter((item, key) => key !== action.key)
            }
        case Types.CartService.INCREASE_QUANTITY:
            state.carts[action.key].quantity++;
            return {
                ...state,
                bill: state.bill + state.carts[action.key].price,
                allQuantity: state.allQuantity + 1
            }
        case Types.CartService.DECREASE_QUANTITY:
            if (state.carts[action.key].quantity > 1) {
                state.carts[action.key].quantity--;
                state.allQuantity--;
                state.bill = state.bill - state.carts[action.key].price;
            }
            return {
                ...state,
            }
        case Types.CartService.CLEAR_ALL:
            return {
                carts: [],
                bill: 0,
                allQuantity: 0
            }
        default:
            return state;
    }
}