import React, { useState } from "react";
import { useHistory, generatePath } from "react-router-dom";
// import {R} from "react-cssfx-loading";
import "./itemProduct.css";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography, Avatar } from "@mui/material";

import FastViewForm from "../fastview/fastview";
import { useDispatch } from "react-redux";
import { actAddProduct } from "../../../actions";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ItemProduct = ({ product }) => {
    const dispatch = useDispatch();
    // view fast
    const [openView, setOpenView] = useState(false);
    const onOpenView = () => setOpenView(true);
    const onCloseView = () => setOpenView(false);
    const [openAlert, setOpenAlert] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const [id, setId] = useState(product._id);
    const history = useHistory();

    const handleProceed = (e) => {
        setId(product._id);
        id && history.push(generatePath("/product/:id", { id }));
    }
    const formatMoney = (n) => {
        let str = String(n);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " đ"
    }
    const discount = (product) => {
        return (
            <Box position="absolute" top="5px" right="5px">
                <Avatar sx={{ color: "red", backgroundColor: "#FFD700", fontSize: 14, width: 30, height: 30 }}>{product.discount_rate}%</Avatar>
            </Box>
        );
    }
    return (
        <Box>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Thêm sản phẩm vào giỏ thành công!
                </Alert>
            </Snackbar>
            <FastViewForm openView={openView} onCloseView={onCloseView} product={product} setOpenAlert={setOpenAlert} />
            <Box width="100%" height="370px" position="relative" mb={2} >
                {product.discount_rate !== 0 ? discount(product) : ""}
                <Box
                    onClick={() => { setTimeout(() => { handleProceed(); }, 500); }}
                    display="flex"
                    justifyContent="center"
                >
                    <Box width="280px">
                        <img width="100%" src={product.img} alt="1" style={{ paddingTop: "auto", paddingBottom: "auto" }} />
                    </Box>
                </Box>
                <Box width="100%" mt={2} position="absolute" bottom="8px">
                    <Box
                        fontSize="18px"
                        pt={2}
                        color="black"
                        sx={{textTransform: "uppercase"}}
                    >
                        {product.title}
                    </Box>
                    <Box display="flex">
                        <Typography
                            color="red"
                            sx={{ pb: 1 }}
                        >
                            {formatMoney(Math.round((product.price - product.price * (product.discount_rate / 100)) / 1000) * 1000)}
                        </Typography>
                    </Box>
                    <Button
                        className="btn_addToCart"
                        sx={{ width: "50%" }}
                        variant="contained"
                        // variant="outlined"
                        disabled={product.amount === 0 ? true : false}
                        // color="error"
                        onClick={() => {
                            dispatch(actAddProduct(product));
                            setOpenAlert(true);
                        }}
                    >
                        Thêm vào giỏ
                    </Button>
                    <Button
                        className="btn_viewFast"
                        sx={{ width: "49%", marginLeft: "2px" }}
                        variant="contained"
                        // color="error"
                        onClick={onOpenView}
                    >
                        Xem nhanh
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
export default ItemProduct;