'use client';

import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DRAWER_WIDTH = 260;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                isMobile={isMobile}
            />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
                <Navbar onToggleSidebar={handleDrawerToggle} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 1.5, sm: 2, md: 3 },
                        maxWidth: '1600px',
                        mx: 'auto',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
