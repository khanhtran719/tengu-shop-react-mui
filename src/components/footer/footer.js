import React from "react";
import "./footer.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
    return (
        <footer className="footer">
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{ xs: 5, sm: 10 }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                        <Box
                                fontSize="20px"
                                fontFamily="monospace"
                                fontWeight="700"
                            >
                                Tengu Shop
                            </Box>
                            <Box
                                width="50px"
                                borderBottom="3px solid"
                                marginTop="8px"
                                marginBottom="8px"
                            />
                            <Box>
                                Sản phẩm của Tengu Shop bao gồm: Tranh in canvas, Thảm trang trí, Gối trang trí (Gối tựa lưng), tượng trang trí bàn ghế trang trí, ga giường...
                                và một số sản phẩm trang trí khác.
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Box
                                fontSize="20px"
                                fontFamily="monospace"
                                fontWeight="700"
                            >
                                Thông tin
                            </Box>
                            <Box
                                width="50px"
                                borderBottom="3px solid"
                                marginTop="8px"
                                marginBottom="8px"
                            />
                            <Box display="flex" ml={-1}>
                                <NavigateNextIcon/>
                                <Box>
                                    <p className="footer__text__hover">Về chúng tôi</p>
                                </Box>
                            </Box>
                            <Box display="flex" ml={-1}>
                                <NavigateNextIcon/>
                                <Box>
                                    <p className="footer__text__hover">Chính sách và quy định chung</p>
                                </Box>
                            </Box>
                            <Box display="flex" ml={-1}>
                                <NavigateNextIcon/>
                                <Box>
                                    <p className="footer__text__hover">Chính sách bảo mật thông tin</p>
                                </Box>
                            </Box>
                            <Box display="flex" ml={-1}>
                                <NavigateNextIcon/>
                                <Box>
                                    <p className="footer__text__hover">Điều khoản sử dụng</p>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box
                                fontSize="20px"
                                fontFamily="monospace"
                                fontWeight="700"
                            >
                                Thông Tin Liên Hệ
                            </Box>
                            <Box
                                width="50px"
                                borderBottom="3px solid"
                                marginTop="8px"
                                marginBottom="8px"
                            />
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <AddLocationIcon/>
                                <Box ml={1}>
                                    Địa chỉ: 351A Lạc Long Quân, phường 5, quận 11, thành phố Hồ Chí Minh
                                </Box>
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <PhoneIcon />
                                <Box ml={1}>
                                    Hotline 1: 0123456789
                                </Box> 
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <PhoneIcon />
                                <Box ml={1}>
                                    Hotline 2: Chưa có
                                </Box> 
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <PhoneIcon />
                                <Box ml={1}>
                                    SĐT: 0987654321
                                </Box>  
                            </Box>
                            <Box display="flex" ml={-1} pt={0.5} pb={0.5}>
                                <EmailIcon />
                                <Box ml={1}>
                                    Email: info@tengu_vn.com.vn
                                </Box>  
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
                        Make My Home Workshop &reg; {new Date().getFullYear()}
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}
export default Footer;