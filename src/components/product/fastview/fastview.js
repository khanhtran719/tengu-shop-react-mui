import React, { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";

import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { useDispatch } from "react-redux";
import { actAddMoreProduct } from "../../../actions";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FastView = ({ openView, onCloseView, product, setOpenAlert }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }
    const formatMoney = (n) => {
        let str = String(n);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " đ"
    }
    const discount = (product) => {
        return (
            <Box display="flex">
                <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ mr: 3, padding: "auto 0", textDecoration: "line-through gray", color: "gray" }}
                >
                    {formatMoney(product.price)}
                </Typography>
                <Avatar sx={{ color: "red", backgroundColor: "#FFD700", fontSize: 14, width: 30, height: 30 }}>{product.discount_rate}%</Avatar>
            </Box>
        );
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
                    <img width="400px" src={product.img} alt="1" />
                </Box>
                <Box
                    sx={{ width: 400, ml: 3 }}
                >
                    <Typography variant="h4" gutterBottom component="div">
                        {product.title}
                    </Typography>
                    <Box
                        width="50px"
                        height="1px"
                    >
                        <hr style={{ border: "none", borderBottom: "3px solid red" }} />
                    </Box>
                    <Box display="flex" mt={4} mb={-1}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            component="div"
                            fontWeight="600"
                            mr={3}
                        >
                            {formatMoney(Math.round((product.price - product.price * (product.discount_rate / 100)) / 1000) * 1000)}
                        </Typography>
                        {product.discount_rate !== 0 ? discount(product) : ""}
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
                        disabled={product.amount === 0 ? true : false}
                        size="large"
                        color="error"
                        variant="contained"
                        onClick={() => {
                            dispatch(actAddMoreProduct(product, quantity));
                            setOpenAlert(true);
                            onCloseView();
                        }}
                    >
                        {product.amount !== 0 ? "THÊM VÀO GIỎ HÀNG" : "HẾT HÀNG"}
                    </Button>
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