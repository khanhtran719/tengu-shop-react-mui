import React from "react";
import {
    Box,
    Container,
    Typography,
} from "@mui/material";
import Footer from "../components/footer/footer";

const AboutUs = () => {
    return (
        <Box my={3}>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom component="div">
                    Giới thiệu về Tengu Shop
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div" sx={{ px: 2, width: 1/2 }}>
                    Tengu là xưởng tranh đầu tiên ở Việt Nam cung cấp dịch vụ in tranh canvas mang phong cách Nhật với chất lượng
                    hàng đầu và hộ trợ dịch vụ trọn gói. Hiện nay, Tengu còn phát triển và cung cấp rất nhiều sản phẩm với vô vàn
                    chủ đề khác nhau từ khắp nơi trên thế giới.
                    <br/><br/>
                    Tengu tư hào là thương hiệu uy tín đã được sử dụng trang trí cho hơn 200.000 căn hộ cao cấp trên toàn quốc.
                </Typography>
                <Typography variant="h4" gutterBottom component="div" mt={2}>
                    Hương dẫn đặt hàng
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div" sx={{ px: 2 }}>
                    Bước 1: Tìm sản phẩm ở trang sản phẩm
                    <br />
                    Bước 2: Chọn thêm sản phẩm
                    <br />
                    Bước 3: Vào giỏ hàng, kiểm tra số lượng và nhấn "Thanh toán"
                    <br />
                    Bước 4: Ở trang thanh toán, điền đầy đủ thông tin
                    <br />
                    Bước 5: Ấn thanh toán và kiểm tra ở phần "Đơn hàng của tôi"
                    <br />
                    <b>*Lưu ý:</b> Nhớ chọn "Connet Wallet" nếu thanh toán bằng hình thức Cryptocurrency
                </Typography>
            </Container>
            <Footer />
        </Box>
    );
}
export default AboutUs;