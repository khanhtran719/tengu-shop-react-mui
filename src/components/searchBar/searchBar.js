import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const SearchForm = ({ openSearch, onCloseSearch }) => {
    const [searchText, setSearchText] = useState("");

    const Product = useSelector(state => state.Product);

    const onClose = () => {
        setSearchText("");
        onCloseSearch();
    }
    return (
        <Drawer
            anchor="top"
            open={openSearch}
            onClose={onClose}
        >
            <Box sx={{ width: 500, p: 2, m: "0 auto" }} display="flex" justifyContent="space-between">
                <Autocomplete
                    freeSolo
                    size="small"
                    sx={{ width: 1, mr: 3 }}
                    id="search-bar"
                    open={searchText !== "" ? true : false}
                    disableClearable
                    options={Product.products}
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                        <Box {...props}>
                            <img
                                loading="lazy"
                                width="60"
                                src={option.img}
                                alt=""
                            />
                            {option.title}
                        </Box>
                    )
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tìm kiếm"
                            onChange={(event) => setSearchText(event.target.value)}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <IconButton size="small">
                    <SearchIcon />
                </IconButton>
            </Box>
        </Drawer>
    );
}
export default SearchForm;