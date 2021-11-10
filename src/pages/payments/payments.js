import React, { useState, useContext, useEffect } from "react";
import "./payments.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Radio from "@mui/material/Radio";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import MoneyIcon from '@mui/icons-material/Money';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import Data from "../../dataJson/local.json";
import { MyContext } from "../../context/mycontext";

import Footer from "../../components/footer/footer";


const Payments = () => {
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [note, setNote] = useState(null);
    //radio button
    const [payMethod, setPayMethod] = useState('cod');
    //panel accordion
    const [expanded, setExpanded] = useState('panel1');
    // data from myContext
    const { cart } = useContext(MyContext);
    //sum money
    const [payment, setPayment] = useState(0);

    useEffect(() => {
        let sumOfMoney = 0;
        cart.map(product => sumOfMoney += product.price * product.amount)
        setPayment(sumOfMoney);
    }, [cart])

    const onChangePanel = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const onChangeRadioBtn = (event) => {
        setPayMethod(event.target.value);
    };

    const handleSubmit = () => {
        console.log(ward + note);
    }
    const formatMoney = (n) => {
        let str = String(n);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " đ"
    }
    return (
        <Box m={0} p={0} mt={2}>
            <Container maxWidth="lg" sx={{ marginBottom: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item md={4}>
                            <Box
                                fontSize="18px"
                                fontFamily="Tahoma"
                                fontWeight="500"
                                mb={2}
                            >
                                Thông tin nhận hàng
                            </Box>
                            <TextField
                                required
                                size="small"
                                id="outlined-required"
                                label="Email"
                                defaultValue="@gmail.com"
                                sx={{ width: 1, marginBottom: 2 }}
                            />
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <TextField
                                    required
                                    size="small"
                                    id="outlined-required"
                                    label="Họ"
                                    defaultValue="Trần"
                                    sx={{ width: "49%" }}
                                />
                                <TextField
                                    required
                                    size="small"
                                    id="outlined-required"
                                    label="Tên"
                                    defaultValue="Khánh"
                                    sx={{ width: "49%" }}
                                />
                            </Box>
                            <TextField
                                required
                                size="small"
                                id="outlined-required"
                                label="Số điện thoại"
                                defaultValue="0967312210"
                                sx={{ width: 1, marginBottom: 2 }}
                            />
                            <Autocomplete
                                id="province-select"
                                size="small"
                                sx={{ width: 1, marginBottom: 2 }}
                                options={Data}
                                onChange={(e, value) => setProvince(value)}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tỉnh thành"
                                    />
                                )}
                            />
                            <Autocomplete
                                disabled={province === null ? true : false}
                                id="district-select"
                                size="small"
                                sx={{ width: 1, marginBottom: 2 }}
                                options={province === null ? Data : province.districts}
                                onChange={(e, value) => setDistrict(value)}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Quận Huyện"
                                    />
                                )}
                            />
                            <Autocomplete
                                disabled={district === null ? true : false}
                                id="ward-select"
                                size="small"
                                sx={{ width: 1, marginBottom: 2 }}
                                options={district === null ? Data : district.wards}
                                onChange={(e, value) => setWard(value)}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Xã Phường"
                                    />
                                )}
                            />
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Ghi chú ..."
                                onChange={(e, value) => setNote(value)}
                                style={{ width: "95%", height: 60, fontSize: 16, padding: 8, borderRadius: 5 }}
                            />
                        </Grid>
                        <Grid item md={4}>
                            <Box
                                fontSize="18px"
                                fontFamily="Tahoma"
                                fontWeight="500"
                                mb={2}
                            >
                                Vận chuyển
                            </Box>
                            <Box
                                width="100%"
                                display="flex"
                                justifyContent="space-between"
                                pt={2} pb={2} mb={2}
                                sx={{ border: "1px solid lightgray", borderRadius: 1 }}
                            >
                                <Box p={1}>Phí giao hàng</Box>
                                <Box p={1}>30.000đ</Box>
                            </Box>
                            <Box
                                fontSize="18px"
                                fontFamily="Tahoma"
                                fontWeight="500"
                                mb={2}
                            >
                                Thanh toán
                            </Box>
                            <Accordion disableGutters expanded={expanded === 'panel1'} onChange={onChangePanel('panel1')}>
                                <AccordionSummary onClick={() => setPayMethod('cod')}>
                                    <Box width="100%" display="flex" justifyContent="space-between">
                                        <Box display="flex">
                                            <Radio
                                                size="small"
                                                checked={payMethod === 'cod'}
                                                onChange={onChangeRadioBtn}
                                                value="cod"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': 'A' }}
                                            />
                                            <Box p={1.25}>Thanh toán khi giao hàng</Box>
                                        </Box>
                                        <Box p={1}><MoneyIcon /></Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography p={2}>
                                        Thanh toán khi nhận hàng (COD)
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters expanded={expanded === 'panel2'} onChange={onChangePanel('panel2')}>
                                <AccordionSummary onClick={() => setPayMethod('coin')}>
                                    <Box width="100%" display="flex" justifyContent="space-between">
                                        <Box display="flex">
                                            <Radio
                                                checked={payMethod === 'coin'}
                                                onChange={onChangeRadioBtn}
                                                value="coin"
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': 'B' }}
                                            />
                                            <Box p={1.25}>Cryptocurrency</Box>
                                        </Box>
                                        <Box p={1}><MonetizationOnIcon /></Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography p={2}>
                                        Thanh toán ngay bằng Ethereum
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item md={4}>
                            <Box
                                fontSize="18px"
                                fontFamily="Tahoma"
                                fontWeight="500"
                                mb={1}
                            >
                                Đơn hàng
                            </Box>
                            <Table>
                                <TableBody>
                                    {cart.map((product) => {
                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell align="left">
                                                    <Box display="flex">
                                                        <Badge badgeContent={product.amount} color="info">
                                                            <img width="50px" src="https://cdn.shopify.com/s/files/1/0361/9563/1237/products/VR247-10234094_300x.jpg?v=1587357151" alt="1" />
                                                        </Badge>
                                                        <Box ml={2} pt={1.5}>{product.name}</Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">{formatMoney(product.price * product.amount)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <Box display="flex" justifyContent="space-between">
                                <TextField
                                    size="small"
                                    id="outlined-required"
                                    label="Mã giảm giá"
                                    sx={{ width: 1, marginBottom: 2, marginTop: 2 }}
                                />
                                <Button
                                    disableElevation="true"
                                    variant="contained"
                                    color="info"
                                    sx={{ width: "40%", height: 40, marginLeft: 1, marginTop: 2 }}
                                >
                                    Áp dụng
                                </Button>
                            </Box>
                            <Box mt={-1}><hr /></Box>
                            <Box display="flex" justifyContent="space-between" mt={1} >
                                <Box fontFamily="Tahoma" fontSize="14px">
                                    Tổng đơn hàng
                                </Box>
                                <Box fontFamily="Tahoma" fontWeight="500" fontSize="14px">
                                    {payment} đ
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt={1} >
                                <Box fontFamily="Tahoma" fontSize="14px">
                                    Giao hàng
                                </Box>
                                <Box fontFamily="Tahoma" fontWeight="500" fontSize="14px">
                                    {payment >= 800000 ? "Miễn phí" : "30.000 đ"}
                                </Box>
                            </Box>
                            <Box><hr /></Box>
                            <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
                                <Box fontFamily="Tahoma" fontSize="16px">
                                    Tổng cộng
                                </Box>
                                <Box id="payableAmount" fontFamily="Tahoma" fontWeight="500" fontSize="16px">
                                    {payment >= 800000 ? formatMoney(payment) : formatMoney(payment + 30000)}
                                </Box>
                            </Box>
                            <Button
                                id="btnPayable"
                                type="submit"
                                variant="contained"
                                color="info"
                                sx={{ width: 1 }}
                            >Đặt hàng</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Footer />
        </Box>
    );
}
export default Payments;