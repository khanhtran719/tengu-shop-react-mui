    import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MyOrder = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Tất cả đơn hàng" {...a11yProps(0)} />
                    <Tab label="Chưa thanh toán" {...a11yProps(1)} />
                    <Tab label=" Xử lý" {...a11yProps(2)} />
                    <Tab label="Đã vận chuyển" {...a11yProps(2)} />
                    <Tab label="Trả lại" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Tất cả đơn hàng
            </TabPanel>
            <TabPanel value={value} index={1}>
                Chưa thanh toán
            </TabPanel>
            <TabPanel value={value} index={2}>
                Xử lý
            </TabPanel>
            <TabPanel value={value} index={3}>
                Đã vận chuyển
            </TabPanel>
            <TabPanel value={value} index={4}>
                Trả lại
            </TabPanel>
        </Box>
    );
}

export default MyOrder;