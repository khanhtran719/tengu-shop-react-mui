import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Banner from "../../components/banner/banner";
import Footer from "../../components/footer/footer";
import ListProduct from "../../components/product/listProduct/listProduct";
import {
    Container, 
    Box, 
    Button,
} from "@mui/material";

const Home = () => {
    
    return (
        <div>
            <Banner />
            <Container maxWidth="lg">
                <ListProduct mdi="3" page={"home"}/>
            </Container>
            <Box 
                width="100%"
                display="flex" 
                justifyContent="center"
                mt={1} mb={2}
            >
                <Link to="/product" style={{textDecoration: "none", color: "black"}}>
                    <Button color="inherit" sx={{bgcolor: "red"}}>XEM THÊM</Button>
                </Link>
            </Box>
            <Footer />
        </div>
    );
}
export default Home;