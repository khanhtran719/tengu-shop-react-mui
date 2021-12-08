import { Types } from "../actions/Types";

const initialState = {
    isLogin: false,
    account: {},
    token: '',
}

export const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.AccountService.IS_LOGIN :
            return {
                ...state,
                isLogin: true,
                account: action.account,
                token: action.account.accessToken,
            }
        case Types.AccountService.IS_LOGOUT :
            return {
                ...state,
                isLogin: false,
                account: {},
                token: '',
            }
        case Types.AccountService.AUTO_LOGIN : 
            return {
                ...state,
                isLogin: true,
                account: action.account,
                token: action.token,
            }
        case Types.AccountService.REGISTER_SUCCESS: 
            return {
                ...state,
                isLogin: true,
                account: action.account,
                token: action.token,
            }
        default:
            return state;
    }
}