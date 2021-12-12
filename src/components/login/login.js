import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import LoginImg from "../../assets/img__login.png";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slide from '@mui/material/Slide';
import { Typography, IconButton } from "@mui/material";
import {
    ArrowBack
} from "@mui/icons-material"

import { useDispatch } from "react-redux";
import { actLogin } from "../../actions/index";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({ openLogin, onCloseLogin, onChangeForm, setRedirect }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMess, setErrorMess] = useState(false);
    const [forgotPass, setForgotPass] = useState(false);
    const [emailForgot, setEmailForgot] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!forgotPass) {
            axios.post('https://tengu-nodejs.herokuapp.com/api/auth/login/', { email, password })
                .then(response => {
                    if (response.data.status_code === 404) {
                        console.log("error")
                    } else {
                        dispatch(actLogin(response.data));
                        localStorage.setItem("access_token", response.data.accessToken);
                        setRedirect(false);
                        closeForm();
                    }
                })
                .catch(error => {
                    setErrorMess(true);
                })
        } else {
            axios.post('https://tengu-nodejs.herokuapp.com/api/auth/forgot-password', { email: emailForgot })
                .then(response => {
                    if (response.data.status_code === 200) {
                        alert("Kiểm tra email để lấy lại mật khẩu");
                    }
                    else {
                        alert("Email không đúng!")
                    }
                    setEmailForgot("");
                    setForgotPass(false);
                    resetAll();
                })
        }
    }
    const closeForm = () => {
        onCloseLogin();
        resetAll();
    }
    const changeForm = () => {
        onChangeForm();
        resetAll();
    }
    const resetAll = () => {
        setEmail("");
        setPassword("");
        setErrorMess(false);
    }
    const errorMessage = () => {
        return (
            <Box sx={{ border: "1px solid black", p: 1, m: 2, color: "red", fontFamily: "Tahoma" }}>
                Tài khoản hoặc Mật khẩu không đúng, Vui lòng thử lại!
            </Box>
        );
    }
    const formLogin = () => {
        return (
            <Box>
                <p className="login__title">Đăng nhập</p>
                {errorMess ? errorMessage() : ""}
                <TextField
                    label="Email"
                    // variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    size="small"
                    sx={{ width: "100%", marginBottom: "15px" }}
                />
                <TextField
                    label="Password"
                    // variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    size="small"
                    sx={{ width: "100%", marginBottom: "5px" }}
                />
                <Typography
                    onClick={() => setForgotPass(true)}
                    sx={{
                        fontSize: 14,
                        color: "blue",
                        cursor: "pointer",
                        ":hover": {
                            textDecoration: "underline"
                        }
                    }}
                >
                    Quên mật khẩu
                </Typography>
                <Box width="100%" mt={1}>
                    <Button type="submit" sx={{ width: "100%" }} variant="contained" color="error">
                        Đăng nhập
                    </Button>
                </Box>
            </Box>
        );
    }
    const formForgotPass = () => {
        return (
            <Box width="100%">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ mt: 5, mb: 8 }}
                >
                    <IconButton onClick={() => {
                        setForgotPass(false);
                        resetAll();
                    }}>
                        <ArrowBack />
                    </IconButton>
                    <Box></Box>
                </Box>
                <TextField

                    label="Nhập email tài khoản"
                    // variant="filled"
                    type="email"
                    required
                    value={emailForgot}
                    onChange={e => setEmailForgot(e.target.value)}
                    size="small"
                    sx={{ marginBottom: "15px", mx: 3 }}
                />
                <Button type="submit" sx={{ width: 210, mx: 3 }} variant="contained" color="error">
                    Xác nhận
                </Button>
            </Box>
        );
    }
    return (
        <Dialog open={openLogin} onClose={closeForm} TransitionComponent={Transition}>
            <form className="form__login" onSubmit={handleSubmit}>
                <img src={LoginImg} width="50%" alt="Decor-Make my house" />
                <Box mx={2} width="100%">
                    {forgotPass ? formForgotPass() : formLogin()}
                    <p className="text__change">Nếu chưa có tài khoản, vui lòng đăng kí <span className="text__change__click" onClick={changeForm}>tại đây</span></p>
                </Box>
            </form>
        </Dialog>
    );
}
export default Login;