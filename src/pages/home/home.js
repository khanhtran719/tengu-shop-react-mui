import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import ItemProduct from "../../components/product/itemProduct/itemProduct";
import {
    Container,
    Box,
    Button,
    Grid
} from "@mui/material";
import {useSelector} from "react-redux";

const Home = () => {
    const Product = useSelector(state => state.Product);
    return (
        <div>
            <Banner />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        {Product.products.map((product, index) => {
                            if (Product.products.length > 20) {
                                if (index < 20) {
                                    return (
                                        <Grid item xs={6} md={3} key={product.id}>
                                            <ItemProduct product={product} />
                                        </Grid>
                                    );
                                } else {
                                    return "";
                                }
                            }
                            else {
                                return (
                                    <Grid item xs={6} md={3} key={product.id}>
                                        <ItemProduct product={product} />
                                    </Grid>
                                );
                            }
                        })}
                    </Grid>
                </Box>
            </Container>
            <Box
                width="100%"
                display="flex"
                justifyContent="center"
                mt={1} mb={2}
            >
                <Link to="/product" style={{ textDecoration: "none", color: "black" }}>
                    <Button color="inherit" sx={{ bgcolor: "red" }}>XEM THÊM</Button>
                </Link>
            </Box>
            <Footer />
        </div>
    );
}
export default Home;