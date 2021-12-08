import React from "react";
import "./listProduct.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemProduct from "../itemProduct/itemProduct";

const ListProduct = ({ numPage, sortProduct }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {sortProduct.map((product, index) => {
                    var numOfProduct = 18;
                    if (index >= (numOfProduct * (numPage - 1)) && index < (numOfProduct * numPage)) {
                        return (
                            <Grid item xs={6} md={4} key={product.id}>
                                <ItemProduct product={product} />
                            </Grid>
                        );
                    } else {
                        return "";
                    }
                })}
            </Grid>
        </Box>
    );
}
export default ListProduct;