import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/header/header";
import Home from "./pages/home/home";
import Product from "./pages/product/product";
import Cart from "./pages/cart/cart";

import { MyContextProvider } from "./context/mycontext";

const App = () => {
    return (
        <MyContextProvider>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/product" component={Product} />
                    <Route path="/cart" component={Cart} />
                </Switch>
            </BrowserRouter>
        </MyContextProvider>
    );
}

export default App;
