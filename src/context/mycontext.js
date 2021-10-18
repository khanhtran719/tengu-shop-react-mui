import { createContext, useState } from "react";

export const MyContext = createContext({
    // data and check data products
    error: null,
    setError: () => { },
    isLoaded: false,
    setIsLoaded: () => { },
    products: [],
    setProducts: () => { },
    //set fast show
    showProduct: false,
    setShowProduct: () => { },
    //set id product need to show
    idProductNeedShow: "",
    setIdProductNeedShow: () => { },
    //set cart
    cart: [],
    setCart: () => { }
});

export const MyContextProvider = ({children}) => {
    const [checkError, setCheckError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [myProducts, setMyProducts] = useState([]);
    const [myShowProduct, setMyShowProduct] = useState(false);
    const [myIdProductNeedShow, setMyIdProductNeedShow] = useState("");
    const [myCart, setMyCart] = useState([]);
    return (
        <MyContext.Provider value={{
            error: checkError,
            setError: setCheckError,
            isLoaded: loaded,
            setIsLoaded: setLoaded,
            products: myProducts,
            setProducts: setMyProducts,

            showProduct: myShowProduct,
            setShowProduct: setMyShowProduct,

            idProductNeedShow: myIdProductNeedShow,
            setIdProductNeedShow: setMyIdProductNeedShow,

            cart: myCart,
            setCart: setMyCart,
        }}>
            {children}
        </MyContext.Provider>
    );
}
