import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../tengu-logo.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from "@mui/icons-material/Search";

import LoginForm from "../login/login";
import RegisterForm from "../register/register";
import SearchForm from "../searchBar/searchBar";

import { useDispatch, useSelector } from "react-redux";
import { actSetProduct, actAutoLogin, actLogout, actSetCategory } from "../../actions/index";

const Header = () => {
    const dispatch = useDispatch();
    const carts = useSelector(state => state.Cart);
    const Account = useSelector(state => state.Account);
    const [redirect, setRedirect] = useState(false);
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
    //
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        fetch("https://tengu-nodejs.herokuapp.com/api/product/")
            .then(res => res.json())
            .then((result) => {
                dispatch(actSetProduct(result));
            },
                (error) => {
                    alert("Error!");
                }
            )
    }, [dispatch]);
    useEffect(() => {
        fetch("https://tengu-nodejs.herokuapp.com/api/category/all")
            .then(res => res.json())
            .then((result) => {
                dispatch(actSetCategory(result));
            },
                (error) => {
                    alert("Error!");
                }
            )
    }, [dispatch]);
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            axios.post('https://tengu-nodejs.herokuapp.com/api/auth/time-expired', {}, { headers: { "token": token } })
                .then(response => {
                    if (response.data.status_code === 200) {
                        dispatch(actAutoLogin(response.data.data, token));
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [dispatch])
    const accountForm = () => {
        return (
            <Box display="flex">
                <Box display="flex" onClick={handleClick} sx={{ cursor: "pointer" }}>
                    <Avatar sx={{ width: 18, height: 18, p: 0.25, m: 0.25, bgcolor: "#F28705" }}>K</Avatar>
                    <Box
                        pt={0.5}
                        pl={0.5}
                        fontFamily="Tahoma"
                        fontSize="14px"
                    >
                        {Account.account.firstName + " " + Account.account.lastName}
                    </Box>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <Link to="/account" style={{
                            textDecoration: "none",
                            color: "black"
                        }}>
                            Tài khoản của tôi
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        Đơn mua
                    </MenuItem>
                    <MenuItem onClick={() => {
                        dispatch(actLogout());
                        setRedirect(true);
                        localStorage.setItem("access_token", "");
                    }}>
                        Đăng xuất
                    </MenuItem>
                </Menu>
            </Box>
        );
    }
    const loginAndRegisterForm = () => {
        return (
            <Box display="flex">
                <Box className="header__top__text" onClick={onOpenLogin}>Đăng nhập</Box>
                <Box className="header__top__text" onClick={onOpenRegister}>Đăng ký</Box>
            </Box>
        );
    }
    return (
        <div className="header">
            {redirect ? <Redirect to="/"/> : ""}
            <LoginForm openLogin={openLogin} onCloseLogin={onCloseLogin} onChangeForm={onChangeForm} setRedirect={setRedirect}/>
            <RegisterForm openRegister={openRegister} onCloseRegister={onCloseRegister} onChangeForm={onChangeForm} setRedirect={setRedirect}/>
            <SearchForm openSearch={openSearch} onCloseSearch={onCloseSearch} />
            <Box bgcolor="lightgray">
                <Container maxWidth="md" className="header__top__container">
                    <p className="header__top__phone">Hot Line: 0123456789</p>
                    {Account.isLogin ? accountForm() : loginAndRegisterForm()}
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
                                <Badge badgeContent={carts.allQuantity} color="info">
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