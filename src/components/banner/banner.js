import React from "react";
import "./banner.css";
import Box from "@mui/material/Box";
import Banner1 from "../../assets/banner/banner_1.png";
import Banner2 from "../../assets/banner/banner_2.png";
import Banner3 from "../../assets/banner/banner_3.png";
import Banner4 from "../../assets/banner/banner_4.png";
import useWindowDimensions from "../../ultis/windowDimensions";

const Banner = () => {
    const { width } = useWindowDimensions();
    return (
        <div className="banner">
            <Box display={width < "1024" ? "block" : "flex"} justifyContent="space-between" >
                <Box position="relative">
                    <Box position="absolute" left="16px" bottom="8px">
                        <Box className="absolute__content">TẤT CẢ SẢN PHẨM</Box>
                        <p className="absolute__text">
                            Không gian đẹp của người tinh tế
                        </p>
                    </Box>
                    <img src={Banner1} width="99%" height="auto" alt="Tất cả sản phẩm" />
                </Box>
                <Box >
                    <Box position="relative">
                        <Box position="absolute" left="16px" bottom="8px">
                            <Box className="absolute__content">GIẤY DÁN TƯỜNG</Box>
                            <p className="absolute__text">
                                Không gian đẹp của người tinh tế
                            </p>
                        </Box>
                        <img src={Banner2} width="99%" height="auto" alt="Giấy dán tường" />
                    </Box>
                    <Box display={width < "1024" ? "block" : "flex"} justifyContent="space-between">
                        <Box position="relative">
                            <Box position="absolute" left="16px" bottom="8px">
                                <Box className="absolute__content">TRANH TREO TƯỜNG</Box>
                                <p className="absolute__text">
                                    Không gian đẹp của người tinh tế
                                </p>
                            </Box>

                            <img src={Banner3} width="99%" height="auto" alt="Tranh treo tường" />
                        </Box>
                        <Box position="relative">
                            <Box position="absolute" left="16px" bottom="8px">
                                <Box className="absolute__content">PHỤ KIỆN KHÁC</Box>
                                <p className="absolute__text">
                                    Không gian đẹp của người tinh tế
                                </p>
                            </Box>
                            <img src={Banner4} width="99%" height="auto" alt="Phụ kiện khác" />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
export default Banner;