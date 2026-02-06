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
    Collapse
} from '@mui/material';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    ShoppingBag,
    Package,
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

const DRAWER_WIDTH = 280;

const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    {
        text: 'Sales',
        icon: <ShoppingCart size={20} />,
        children: [
            { text: 'New Sale', path: '/sales/new' },
            { text: 'Sales History', path: '/sales/history' },
            { text: 'Customers', path: '/sales/customers' },
        ]
    },
    {
        text: 'Purchase',
        icon: <ShoppingBag size={20} />,
        children: [
            { text: 'New Purchase', path: '/purchase/new' },
            { text: 'Purchase History', path: '/purchase/history' },
            { text: 'Suppliers', path: '/purchase/suppliers' },
        ]
    },
    {
        text: 'Inventory',
        icon: <BoxIcon size={20} />,
        children: [
            { text: 'Products', path: '/inventory/products' },
            { text: 'Stock Levels', path: '/inventory/stock' },
            { text: 'Adjustments', path: '/inventory/adjustments' },
        ]
    },
    { text: 'Reports', icon: <BarChart3 size={20} />, path: '/reports' },
    { text: 'GST Module', icon: <Receipt size={20} />, path: '/gst' },
    { text: 'Payments', icon: <Wallet size={20} />, path: '/payments' },
    { text: 'Chatbot', icon: <MessageSquareText size={20} />, path: '/chatbot' },
    {
        text: 'Configuration',
        icon: <Settings2 size={20} />,
        children: [
            { text: 'Company Setup', path: '/config/company' },
            { text: 'User Management', path: '/config/users' },
            { text: 'Role Management', path: '/config/roles' },
        ]
    },
    { text: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

    const handleToggleMenu = (text: string) => {
        setOpenMenus(prev => ({ ...prev, [text]: !prev[text] }));
    };

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
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
        >
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'secondary.main',
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Building2 color="white" size={24} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: -0.5 }}>
                    PRIME ERP
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            <List sx={{ px: 2, py: 2 }}>
                {menuItems.map((item) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => item.children ? handleToggleMenu(item.text) : handleNavigate(item.path!)}
                                sx={{
                                    borderRadius: 1.5,
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                                    bgcolor: pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '0.875rem',
                                        fontWeight: pathname === item.path ? 600 : 500
                                    }}
                                />
                                {item.children && (openMenus[item.text] ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                            </ListItemButton>
                        </ListItem>
                        {item.children && (
                            <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ mb: 1 }}>
                                    {item.children.map((child) => (
                                        <ListItemButton
                                            key={child.text}
                                            onClick={() => handleNavigate(child.path)}
                                            sx={{
                                                pl: 6,
                                                borderRadius: 1.5,
                                                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                                                bgcolor: pathname === child.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            }}
                                        >
                                            <ListItemText
                                                primary={child.text}
                                                primaryTypographyProps={{
                                                    fontSize: '0.8rem',
                                                    fontWeight: pathname === child.path ? 600 : 400,
                                                    color: pathname === child.path ? 'white' : 'rgba(255,255,255,0.7)'
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

            <Box sx={{ mt: 'auto', p: 2 }}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 1 }}>
                        <Lock size={16} />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Standard Plan</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Manage 2 Companies</Typography>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
