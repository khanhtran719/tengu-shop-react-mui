import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Typography from '@mui/material/Typography';

import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { MyContext } from "../../../context/mycontext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FastView = ({ openView, onCloseView, product }) => {
    const [quantity, setQuantity] = useState(1);

    const { setCart, cart } = useContext(MyContext);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }
    const addProductToCart = () => {
        let checkIndex = -1;
        checkIndex = cart.findIndex(tmp => tmp.id === product.id);
        if (checkIndex === -1) {
            setCart([...cart, {
                ...product,
                amount: quantity
            }])
        } else {
            let arrayCart = [...cart];
            arrayCart[checkIndex].amount += quantity;
            setCart(arrayCart);
        }
        onCloseView();
    }

    return (
        <Dialog
            open={openView}
            onClose={onCloseView}
            TransitionComponent={Transition}
            maxWidth="lg"
        >
            <Box p={4} display="flex" position="relative">
                <Box
                    sx={{ width: 400, border: "2px solid gray", p: 1 }}
                >
                    <img width="400px" src="https://cdn.shopify.com/s/files/1/0361/9563/1237/products/VR247-10234094_300x.jpg?v=1587357151" alt="1" />
                </Box>
                <Box
                    sx={{ width: 400, ml: 3 }}
                >
                    <Typography variant="h4" gutterBottom component="div">
                        {product.name}
                    </Typography>
                    <Box sx={{ width: 50, mt: -2, backgroundColor: "red" }}><hr /></Box>
                    <Box display="flex" mt={4} mb={-1}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            component="div"
                            fontWeight="600"
                            mr={3}
                        >
                            {product.price}0.000₫
                        </Typography>
                        <Typography
                            variant="h6"
                            gutterBottom
                            component="div"
                            sx={{ mr: 3, padding: "auto 0", textDecoration: "line-through gray", color: "gray" }}>
                            {product.price}0.000₫
                        </Typography>
                        {/* <Box sx={{ width: 30, height: 30, backgroundColor: "red" }}>
                            <Box p={0.5} fontSize="14px" textAlign="center">15%</Box>
                        </Box> */}
                    </Box>
                    <Typography variant="subtitle1" gutterBottom component="div" fontSize="14px">
                        Miễn phí vận chuyển cho đơn hàng từ 800.000
                    </Typography>
                    <Box mt={4}>
                        Số lượng
                    </Box>
                    <Box display="flex" mt={1}>
                        <IconButton
                            aria-label="decrease"
                            size="small"
                            onClick={decreaseQuantity}
                            sx={{ border: "1px solid gray", borderRadius: "0" }}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Box sx={{ border: "1px solid gray", p: "4px 14px", borderRight: "none", borderLeft: "none" }}>{quantity}</Box>
                        <IconButton
                            aria-label="increase"
                            size="small"
                            onClick={increaseQuantity}
                            sx={{ border: "1px solid gray", borderRadius: "0" }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Button
                        sx={{ mt: 4, borderRadius: "0" }}
                        size="large"
                        color="error"
                        variant="contained"
                        onClick={addProductToCart}
                    >THÊM VÀO GIỎ HÀNG</Button>
                </Box>
                <IconButton
                    onClick={onCloseView}
                    size="small"
                    sx={{ position: "absolute", top: 2, right: 2 }}
                >
                    <ClearIcon
                        sx={{
                            ":hover": {
                                color: "black"
                            }
                        }}
                    />
                </IconButton>
            </Box>
        </Dialog>
    );
}
export default FastView;