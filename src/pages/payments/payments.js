import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Web3 from 'web3';
import axios from "axios";
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
import Footer from "../../components/footer/footer";

import { useSelector, useDispatch } from "react-redux";
import { actClearAll } from "../../actions";


const Payments = () => {
    const dispatch = useDispatch();
    const Cart = useSelector(state => state.Cart);
    const Account = useSelector(state => state.Account);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [note, setNote] = useState(null);
    const [redirect, setRedirect] = useState(false);

    //pay by etherum
    const [account, setAccount] = useState("");
    const [eth_vnd, setEth_Vnd] = useState();
    const abi = [
        {
            constant: false,
            inputs: [
                {
                    name: "id",
                    type: "string",
                },
            ],
            name: "payment",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function",
        },
        {
            constant: true,
            inputs: [
                {
                    name: "",
                    type: "uint256",
                },
            ],
            name: "arr_bills",
            outputs: [
                {
                    name: "id",
                    type: "string",
                },
                {
                    name: "walletAddress",
                    type: "address",
                },
            ],
            payable: false,
            stateMutability: "view",
            type: "function",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    name: "walletAddress",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "id",
                    type: "string",
                },
            ],
            name: "send_data",
            type: "event",
        },
    ];
    useEffect(() => {
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,VND')
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setEth_Vnd(data)
            });
    }, [])
    const smartContractAddress = "0x891e7528207A8ACe6d45f7731f6cb3884336FfDe";
    const web3 = new Web3(window.ethereum);
    //   window.ethereum.enable();
    // contract meta mask
    let contractMetaMask = new web3.eth.Contract(abi, smartContractAddress);
    console.log(contractMetaMask)

    const handlePay = async () => {
        if (typeof window.ethereum !== "undefined") {
            console.log("MetaMask is installed!");
            // Convert VND to ETH
            const products = Cart.carts.map(cart => {
                return {
                    productId: cart.id,
                    quantity: cart.quantity
                };
            })
            let ethPayable = (Cart.bill / eth_vnd.VND).toFixed(18).toString();
            await axios.post("https://tengu-nodejs.herokuapp.com/api/order/",
                {
                    customerId: Account.account._id,
                    products: products,
                    customerName: firstName + " " + lastName,
                    payableAmount: Cart.bill >= 800000 ? Cart.bill : Cart.bill + 30000,
                    amount: Cart.allQuantity,
                    phone: phone,
                    address: {
                        province: province.name,
                        district: district.name,
                        ward: ward.name,
                        note: note
                    },
                    status: "success"
                },
                { headers: { token: localStorage.getItem("access_token") } })
                .then((response) => {
                    contractMetaMask.methods
                        .payment(response.data.message._id)
                        .send({
                            from: account,
                            value: web3.utils.toWei(ethPayable, "ether"),
                        })
                        .then((data) => {
                            setRedirect(true);
                            clearAll();
                            alert("Đặt hàng thành công!");
                        })
                        .catch((err) => {
                            axios.delete(
                                "https://tengu-nodejs.herokuapp.com/api/order/" +
                                response.data.message._id,
                                {}
                            )
                                .then(() => {
                                    console.log("Thanh toán thất bại");
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        });
                }).catch(error => {
                    console.log(error)
                })
        } else {
            alert("Vui lòng cài đặt MetaMask");
        }
    };
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            setAccount(accounts[0])
            console.log(account)
        })
    }

    const handleConnectWallet = () => {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((data) => {
                setAccount(data[0])
                alert("Connect Success!")
            });
        console.log(account);
    }
    //radio button
    const [payMethod, setPayMethod] = useState('cod');
    //panel accordion
    const [expanded, setExpanded] = useState('panel1');
    // data from myContext

    const onChangePanel = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const onChangeRadioBtn = (event) => {
        setPayMethod(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const products = Cart.carts.map(cart => {
            return {
                productId: cart.id,
                quantity: cart.quantity
            };
        })
        if (payMethod === "cod") {
            axios.post("https://tengu-nodejs.herokuapp.com/api/order/",
                {
                    customerId: Account.account._id,
                    products: products,
                    customerName: firstName + " " + lastName,
                    payableAmount: Cart.bill >= 800000 ? Cart.bill : Cart.bill + 30000,
                    amount: Cart.allQuantity,
                    phone: phone,
                    address: {
                        province: province.name,
                        district: district.name,
                        ward: ward.name,
                        note
                    }
                },
                { headers: { token: localStorage.getItem("access_token") } }
            ).then(response => {
                setRedirect(true);
                clearAll();
                alert("Đặt hàng thành công!");
            })
                .catch(error => {
                    alert(error);
                })
        } else {
            handlePay();
        }
    }
    const formatMoney = (n) => {
        let str = String(n);
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " đ"
    }
    const clearAll = () => {
        dispatch(actClearAll());
        setPayMethod("cod");
    }
    return (
        <Box m={0} p={0} mt={2}>
            {redirect ? <Redirect to="/cart" /> : ""}
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
                            {/* <TextField
                                required
                                size="small"
                                id="outlined-required"
                                label="Email"
                                defaultValue="@gmail.com"
                                sx={{ width: 1, marginBottom: 2 }}
                            /> */}
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <TextField
                                    required
                                    size="small"
                                    label="Họ"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    sx={{ width: "49%" }}
                                />
                                <TextField
                                    required
                                    size="small"
                                    label="Tên"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    sx={{ width: "49%" }}
                                />
                            </Box>
                            <TextField
                                required
                                size="small"
                                label="Số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                sx={{ width: 1, marginBottom: 2 }}
                            />
                            <Autocomplete
                                required
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
                                required
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
                                required
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
                                required
                                aria-label="empty textarea"
                                placeholder="Ghi chú ..."
                                onChange={(e, value) => setNote(value)}
                                style={{ width: "95%", height: 100, fontSize: 16, padding: 8, borderRadius: 5 }}
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
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography p={2}>
                                            Thanh toán ngay bằng Ethereum
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={handleConnectWallet}
                                        >
                                            Connet Wallet
                                        </Button>
                                    </Box>
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
                                    {Cart.carts.map((product, key) => {
                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell align="left">
                                                    <Box display="flex">
                                                        <Badge badgeContent={product.quantity} color="info">
                                                            <img width="50px" src={product.img} alt="1" />
                                                        </Badge>
                                                        <Box ml={2} pt={1.5}>{product.title}</Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 85 }} align="right">{formatMoney(product.price * product.quantity)}</TableCell>
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
                                    {formatMoney(Cart.bill)}
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt={1} >
                                <Box fontFamily="Tahoma" fontSize="14px">
                                    Giao hàng
                                </Box>
                                <Box fontFamily="Tahoma" fontWeight="500" fontSize="14px">
                                    {Cart.bill >= 800000 ? "Miễn phí" : "30.000 đ"}
                                </Box>
                            </Box>
                            <Box><hr /></Box>
                            <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
                                <Box fontFamily="Tahoma" fontSize="16px">
                                    Tổng cộng
                                </Box>
                                <Box id="payableAmount" fontFamily="Tahoma" fontWeight="500" fontSize="16px">
                                    {Cart.bill >= 800000 ? formatMoney(Cart.bill) : formatMoney(Cart.bill + 30000)}
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