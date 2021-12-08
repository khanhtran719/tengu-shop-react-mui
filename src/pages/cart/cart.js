import React from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from "react-redux";
import { actIncreaseQuantity, actDecreaseQuantity, actDelProduct } from "../../actions/index";

import Footer from "../../components/footer/footer";

const Cart = () => {
    const dispatch = useDispatch();
    const Cart = useSelector(state => state.Cart);

    const formatMoney = (n) => {
        let str = String(n);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " đ"
    }
    const emptyCart = () => {
        return (
            <Box m={0} p={0} mt={1}>
                <Box
                    fontSize="40px"
                    fontWeight="bold"
                    textAlign="center"
                    mt={5}
                >
                    Giỏ hàng trống
                </Box>
                <Box textAlign="center" mt={4} mb={4}>
                    <Button
                        size="large"
                        variant="contained"
                        color="error"
                        sx={{ width: 200 }}
                    >
                        <Link to="/product" style={{ textDecoration: "none", color: "black" }}>Xem &amp; Lựa thêm</Link>
                    </Button>
                </Box>
                <Footer />
            </Box>
        );
    }
    const notEmptyCart = () => {
        return (
            <Box m={0} p={0} mt={1}>
                <Box position="relative" width="100%" height="150px" bgcolor="lavender">
                    <Container maxWidth="lg">
                        <Box
                            position="absolute"
                            bottom="32px"
                            fontSize="32px"
                            fontWeight="500"
                        >
                            Giỏ hàng của bạn
                        </Box>
                    </Container>
                </Box>
                <Container maxWidth="lg">
                    <Box sx={{ border: "1px solid lightgray" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Ảnh sản phẩm</TableCell>
                                    <TableCell align="center">Tên sản phẩm</TableCell>
                                    <TableCell align="center">Đơn giá</TableCell>
                                    <TableCell align="center">Số lượng</TableCell>
                                    <TableCell align="center">Thành tiền</TableCell>
                                    <TableCell align="center">Xóa</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Cart.carts.map((product, key) => {
                                    return (
                                        <TableRow
                                            key={product.id}
                                        // sx={{ '&:last-child, &:last-child': { border: 0 } }}
                                        >
                                            <TableCell align="center">
                                                <img width="100px" src={product.img} alt="1" />
                                            </TableCell>
                                            <TableCell align="center">{product.title}</TableCell>
                                            <TableCell align="center">{formatMoney(product.price)}</TableCell>
                                            <TableCell align="center">
                                                <Box display="flex" justifyContent="center">
                                                    <IconButton
                                                        aria-label="decrease"
                                                        size="small"
                                                        onClick={() => dispatch(actDecreaseQuantity(key))}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Box p={1}>{product.quantity}</Box>
                                                    <IconButton aria-label="increase" size="small" onClick={() =>dispatch(actIncreaseQuantity(key))}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">{formatMoney(product.price * product.quantity)}</TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="delete" onClick={() => dispatch(actDelProduct(key))}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Box></Box>
                        <Box>
                            <Box textAlign="right">
                                <Link to="/product" className="add__text">Xem &amp; Lựa thêm</Link>
                            </Box>
                            <Box display="flex" mt={4} >
                                <Box
                                    fontSize="22px"
                                    fontWeight="Bold"
                                    fontFamily="Tahoma"
                                >
                                    Tổng đơn hàng
                                </Box>
                                <Box
                                    ml={3}
                                    fontSize="22px"
                                    fontWeight="500"
                                    fontFamily="Tahoma"
                                >
                                    {formatMoney(Cart.bill)}
                                </Box>
                            </Box>
                            <Box
                                fontSize="13px"
                                textAlign="right"
                                fontFamily="Tahoma"
                                mt={2}
                            >
                                Miễn phí vận chuyển cho đơn hàng trên 800,000
                            </Box>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ width: 1, marginTop: 3, marginBottom: 3 }}
                            >
                                <Link to="/payments" style={{ textDecoration: "none", color: "white" }}>Thanh toán</Link>
                            </Button>
                        </Box>
                    </Box>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <div>{Cart.carts.length === 0 ? emptyCart() : notEmptyCart()}</div>

    );
}
export default Cart;