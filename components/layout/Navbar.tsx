'use client';

import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Badge,
    Tooltip,
    InputBase,
    alpha,
    styled,
    Button
} from '@mui/material';
import {
    Bell,
    Search,
    User,
    Plus,
    Command,
    ArrowRightLeft
} from 'lucide-react';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

export default function Navbar() {
    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: 'divider',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: alpha('#0f172a', 0.05),
                            borderRadius: 2,
                            px: 2,
                            position: 'relative'
                        }}
                    >
                        <SearchIconWrapper>
                            <Search size={18} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search anything... (Cmd + K)"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ArrowRightLeft size={16} />}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            borderRadius: 1.5,
                            borderColor: 'divider',
                            color: 'text.secondary'
                        }}
                    >
                        Switch Company
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<Plus size={16} />}
                        sx={{
                            borderRadius: 1.5,
                            display: { xs: 'none', sm: 'flex' }
                        }}
                    >
                        Quick Bill
                    </Button>

                    <Tooltip title="Notifications">
                        <IconButton size="small" sx={{ bgcolor: alpha('#0f172a', 0.03) }}>
                            <Badge variant="dot" color="error">
                                <Bell size={20} />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                        <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1 }}>Admin User</Typography>
                            <Typography variant="caption" color="text.secondary">Software Owner</Typography>
                        </Box>
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: 'primary.main',
                                fontSize: '0.875rem',
                                fontWeight: 600
                            }}
                        >
                            AU
                        </Avatar>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
