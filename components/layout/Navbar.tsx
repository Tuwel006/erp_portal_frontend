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
    Plus,
    ArrowRightLeft,
    Menu
} from 'lucide-react';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1.5),
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
        padding: theme.spacing(0.75, 1, 0.75, 0),
        paddingLeft: `calc(1em + ${theme.spacing(3.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '0.8rem',
        [theme.breakpoints.up('md')]: {
            width: '32ch',
        },
    },
}));

interface NavbarProps {
    onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
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
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1.5, sm: 2 }, minHeight: { xs: 56, sm: 64 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onToggleSidebar}
                        sx={{ display: { lg: 'none' }, ml: 0 }}
                    >
                        <Menu size={20} />
                    </IconButton>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            bgcolor: alpha('#0f172a', 0.04),
                            borderRadius: 1,
                            px: 1,
                            position: 'relative'
                        }}
                    >
                        <SearchIconWrapper>
                            <Search size={14} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Quick search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ArrowRightLeft size={14} />}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            borderRadius: 1,
                            borderColor: 'divider',
                            color: 'text.secondary',
                            fontSize: '0.75rem'
                        }}
                    >
                        Switch
                    </Button>

                    <IconButton size="small" sx={{ display: { xs: 'flex', md: 'none' }, bgcolor: alpha('#0f172a', 0.03) }}>
                        <Search size={16} />
                    </IconButton>

                    <Tooltip title="Notifications">
                        <IconButton size="small" sx={{ bgcolor: alpha('#0f172a', 0.03) }}>
                            <Badge variant="dot" color="error">
                                <Bell size={18} />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 0.5 }}>
                        <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1, fontSize: '0.8rem' }}>Admin</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Owner</Typography>
                        </Box>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'primary.main',
                                fontSize: '0.75rem',
                                fontWeight: 700
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
