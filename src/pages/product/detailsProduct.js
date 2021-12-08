import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Avatar from "@mui/material/Avatar";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { actAddMoreProduct } from "../../actions";

import Footer from "../../components/footer/footer";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DetailsProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    useEffect(() => {
        const api = "https://tengu-nodejs.herokuapp.com/api/product/find/" + id
        axios.get(api)
            .then(result => setProduct(result.data.product))
            .catch(error => {
                console.log(error);
            })

    }, [id, setProduct]);
    const formatMoney = (n) => {
        let str = String(n);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " đ"
    }
    const discount = (product) => {
        return (
            <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ mr: 3, padding: "auto 0", textDecoration: "line-through gray", color: "gray" }}
            >
                {formatMoney(product.price)}
            </Typography>
        );
    }
    console.log(product)
    return (
        <Box mt={3}>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Thêm sản phẩm vào giỏ thành công!
                </Alert>
            </Snackbar>
            <Container maxWidth="lg" sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item md={7} xs={12} display="flex" justifyContent="flex-end" style={{ position: "relative" }}>
                        <img width="80%" src={product.img} alt="1" />
                        {product.discount_rate === 0 ? "" :
                            <Avatar
                                sx={{
                                    color: "red",
                                    backgroundColor: "#FFD700",
                                    fontSize: 18,
                                    width: 50, height: 50,
                                    position: "absolute",
                                    top: 8,
                                    right: 8
                                }}
                            >
                                {product.discount_rate}%
                            </Avatar>}
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography gutterBottom variant="h4" component="div" fontWeight="600" width="85%">
                            {product.title}
                        </Typography>
                        <Box
                            width="70px"
                            height="1px"
                        >
                            <hr style={{ border: "none", borderBottom: "3px solid gray" }} />
                        </Box>
                        <Typography gutterBottom variant="h6" component="div" sx={{ mt: 2, color: "gray" }}>
                            Kích thước: {product.size}
                        </Typography>
                        <Box display="flex">
                            <Typography gutterBottom variant="h5" component="div" marginRight={2}>
                                {formatMoney(Math.round((product.price - product.price * (product.discount_rate / 100)) / 1000) * 1000)}
                            </Typography>
                            {product.discount_rate !== 0 ? discount(product) : ""}
                        </Box>
                        <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: "gray", mt: -1.5, fontSize: 14 }}>
                            Miễn phí vận chuyển cho đơn đặt hàng từ 800.000
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ mt: 2, color: "gray" }}>
                            Số lượng
                        </Typography>
                        <Box display="flex" mt={1}>
                            <IconButton
                                aria-label="decrease"
                                // size="small"
                                onClick={decreaseQuantity}
                                sx={{ border: "1px solid gray", borderRadius: "0" }}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Box sx={{ fontSize: "18px", color: "gray", border: "1px solid gray", p: "8px 16px", borderRight: "none", borderLeft: "none" }}>{quantity}</Box>
                            <IconButton
                                aria-label="increase"
                                // size="small"
                                onClick={increaseQuantity}
                                sx={{ border: "1px solid gray", borderRadius: "0" }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            sx={{ width: 1, height: 50, mt: 4, borderRadius: "0" }}
                            size="large"
                            color="error"
                            variant="outlined"
                            disabled={product.amount <= 0 ? true : false}
                            onClick={() => {
                                dispatch(actAddMoreProduct(product, quantity));
                                setOpenAlert(true);
                            }}
                        >
                            {product.amount <= 0 ? "HẾT HÀNG" : "THÊM VÀO GIỎ HÀNG"}
                        </Button>
                        <Button
                            sx={{ width: 1, height: 50, mt: 2, borderRadius: "0" }}
                            size="large"
                            color="info"
                            variant="contained"
                            disabled={product.amount <= 0 ? true : false}
                        // onClick={addProductToCart}
                        >
                            ĐẶT HÀNG NHANH
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}
export default DetailsProduct;