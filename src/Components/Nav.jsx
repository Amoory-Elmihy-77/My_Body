import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import HeartLogo from '/organs/heart.png';


export default function Nav() {

    return (
        <>
            {/* Top Navigation Bar */}
            <AppBar position="static" sx={{paddingBlock: 1, backgroundColor: '#007bff'}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 56, height: 56 }} alt="Heart" src={HeartLogo} />
                            <Typography
                                variant="h3"
                                sx={{
                                    ml: 1,
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontFamily: 'Harmattan, sans-serif',
                                }}
                            >
                                القلب
                            </Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}