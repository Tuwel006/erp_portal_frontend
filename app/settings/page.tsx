'use client';

import React from 'react';
import {
    Box,
    Typography,
    Card,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Settings,
    Bell,
    Lock,
    Globe,
    Smartphone,
    Cloud,
    Database,
    Zap,
    ChevronRight,
    Palette
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const settingsGroups = [
    {
        title: 'App Preferences',
        items: [
            { icon: <Palette size={16} />, text: 'Theme & Aesthetics', desc: 'Colors and dark mode', action: 'Toggle' },
            { icon: <Globe size={16} />, text: 'Language & Locale', desc: 'English (India)', action: 'Link' },
            { icon: <Bell size={16} />, text: 'Notifications', desc: 'System alerts', action: 'Toggle' }
        ]
    },
    {
        title: 'Security & Backup',
        items: [
            { icon: <Lock size={16} />, text: 'Two-Factor Auth', desc: 'Secure your account', action: 'Toggle' },
            { icon: <Database size={16} />, text: 'Data Backup', desc: 'Last: 4 hours ago', action: 'Link' },
            { icon: <Cloud size={16} />, text: 'Cloud Sync', desc: 'Sync across devices', action: 'Toggle' }
        ]
    },
    {
        title: 'Control',
        items: [
            { icon: <Zap size={16} />, text: 'Performance Mode', desc: 'Low bandwidth opt', action: 'Toggle' },
            { icon: <Smartphone size={16} />, text: 'Mobile Linked', desc: 'Manage devices', action: 'Link' }
        ]
    }
];

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>System Settings</Typography>
                <Typography variant="body2" color="text.secondary">
                    Small, sharp, beautiful configuration.
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {settingsGroups.map((group) => (
                    <Grid size={{ xs: 12 }} key={group.title}>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary', letterSpacing: 1, display: 'block' }}>
                            {group.title.toUpperCase()}
                        </Typography>
                        <Card sx={{ overflow: 'hidden' }}>
                            <List disablePadding>
                                {group.items.map((item, idx) => (
                                    <React.Fragment key={item.text}>
                                        <ListItem
                                            secondaryAction={
                                                item.action === 'Toggle' ? (
                                                    <Switch color="secondary" size="small" defaultChecked={idx === 0} />
                                                ) : (
                                                    <IconButton size="small"><ChevronRight size={14} /></IconButton>
                                                )
                                            }
                                            sx={{ py: 1.5, px: 2 }}
                                        >
                                            <ListItemIcon sx={{ color: 'secondary.main', minWidth: 32 }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.text}
                                                secondary={item.desc}
                                                primaryTypographyProps={{ fontWeight: 700, fontSize: '0.8rem' }}
                                                secondaryTypographyProps={{ fontSize: '0.7rem' }}
                                            />
                                        </ListItem>
                                        {idx < group.items.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button size="small">Restore</Button>
                <Button variant="contained" color="secondary" size="small" sx={{ px: 3 }}>
                    Apply All
                </Button>
            </Box>
        </DashboardLayout>
    );
}
