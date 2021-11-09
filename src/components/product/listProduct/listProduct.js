import React, { useContext } from "react";
import "./listProduct.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ItemProduct from "../itemProduct/itemProduct";
import { MyContext } from "../../../context/mycontext";

const ListProduct = ({ mdi, page, numPage }) => {
    const { products } = useContext(MyContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {products.map((product, index) => {
                    if (page === "home") {
                        if (products.length > 20) {
                            if (index < 20) {
                                return (
                                    <Grid item xs={6} md={mdi} key={product.id}>
                                        <ItemProduct product={product} />
                                    </Grid>
                                );
                            } else {
                                return "";
                            }
                        }
                        else {
                            return (
                                <Grid item xs={6} md={mdi} key={product.id}>
                                    <ItemProduct product={product} />
                                </Grid>
                            );
                        }
                    }
                    else {
                        var numOfProduct = 18;
                        if (index >= (numOfProduct * (numPage - 1)) && index < (numOfProduct * numPage)) {
                            return (
                                <Grid item xs={6} md={mdi} key={product.id}>
                                    <ItemProduct product={product} />
                                </Grid>
                            );
                        } else {
                            return "";
                        }
                    }
                })}
            </Grid>
        </Box>
    );
}
export default ListProduct;