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
                    <p className="register__title">????ng k??</p>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <TextField
                            label="H???"
                            // variant="filled"
                            required
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            size="small"
                            sx={{ width: "49%"}}
                        />
                        <TextField
                            label="T??n"
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
                        label="M???t kh???u"
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
                            ????ng k??
                        </Button>
                    </Box>
                    <p className="text__change">N???u ???? c?? t??i kho???n, vui l??ng ????ng nh???p <span className="text__change__click" onClick={changeForm}>t???i ????y</span></p>
                </Box>
            </form>
        </Dialog>
    );
}
export default Login;