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

import { MyContext } from "../../context/mycontext";
import Banner from "../../assets/banner_product.png";

import Footer from "../../components/footer/footer";

const Cart = () => {
    return (
        <Box m={0} p={0} mt={1}>
            <Box position="relative">
                <img src={Banner} width="100%" alt="Banner sản phẩm" />
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
                    <Table aria-label="simple table" >
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
                            <TableRow
                                sx={{ '&:last-child, &:last-child': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    <img width="100px" src="https://cdn.shopify.com/s/files/1/0361/9563/1237/products/VR247-10234094_300x.jpg?v=1587357151" alt="1" />
                                </TableCell>
                                <TableCell align="center">name 1đâsdasdasdas</TableCell>
                                <TableCell align="center">2312123</TableCell>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="center">
                                        <IconButton aria-label="remove" size="small">
                                            <RemoveIcon />
                                        </IconButton>
                                        <Box p={1}>1</Box>
                                        <IconButton aria-label="add" size="small">
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">1</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Box></Box>
                    <Box>
                        <Box textAlign="right">
                            <Link to="/product" className="add__text">Xem &amp; Lựa thêm</Link>
                        </Box>
                        <Box display="flex" mt={4}>
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
                                12,000,000 đ
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
                        <Box textAlign="right" mt={2}>
                            <Button className="pay__btn">Thanh toán</Button>
                        </Box>
                    </Box>
                    
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
export default Cart;