import React, { useState } from "react";
import "./product.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Footer from "../../components/footer/footer";
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import MenuItem from '@mui/material/MenuItem';
import Pagination from "@mui/material/Pagination";

import Banner from "../../assets/banner_product.png";
import ListProduct from "../../components/product/listProduct/listProduct";

import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useSelector } from "react-redux";

const Product = () => {
    const Product = useSelector(state => state.Product);
    const [view, setView] = useState(false);
    const [sort, setSort] = useState('sort_0');
    const [page, setPage] = useState(1);
    const [sortProduct, setSortProduct] = useState([...Product.products]);
    const [idKind, setIdKind] = useState("all");

    const onChangePage = (event, value) => {
        setPage(value);
    };
    const onChangeIdKind = (id) => {
        setIdKind(id);
        if (id === "all"){
            setSortProduct([...Product.products]);
        }
        else {
            const urlAPI = "https://tengu-nodejs.herokuapp.com/api/category/?q=" + id;
            fetch(urlAPI)
                .then(res => res.json())
                .then((result) => {
                    setSortProduct([...result.message]);
                })
            // let category = Product.products.filter(item => item._id === id);
            // console.log(category);
            // setSortProduct([...category]);
        }
    }
    const onChangeSort = (e) => {
        setSort(e.target.value);
        if (e.target.value === "sort_0") {
            setSortProduct([...Product.products]);
        } else if (e.target.value === "sort_1") {
            sortProduct.sort(function (a, b) {
                if (a.title < b.title) { return -1; }
                if (a.title > b.title) { return 1; }
                return 0;
            })
        } else if (e.target.value === "sort_2") {
            sortProduct.sort(function (a, b) {
                if (a.title > b.title) { return -1; }
                if (a.title < b.title) { return 1; }
                return 0;
            })
        } else if (e.target.value === "sort_3") {
            sortProduct.sort(function (a, b) {
                if (a.price > b.price) { return -1; }
                if (a.price < b.price) { return 1; }
                return 0;
            })
        } else if (e.target.value === "sort_4") {
            sortProduct.sort(function (a, b) {
                if (a.price < b.price) { return -1; }
                if (a.price > b.price) { return 1; }
                return 0;
            })
        }
    };
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
                        Tất cả sản phẩm
                    </Box>
                </Container>
            </Box>
            <Container maxWidth="lg">
                <Box position="relative" display="flex" mt={5}>
                    <Box width="25%" mr={1}>
                        <Box className="form__search">
                            <input type="text" className="input__search" placeholder="Tìm kiếm..." />
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </Box>
                        <Box
                            mt={4}
                            fontSize="20px"
                            fontWeight="500"
                        >
                            Danh mục sản phẩm
                        </Box>
                        <hr />
                        {/* Các loại sản phẩm */}
                        <Box 
                            onClick={onChangeIdKind.bind(this, "all")}
                            sx={{
                                mt: 1, p: 1, pl: 1,
                                fontSize: 18,
                                fontWeight: "all" === idKind ? "bold" : "none",
                                backgroundColor: "all" === idKind ? "lightgray" : "#fff"
                            }}
                        >
                            Tất cả
                        </Box>
                        {Product.categories.map((item, key) => {
                            return (
                                <Box key={item._id}
                                    onClick={onChangeIdKind.bind(this, item._id)}
                                    sx={{
                                        mt: 1, p: 1, pl: 1,
                                        fontSize: 18,
                                        fontWeight: item._id === idKind ? "bold" : "none",
                                        backgroundColor: item._id === idKind ? "lightgray" : "#fff"
                                    }}
                                >
                                    {item.category}
                                </Box>
                            );
                        })}
                        {/* /// */}
                        <Box
                            mt={4}
                            fontSize="20px"
                            fontWeight="500"
                        >
                            Mức giá
                        </Box>
                        <hr />
                    </Box>
                    <Box width="75%">
                        <Box display="flex" justifyContent="space-between">
                            <Box display="flex" mt={0.5}>
                                <Box
                                    fontSize="16px"
                                    ml={1}
                                    mr={1}
                                >
                                    Xem
                                </Box>
                                <AppsIcon
                                    sx={{ marginRight: "4px", cursor: "pointer" }}
                                    onClick={() => setView(false)}
                                    color={view ? "disabled" : "black"}
                                />
                                <ViewListIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setView(true)}
                                    color={view ? "black" : "disabled"}
                                />
                            </Box>
                            <Box display="flex" mt={0.5}>
                                <Box fontSize="16px" mr={1}>Sắp xếp:</Box>
                                <FormControl>
                                    <Select
                                        sx={{ width: "auto", height: "26px" }}
                                        value={sort}
                                        onChange={onChangeSort}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={"sort_0"}>Phổ biến</MenuItem>
                                        <MenuItem value={"sort_1"}>Từ A đến Z</MenuItem>
                                        <MenuItem value={"sort_2"}>Từ Z đến A</MenuItem>
                                        <MenuItem value={"sort_3"}>Giá từ cao đến thấp</MenuItem>
                                        <MenuItem value={"sort_4"}>Giá từ thấp đến cao</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <hr />
                        <ListProduct sortProduct={sortProduct} numPage={page} />
                        <hr />
                        <Box display="flex" justifyContent="center" mb={2}>
                            <Pagination count={Math.ceil(sortProduct.length / 18)} page={page} onChange={onChangePage} />
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
export default Product;