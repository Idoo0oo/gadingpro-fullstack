// gadingpro-admin/src/MyAppBar.jsx
import * as React from 'react';
import { AppBar, TitlePortal } from 'react-admin';
import { Box, Typography } from '@mui/material';

const MyAppBar = () => (
    <AppBar color="primary" sx={{
        background: 'linear-gradient(to right, #434343 0%, black 100%)' // Gradien abu-abu gelap
    }}>
        <TitlePortal />
        <Box flex="1" />
        <Box
            component="img"
            sx={{
                height: 40,
                mr: 0,
            }}
            alt="GadingPro Logo"
            src="https://agents-events-prod.storage.googleapis.com/wp-content/uploads/sites/20/2024/03/20035510/Gading-Pro-Logo.png"
        />
        <Typography variant="h6" color="inherit" id="react-admin-title" sx={{
            letterSpacing: '0.5px'
        }} />
    </AppBar>
);

export default MyAppBar;