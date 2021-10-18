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
import Input from "@mui/material/Input";

import LoginForm from "../login/login";
import RegisterForm from "../register/register";

import { MyContext } from "../../context/mycontext";

const Header = () => {
    //login-form
    const [openLogin, setOpenLogin] = useState(false);
    const onOpenLogin = () => setOpenLogin(true);
    const onCloseLogin = () => setOpenLogin(false);
    //register-form
    const [openRegister, setOpenRegister] = React.useState(false);
    const onOpenRegister = () => setOpenRegister(true);
    const onCloseRegister = () => setOpenRegister(false);
    // change-form-login vs register
    const onChangeForm = () => {
        setOpenLogin(!openLogin);
        setOpenRegister(!openRegister);
    }

    const { setProducts, setIsLoaded, setError, cart } = useContext(MyContext);

    useEffect(() => {
        fetch("https://616139a79cc856001706b6eb.mockapi.io/product/product")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProducts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    return (
        <div className="header">
            <LoginForm openLogin={openLogin} onCloseLogin={onCloseLogin} onChangeForm={onChangeForm} />
            <RegisterForm openRegister={openRegister} onCloseRegister={onCloseRegister} onChangeForm={onChangeForm} />
            <Box bgcolor="lightgray">
                <Container maxWidth="md" className="header__top__container">
                    <p className="header__top__phone">Hot Line: 0123456789</p>
                    <Box display="flex">
                        <a className="header__top__text" onClick={onOpenLogin}>Đăng nhập</a>
                        <a className="header__top__text" onClick={onOpenRegister}>Đăng ký</a>
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
                        <a className="header__bot__text">ABOUT US</a>
                        <a className="header__bot__text">CONTACT</a>
                        <a className="header__bot__text hot__sale">HOTSALE</a>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <Box display="flex" >
                            <Input placeholder="Tìm kiếm sản phẩm" inputProps={{ 'aria-label': 'description' }} />
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </Box>
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
                <hr style={{border: "none", borderBottom: "3px solid red"}}/>
            </Box>
        </div>
    );
}
export default Header;