import React, { useState } from "react";
import "./login.css";
import LoginImg from "../../assets/img__login.png";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({openLogin, onCloseLogin, onChangeForm}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return (
        <Dialog open={openLogin} onClose={onCloseLogin} TransitionComponent={Transition}>
            <form className="form__login" onSubmit={handleSubmit}>
                <img src={LoginImg} width="50%" alt="Decor-Make my house" />
                <Box ml={2} mr={2}>
                    <p className="login__title">Đăng nhập</p>
                    <TextField
                        label="Email"
                        variant="filled"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        size="small"
                        sx={{width: "100%", marginBottom: "15px"}}
                    />
                    <TextField
                        label="Password"
                        variant="filled"
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
                    <p className="text__change">Nếu chưa có tài khoản, vui lòng đăng kí <span className="text__change__click" onClick={onChangeForm}>tại đây</span></p>
                </Box>
            </form>
        </Dialog>
    );
}
export default Login;