import React, { useContext, useState } from "react";
import { useHistory, generatePath } from "react-router-dom";
import "./itemProduct.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FastViewForm from "../fastview/fastview";

import { MyContext } from "../../../context/mycontext";

const ItemProduct = ({ product }) => {
    // view fast
    const [openView, setOpenView] = useState(false);
    const onOpenView = () => setOpenView(true);
    const onCloseView = () => setOpenView(false);

    const { cart, setCart } = useContext(MyContext);

    const [id, setId] = useState(product._id);
    const history = useHistory();

    const addProductToCart = () => {
        let checkIndex = -1;
        checkIndex = cart.findIndex(tmp => tmp.id === product.id);
        if (checkIndex === -1) {
            setCart([...cart, {
                ...product,
                amount: 1
            }])
        } else {
            let arrayCart = [...cart];
            arrayCart[checkIndex].amount += 1;
            setCart(arrayCart);
        }
    }
    const handleProceed = (e) => {
        setId(product._id);
        id && history.push(generatePath("/product/:id", { id }));
    };
    return (
        <Box>
            <FastViewForm openView={openView} onCloseView={onCloseView} product={product} addProductToCart={addProductToCart} />
            <Box width="100%" height="370px" position="relative" mb={2} >
                <Box 
                    onClick={() => { setTimeout(() => { handleProceed(); }, 500); }} 
                    display="flex" 
                    justifyContent="center"
                >
                    <Box width="280px">
                        <img width="100%" src={product.img} alt="1" style={{paddingTop: "auto", paddingBottom: "auto"}}/>
                    </Box>
                </Box>
                <Box width="100%" mt={2} position="absolute" bottom="8px">
                    <Box
                        fontSize="18px"
                        pt={2}
                        color="black"
                    >
                        {product.title}
                    </Box>
                    <Box color="red" pt={1} mb={1}>{product.price}₫</Box>
                    <Button
                        sx={{ width: "50%" }}
                        variant="contained"
                        color="error"
                        onClick={addProductToCart}
                    >
                        Thêm vào giỏ
                    </Button>
                    <Button
                        sx={{ width: "49%", marginLeft: "2px" }}
                        variant="contained"
                        color="error"
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