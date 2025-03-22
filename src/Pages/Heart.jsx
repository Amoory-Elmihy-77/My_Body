import Nav from '../Components/Nav'
import Puzzle from '../Components/Puzzle/Puzzle'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
          {...other}
          className='w-full'
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
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
export default function Heart() {
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <div>
            <Nav />
            <Box sx={{ width: "100%", mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        width: "fit-content",
                        borderRadius: "12px",
                        backgroundColor: "#f8f9fa", // Light gray background
                        p: 1,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="styled tabs"
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#007bff", // Blue indicator color
                                height: "4px",
                                borderRadius: "5px",
                            },
                            "& .MuiTab-root": {
                                textTransform: "none",
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "#555",
                                transition: "0.3s",
                                "&:hover": {
                                    color: "#007bff",
                                },
                                "&.Mui-selected": {
                                    color: "#007bff",
                                    fontWeight: "bold",
                                },
                            },
                        }}
                    >
                        <Tab
                            sx={{
                                fontFamily: 'Harmattan, sans-serif', fontSize: {
                                    sm: '23px !important',
                                    md: '30px !important',
                                }
                            }} label="تفاصيل العضو" {...a11yProps(0)} />
                        <Tab
                            sx={{
                                fontFamily: 'Harmattan, sans-serif', fontSize: {
                                    sm: '23px !important',
                                    md: '30px !important',
                                }
                            }} label="اختبر نفسك" {...a11yProps(1)} />
                        <Tab
                            sx={{
                                fontFamily: 'Harmattan, sans-serif', fontSize: {
                                    sm: '23px !important',
                                    md: '30px !important',
                                }
                            }} label="يلا نلعب" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <h1>تفاصيل العضو</h1>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <h1>اختبر نفسك</h1>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Puzzle />
                </CustomTabPanel>
            </Box>
        </div>
    )
}
