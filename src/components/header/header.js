import React, { useState, useEffect, useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../tengu-logo.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from "@mui/icons-material/Search";

import LoginForm from "../login/login";
import RegisterForm from "../register/register";
import SearchForm from "../searchBar/searchBar";

import { MyContext } from "../../context/mycontext";

const Header = () => {
    //login-form
    const [openLogin, setOpenLogin] = useState(false);
    const onOpenLogin = () => setOpenLogin(true);
    const onCloseLogin = () => setOpenLogin(false);
    //register-form
    const [openRegister, setOpenRegister] = useState(false);
    const onOpenRegister = () => setOpenRegister(true);
    const onCloseRegister = () => setOpenRegister(false);
    //search-from
    const [openSearch, setOpenSearch] = useState(false);
    const onOpenSearch = () => setOpenSearch(true);
    const onCloseSearch = () => setOpenSearch(false);
    // change-form-login vs register
    const onChangeForm = () => {
        setOpenLogin(!openLogin);
        setOpenRegister(!openRegister);
    }

    const { setProducts, cart } = useContext(MyContext);

    useEffect(() => {
        fetch("https://616139a79cc856001706b6eb.mockapi.io/product/product")
            .then(res => res.json())
            .then((result) => {
                // setIsLoaded(true);
                setProducts(result);
            },
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                    alert("Error!");
                }
            )
    }, [setProducts])
    return (
        <div className="header">
            <LoginForm openLogin={openLogin} onCloseLogin={onCloseLogin} onChangeForm={onChangeForm} />
            <RegisterForm openRegister={openRegister} onCloseRegister={onCloseRegister} onChangeForm={onChangeForm} />
            <SearchForm openSearch={openSearch} onCloseSearch={onCloseSearch} />
            <Box bgcolor="lightgray">
                <Container maxWidth="md" className="header__top__container">
                    <p className="header__top__phone">Hot Line: 0123456789</p>
                    <Box display="flex">
                        <Box className="header__top__text" onClick={onOpenLogin}>Đăng nhập</Box>
                        <Box className="header__top__text" onClick={onOpenRegister}>Đăng ký</Box>
                    </Box>
                </Container>
            </Box>
            <Box display="flex">
                <img src={Logo} className="header__logo" alt="Tengu-Thiết kế nội thất" />
            </Box>
            <Box m={1.5}><hr /></Box>
            <Box display="flex" justifyContent="space-between">
                <Container maxWidth="md" className="header__bot__container">
                    <Box display="flex" width="60%" justifyContent="space-between" mt={-1}>
                        <Link to="/" className="header__bot__text">HOME</Link>
                        <Link to="/product" className="header__bot__text">PRODUCT</Link>
                        <Link to="/about-us" className="header__bot__text">ABOUT US</Link>
                        <Link to="/contact" className="header__bot__text">CONTACT</Link>
                        <Link to="/hotsale" className="header__bot__text hot__sale">HOTSALE</Link>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={onOpenSearch}>
                            <SearchIcon />
                        </IconButton>
                        <Link to="/cart">
                            <IconButton aria-label="cart">
                                <Badge badgeContent={cart.length} color="info">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    </Box>
                </Container>
            </Box>
            <Box
                width="70px"
                height="1px"
                marginLeft="auto"
                marginRight="auto"
            >
                <hr style={{ border: "none", borderBottom: "3px solid red" }} />
            </Box>
        </div>
    );
}
export default Header;