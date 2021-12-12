import {Types} from "./Types";

//account
export const actLogin = (account) => {
    return {
        type: Types.AccountService.IS_LOGIN,
        account: account
    }  
}
export const actLogout = () => {
    return {
        type: Types.AccountService.IS_LOGOUT,
    }  
}
export const actAutoLogin = (account, token) => {
    return {
        type: Types.AccountService.AUTO_LOGIN,
        account: account,
        token: token
    }  
}
export const actRegister = (account, token) => {
    return {
        type: Types.AccountService.REGISTER_SUCCESS,
        account: account,
        token: token
    }
}

// Cart
export const actAddProduct = (product) => {
    return {
        type: Types.CartService.ADD_PRODUCT,
        product: product
    }
}
export const actAddMoreProduct = (product, quantity) => {
    return {
        type: Types.CartService.ADD_MORE_PRODUCT,
        product: product,
        quantity: quantity
    }
}
export const actDelProduct = (key) => {
    return {
        type: Types.CartService.DEL_PRODUCT,
        key: key
    }
}
export const actIncreaseQuantity = (key) => {
    return {
        type: Types.CartService.INCREASE_QUANTITY,
        key: key
    }
}
export const actDecreaseQuantity = (key) => {
    return {
        type: Types.CartService.DECREASE_QUANTITY,
        key: key
    }
}
export const actClearAll = () => {
    return {
        type: Types.CartService.CLEAR_ALL
    }
}
//products
export const actSetProduct = (products) => {
    return {
        type: Types.ProductService.SET_PRODUCTS,
        products: products
    }
}
export const actSetCategory = (category) => {
    return {
        type: Types.ProductService.SET_CATEGORY,
        category: category
    }
}
export const actKindOfCategory = (key) => {
    return {
        type: Types.ProductService.KIND_OF_CATEGORY,
        key: key
    }
}
export const actKindOfView = (key) => {
    return {
        type: Types.ProductService.KIND_OF_VIEW,
        key: key
    }
}