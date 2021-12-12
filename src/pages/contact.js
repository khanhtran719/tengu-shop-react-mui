import React from "react";
import {
    Box,
    Container,
    Typography,
} from "@mui/material";
import Footer from "../components/footer/footer";

const Contact = () => {
    return (
        <Box my={3}>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom component="div">
                    Thông tin liên hệ
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div" sx={{ px: 2 }}>
                    Hotline: 0123456789
                    <br />
                    Instagram: @tengu.noreply
                    <br />
                    Facebook: fb.com/tengushop
                    <br />
                    Chi nhánh Tp.Hcm: ...
                    <br/>
                    ...
                    <br/>
                    ...
                    <br/>
                    ...
                    <br />
                    Chi nhánh Hà Nội: ...
                    <br/>
                    ...
                    <br/>
                    ...
                    <br/>
                    ...
                    <br />
                    Chi nhánh Đà Nẵng: ...
                    <br/>
                    ...
                    <br/>
                    ...
                    <br/>
                    ...
                </Typography>
            </Container>
            <Footer />
        </Box>
    );
}
export default Contact;