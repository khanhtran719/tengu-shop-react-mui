import React, { useState, useContext } from "react";
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

import { MyContext } from "../../context/mycontext";

const Product = () => {
    const [view, setView] = useState(false);
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);

    const { products } = useContext(MyContext);
    
    const onChangePage = (event, value) => {
      setPage(value);
    };

    const onChangeSort = (e) => {
        setSort(e.target.value);
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
                        <Box fontSize="16px" mt={2}>TRANH VẢI TREO TƯỜNG</Box>
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
                                        <MenuItem onClick={() => setSort("")} value="">Phổ biến</MenuItem>
                                        <MenuItem onClick={() => setSort("sort_1")} value={"sort_1"}>Từ A đến Z</MenuItem>
                                        <MenuItem onClick={() => setSort("sort_2")} value={"sort_2"}>Từ Z đến A</MenuItem>
                                        <MenuItem onClick={() => setSort("sort_3")} value={"sort_3"}>Giá từ cao đến thấp</MenuItem>
                                        <MenuItem onClick={() => setSort("sort_4")} value={"sort_4"}>Giá từ thấp đến cao</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <hr />
                        <ListProduct mdi="4" page={"product"} numPage={page}/>
                        <hr />
                        <Box display="flex" justifyContent="center" mb={2}>
                            <Pagination count={Math.ceil(products.length / 18)} page={page} onChange={onChangePage}/>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
export default Product;