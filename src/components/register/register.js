import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import LoginImg from "../../assets/img__login.png";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slide from '@mui/material/Slide';

import { useDispatch } from "react-redux";
import { actRegister } from "../../actions/index";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({ openRegister, onCloseRegister, onChangeForm, setRedirect }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const clearAll = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName !== "" || lastName !== "" || email !== "" || password !== ""){
            axios.post('https://tengu-nodejs.herokuapp.com/api/auth/register/', {
                email,
                password,
                firstName,
                lastName
            })
            .then(response => {
                dispatch(actRegister(response.data.customer, response.data.token));
                setRedirect(false);
                closeForm();
            })
        }
    }
    const changeForm = () => {
        onChangeForm();
        clearAll();
    }
    const closeForm = () => {
        onCloseRegister();
        clearAll();
    }
    return (
        <Dialog open={openRegister} onClose={closeForm} TransitionComponent={Transition}>
            <form className="form__register" onSubmit={handleSubmit}>
                <img src={LoginImg} width="50%" alt="Decor-Make my house" />
                <Box ml={2} mr={2}>
                    <p className="register__title">Đăng ký</p>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <TextField
                            label="Họ"
                            // variant="filled"
                            required
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            size="small"
                            sx={{ width: "49%"}}
                        />
                        <TextField
                            label="Tên"
                            // variant="filled"
                            required
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            size="small"
                            sx={{ width: "49%" }}
                        />
                    </Box>
                    <TextField
                        label="Email"
                        // variant="filled"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        size="small"
                        sx={{ width: "100%", marginBottom: "16px" }}
                    />
                    <TextField
                        label="Mật khẩu"
                        // variant="filled"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        size="small"
                        sx={{ width: "100%", marginBottom: "16px" }}
                    />
                    <Box width="100%">
                        <Button type="submit" sx={{ width: "100%" }} variant="contained" color="error">
                            Đăng ký
                        </Button>
                    </Box>
                    <p className="text__change">Nếu đã có tài khoản, vui lòng đăng nhập <span className="text__change__click" onClick={changeForm}>tại đây</span></p>
                </Box>
            </form>
        </Dialog>
    );
}
export default Login;