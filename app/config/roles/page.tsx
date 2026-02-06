'use client';

import React from 'react';
import {
    Box,
    Typography,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    alpha,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Plus,
    Shield,
    CheckCircle2,
    Lock,
    Eye,
    Edit3
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ROLES = [
    { name: 'Super Admin', users: 1, permissions: 'All Access' },
    { name: 'Sales Manager', users: 3, permissions: 'Sales, Customers, Reports' },
    { name: 'Warehouse Lead', users: 2, permissions: 'Inventory, Stock' },
    { name: 'Billing Operator', users: 4, permissions: 'New Sale, History' },
];

export default function RoleManagement() {
    return (
        <DashboardLayout>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Roles & Permissions</Typography>
                    <Typography variant="body2" color="text.secondary">Access control management.</Typography>
                </Box>
                <Button variant="contained" color="secondary" size="small" startIcon={<Plus size={16} />}>
                    New Role
                </Button>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Role Name</TableCell>
                                        <TableCell>Users</TableCell>
                                        <TableCell>Key Access</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ROLES.map((role) => (
                                        <TableRow key={role.name} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Shield size={14} color="#6366f1" />
                                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{role.name}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell><Typography variant="caption">{role.users} Users</Typography></TableCell>
                                            <TableCell><Typography variant="caption" color="text.secondary">{role.permissions}</Typography></TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small"><Edit3 size={14} /></IconButton>
                                                <IconButton size="small"><Eye size={14} /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Admin Permissions</Typography>
                        <List disablePadding>
                            {['Manage Users', 'Financials', 'Delete Logs', 'Settings', 'Export'].map(p => (
                                <ListItem key={p} sx={{ px: 0, py: 0.25 }}>
                                    <ListItemIcon sx={{ minWidth: 28 }}>
                                        <CheckCircle2 size={14} color="#10b981" />
                                    </ListItemIcon>
                                    <ListItemText primary={p} primaryTypographyProps={{ fontSize: '0.75rem', fontWeight: 600 }} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 1.5 }} />
                        <Button fullWidth variant="outlined" size="small" startIcon={<Lock size={14} />}>
                            Edit Access
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
