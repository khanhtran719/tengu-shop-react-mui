import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { MyContext } from "../../context/mycontext";
import Footer from "../../components/footer/footer";

const DetailsProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const { products, cart, setCart } = useContext(MyContext);

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
    }
    return (
        <Box mt={3}>
            <Container maxWidth="lg" sx={{mb: 3}}>
                <Grid container spacing={2}>
                    <Grid item md={7} xs={12} display="flex" justifyContent="flex-end">
                        <img width="80%" src={product.img} alt="1" />
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
                        <Typography gutterBottom variant="h5" component="div">
                            {formatMoney(product.price)}
                        </Typography>
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
                            onClick={addProductToCart}
                        >
                            THÊM VÀO GIỎ HÀNG
                        </Button>
                        <Button
                            sx={{ width: 1, height: 50, mt: 2, borderRadius: "0" }}
                            size="large"
                            color="info"
                            variant="contained"
                            // onClick={addProductToCart}
                        >
                            ĐẶT HÀNG NHANH
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </Box>
    );
}
export default DetailsProduct;