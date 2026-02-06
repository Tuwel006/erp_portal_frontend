'use client';

import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Collapse,
    alpha
} from '@mui/material';
import {
    LayoutDashboard,
    ShoppingCart,
    ShoppingBag,
    BarChart3,
    Settings,
    ChevronDown,
    ChevronRight,
    Receipt,
    Wallet,
    Settings2,
    Lock,
    MessageSquareText,
    Building2,
    Box as BoxIcon
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const DRAWER_WIDTH = 260;

const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
    {
        text: 'Sales',
        icon: <ShoppingCart size={18} />,
        children: [
            { text: 'New Sale', path: '/sales/new' },
            { text: 'Sales History', path: '/sales/history' },
            { text: 'Customers', path: '/sales/customers' },
        ]
    },
    {
        text: 'Purchase',
        icon: <ShoppingBag size={18} />,
        children: [
            { text: 'New Purchase', path: '/purchase/new' },
            { text: 'Purchase History', path: '/purchase/history' },
            { text: 'Suppliers', path: '/purchase/suppliers' },
        ]
    },
    {
        text: 'Inventory',
        icon: <BoxIcon size={18} />,
        children: [
            { text: 'Products', path: '/inventory/products' },
            { text: 'Stock Levels', path: '/inventory/stock' },
            { text: 'Adjustments', path: '/inventory/adjustments' },
        ]
    },
    { text: 'Reports', icon: <BarChart3 size={18} />, path: '/reports' },
    { text: 'GST Module', icon: <Receipt size={18} />, path: '/gst' },
    { text: 'Payments', icon: <Wallet size={18} />, path: '/payments' },
    { text: 'Chatbot', icon: <MessageSquareText size={18} />, path: '/chatbot' },
    {
        text: 'Configuration',
        icon: <Settings2 size={18} />,
        children: [
            { text: 'Company Setup', path: '/config/company' },
            { text: 'User Management', path: '/config/users' },
            { text: 'Role Management', path: '/config/roles' },
        ]
    },
    { text: 'Settings', icon: <Settings size={18} />, path: '/settings' },
];

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    isMobile: boolean;
}

export default function Sidebar({ open, onClose, isMobile }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

    const handleToggleMenu = (text: string) => {
        setOpenMenus(prev => ({ ...prev, [text]: !prev[text] }));
    };

    const handleNavigate = (path: string) => {
        router.push(path);
        if (isMobile) onClose();
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'secondary.main',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Building2 color="white" size={18} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                    PRIME ERP
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

            <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding sx={{ mb: 0.25 }}>
                            <ListItemButton
                                onClick={() => item.children ? handleToggleMenu(item.text) : handleNavigate(item.path!)}
                                sx={{
                                    borderRadius: 1,
                                    py: 1,
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                                    bgcolor: pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '0.8rem',
                                        fontWeight: pathname === item.path ? 700 : 500,
                                        color: pathname === item.path ? 'white' : 'rgba(255,255,255,0.8)'
                                    }}
                                />
                                {item.children && (openMenus[item.text] ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
                            </ListItemButton>
                        </ListItem>
                        {item.children && (
                            <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ mb: 0.5 }}>
                                    {item.children.map((child) => (
                                        <ListItemButton
                                            key={child.text}
                                            onClick={() => handleNavigate(child.path)}
                                            sx={{
                                                pl: 5.5,
                                                py: 0.75,
                                                borderRadius: 1,
                                                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                                                bgcolor: pathname === child.path ? alpha('#fff', 0.08) : 'transparent',
                                            }}
                                        >
                                            <ListItemText
                                                primary={child.text}
                                                primaryTypographyProps={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: pathname === child.path ? 700 : 400,
                                                    color: pathname === child.path ? 'white' : 'rgba(255,255,255,0.6)'
                                                }}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>

            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'rgba(255,255,255,0.08)' }}>
                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: 'rgba(255,255,255,0.04)',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5
                    }}
                >
                    <Box sx={{ bgcolor: 'secondary.main', p: 0.75, borderRadius: 0.75 }}>
                        <Lock size={14} color="white" />
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', lineHeight: 1.2 }}>Standard Plan</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Active Account</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRight: 'none',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRight: 'none',
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
}
