import React, { useState } from 'react';
import { Container } from "@mui/material"
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
    PersonOutline,
    Logout,
    ListAlt,
    Password
} from "@mui/icons-material";

import Footer from "../components/footer/footer";
import ChangePass from '../components/accountPage/changePass';
import Information from '../components/accountPage/information';
import MyOrder from '../components/accountPage/myOrder';
import { useDispatch } from "react-redux";
import { actLogout } from "../actions/index";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        // style={{width: '100%'}}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Account = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box>
            {redirect ? <Redirect to="/"/> : ""}
            <Container maxWidth="lg">
                <Box
                    sx={{ flexGrow: 1, backgroundColor: "#fff", display: 'flex', marginY: 3, minHeight: 500 }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab
                            sx={{ textTransform: "none" }}
                            label={
                                <Box display="flex">
                                    <PersonOutline />
                                    <Typography
                                        sx={{ paddingX: 1 }}
                                    >
                                        Thông tin tài khoản
                                    </Typography>
                                </Box>
                            }
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{ textTransform: "none" }}
                            label={
                                <Box display="flex">
                                    <ListAlt />
                                    <Typography
                                        sx={{ paddingX: 1 }}
                                    >
                                        Đơn hàng của tôi
                                    </Typography>
                                </Box>
                            }
                            {...a11yProps(1)}
                        />
                        <Tab
                            sx={{ textTransform: "none" }}
                            label={
                                <Box display="flex">
                                    <Password />
                                    <Typography
                                        sx={{ paddingX: 1 }}
                                    >
                                        Bảo mật tài khoản
                                    </Typography>
                                </Box>
                            }
                            {...a11yProps(2)}
                        />
                        <Tab
                            sx={{ textTransform: "none" }}
                            label={
                                <Box display="flex">
                                    <Logout />
                                    <Link to="/" style={{textDecoration: "none", color: "gray"}}
                                    onClick={() => {
                                        dispatch(actLogout());
                                        setRedirect(true);
                                        localStorage.setItem("access_token", "");
                                    }}>
                                        <Typography
                                            sx={{ paddingX: 1 }}
                                        >
                                            Đăng xuất
                                        </Typography>
                                    </Link>
                                </Box>
                            }
                            {...a11yProps(3)}
                        />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Information />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MyOrder />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ChangePass />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Five
                    </TabPanel>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}

export default Account;