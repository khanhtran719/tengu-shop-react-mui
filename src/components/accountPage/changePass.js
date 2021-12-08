import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    TextField,
    Button,
    Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePass = () => {
    const Account = useSelector(state => state.Account);
    const [pass, setPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [verifyPass, setVerifyPass] = useState("");
    /// alert
    const [open, setOpen] = useState(false);
    const [changeFail, setChangeFail] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleChangeFail = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setChangeFail(false);
    }
    const handleChangePass = (e) => {
        e.preventDefault();
        const urlAPI = "https://tengu-nodejs.herokuapp.com/api/customer/change-password/" + Account.account._id;
        axios.put(urlAPI,
            {
                oldpassword: pass,
                newpassword: newPass,
                newpassword2: verifyPass
            },
            { headers: { token: localStorage.getItem("access_token") } }
        ).then((response) => {
            console.log(response.data);
            if (response.data.status_code === 200) {
                clearAll();
                setOpen(true);
            } else {
                setChangeFail(true);
            }
        })
            .catch(() => {
                alert("Error");
            })
    }
    const clearAll = () => {
        setPass("");
        setNewPass("");
        setVerifyPass("");
    }
    return (
        <Box pl={3} minWidth="800px">
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Đổi mật khẩu thành công!
                </Alert>
            </Snackbar>
            <Snackbar open={changeFail} autoHideDuration={6000} onClose={handleChangeFail}>
                <Alert onClose={handleChangeFail} severity="error" sx={{ width: '100%' }}>
                    Đổi mật khẩu thất bại!
                </Alert>
            </Snackbar>
            <Typography fontSize={30} textAlign="center" fontWeight="bold" sx={{ mt: -1, mb: 3 }}>
                Bảo Mật Tài Khoản
            </Typography>
            <Typography fontWeight={500} mb={1}>
                Đổi mật khẩu
            </Typography>
            <form onSubmit={handleChangePass}>
                <TextField
                    size="small"
                    variant="outlined"
                    required
                    label="Mật khẩu cũ"
                    value={pass}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e, value) => setPass(e.target.value)}
                    sx={{ m: 1 }}
                />
                <Box>
                    <TextField
                        size="small"
                        variant="outlined"
                        required
                        label="Mật khẩu mới"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={newPass}
                        onChange={(e, value) => setNewPass(e.target.value)}
                        sx={{ m: 1 }}
                    />
                </Box>
                <TextField
                    size="small"
                    variant="outlined"
                    required
                    label="Xác nhận mật khẩu"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={verifyPass}
                    onChange={(e, value) => setVerifyPass(e.target.value)}
                    sx={{ m: 1 }}
                />
                <Box>
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        sx={{ m: 1, width: 210 }}
                    >
                        Xác nhận
                    </Button>
                </Box>
            </form>
            <Typography fontWeight={500} sx={{ marginTop: 2 }}>
                Xóa tài khoản
            </Typography>
            <hr />
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography>LƯU Ý: MỘT KHI XÓA TÀI KHOẢN THÌ KHÔNG THỂ PHỤC HỒI</Typography>
                <Button
                    size="lagre"
                    variant="outlined"
                    color="error"
                    sx={{ m: 1, width: 150 }}
                >
                    XÓA TÀI KHOẢN
                </Button>
            </Box>
        </Box>
    );
}

export default ChangePass;