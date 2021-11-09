import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/header/header";
import Home from "./pages/home/home";
import Product from "./pages/product/product";
import Cart from "./pages/cart/cart";
import Payments from "./pages/payments/payments";
import AboutUs from "./pages/aboutus";
import Contact from "./pages/contact";
import HotSale from "./pages/hotsale";

import { MyContextProvider } from "./context/mycontext";

const App = () => {
    return (
        <MyContextProvider>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/product" component={Product} />
                    <Route path="/cart" exact component={Cart} />
                    <Route path="/cart/payments" component={Payments} />
                    <Route path="/about-us" component={AboutUs}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/hotsale" component={HotSale}/>
                </Switch>
            </BrowserRouter>
        </MyContextProvider>
    );
}

export default App;
