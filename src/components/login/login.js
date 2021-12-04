import React, { useState, useContext } from "react";
import axios from "axios";
import "./login.css";
import LoginImg from "../../assets/img__login.png";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slide from '@mui/material/Slide';

import { MyContext } from "../../context/mycontext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({openLogin, onCloseLogin, onChangeForm}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMess, setErrorMess] = useState(false);

    const {setIsLogin} = useContext(MyContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== "" || password !== ""){
            axios.post('https://tengu-nodejs.herokuapp.com/api/auth/login/',{email, password})
            .then(response => {
                localStorage.setItem("access_token", response.data.accessToken);
                setIsLogin(true);
                setEmail("");
                setPassword("");
                setErrorMess(false);
                onCloseLogin();
            })
            .catch(error => {
                setErrorMess(true);
            })
        }
        
    }
    const closeForm = () => {
        onCloseLogin();
        setEmail("");
        setPassword("");
        setErrorMess(false);
    }
    const changeForm = () => {
        onChangeForm();
        setEmail("");
        setPassword("");
        setErrorMess(false);
    }
    const errorMessage = () => {
        return (
            <Box sx={{border: "1px solid black", p: 1, m: 2, color: "red", fontFamily: "Tahoma"}}>
                Tài khoản hoặc Mật khẩu không đúng, Vui lòng thử lại!
            </Box>
        );
    }
    return (
        <Dialog open={openLogin} onClose={closeForm} TransitionComponent={Transition}>
            <form className="form__login" onSubmit={handleSubmit}>
                <img src={LoginImg} width="50%" alt="Decor-Make my house" />
                <Box ml={2} mr={2}>
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
                        sx={{width: "100%", marginBottom: "15px"}}
                    />
                    <TextField
                        label="Password"
                        // variant="filled"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        size="small"
                        sx={{width: "100%", marginBottom: "15px"}} 
                    />
                    <Box width="100%" mt={2}>
                        <Button type="submit" sx={{width: "100%"}} variant="contained" color="error">
                            Đăng nhập
                        </Button>
                    </Box>
                    <p className="text__change">Nếu chưa có tài khoản, vui lòng đăng kí <span className="text__change__click" onClick={changeForm}>tại đây</span></p>
                </Box>
            </form>
        </Dialog>
    );
}
export default Login;