import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
// import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FastView = ({ openView, onCloseView, product, addProductToCart }) => {
    return (
        <Dialog open={openView} onClose={onCloseView} TransitionComponent={Transition}>
            <Box p={4} display="flex" position="relative">
                <img width="400" src="https://cdn.shopify.com/s/files/1/0361/9563/1237/products/VR247-10234094_300x.jpg?v=1587357151" alt="1" />
                <Box>

                </Box>
                <IconButton 
                    onClick={onCloseView}
                    size="small"
                    sx={{position: "absolute", top: 2, right: 2}}
                >
                    <ClearIcon 
                        sx={{
                            ":hover": {
                                color: "black"
                            }}}
                    />
                </IconButton>
            </Box>
        </Dialog>
    );
}
export default FastView;