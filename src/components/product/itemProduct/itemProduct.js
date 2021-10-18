import React, {useContext} from "react";
import "./itemProduct.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"

import { MyContext } from "../../../context/mycontext";

const ItemProduct = ({product}) => {
    const { cart, setCart } = useContext(MyContext);

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
    return (
        <>
            <Box width="100%" height="100%" position="relative" mb={2}>
                <img width="99%" src="https://cdn.shopify.com/s/files/1/0361/9563/1237/products/VR247-10234094_300x.jpg?v=1587357151" alt="1" />
                <Box
                    fontSize="18px"
                    mt={2}
                >
                    {product.name}
                </Box>
                <Box color="red" mt={1}>{product.price}₫</Box>
                <Box width="100%" mt={2}>
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
                    >
                        Xem nhanh
                    </Button>
                </Box>
            </Box>
        </>
    );
}
export default ItemProduct;