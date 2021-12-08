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
import Account from "./pages/account";
import DetailsProduct from "./pages/product/detailsProduct";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product" component={Product} />
                <Route path="/cart" component={Cart} />
                <Route path="/payments" component={Payments} />
                <Route path="/about-us" component={AboutUs} />
                <Route path="/contact" component={Contact} />
                <Route path="/hotsale" component={HotSale} />
                <Route path="/product/:id" component={DetailsProduct} />
                <Route path="/account" component={Account} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
