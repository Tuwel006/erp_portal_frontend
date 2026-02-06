'use client';

import React, { useState } from 'react';
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
    Chip,
    IconButton,
    alpha,
    Button,
    Avatar,
    Switch,
    Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Plus,
    Shield,
    MoreVertical,
    UserMinus,
    UserCheck,
    Lock
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_USERS = [
    { id: '1', name: 'Admin User', role: 'Super Admin', email: 'admin@primeerp.com', status: 'Active', lastLogin: '2 mins ago' },
    { id: '2', name: 'Sales Head', role: 'Sales Manager', email: 'sales@primeerp.com', status: 'Active', lastLogin: '1 hour ago' },
    { id: '3', name: 'Inventory Manager', role: 'Warehouse Lead', email: 'stock@primeerp.com', status: 'Inactive', lastLogin: '2 days ago' },
    { id: '4', name: 'Accountant', role: 'Billing Operator', email: 'accounts@primeerp.com', status: 'Active', lastLogin: '10 mins ago' },
];

export default function UserManagement() {
    const [users, setUsers] = useState(INITIAL_USERS);

    return (
        <DashboardLayout>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>User Management</Typography>
                    <Typography variant="body2" color="text.secondary">Access control, simplified.</Typography>
                </Box>
                <Button variant="contained" color="secondary" size="small" startIcon={<Plus size={16} />}>
                    Invite User
                </Button>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Activity</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <Avatar sx={{ bgcolor: 'secondary.main', width: 28, height: 28, fontSize: '0.65rem' }}>
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{user.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{user.email}</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip icon={<Shield size={10} />} label={user.role} variant="outlined" />
                                            </TableCell>
                                            <TableCell><Typography variant="caption">{user.lastLogin}</Typography></TableCell>
                                            <TableCell><Switch checked={user.status === 'Active'} size="small" color="secondary" /></TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small"><Lock size={14} /></IconButton>
                                                <IconButton size="small"><MoreVertical size={14} /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 2, bgcolor: alpha('#6366f1', 0.02) }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Access Summary</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ p: 0.75, bgcolor: alpha('#10b981', 0.1), color: '#10b981', borderRadius: 0.5 }}>
                                        <UserCheck size={14} />
                                    </Box>
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Active Seats</Typography>
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>04 / 10</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ p: 0.75, bgcolor: alpha('#ef4444', 0.1), color: '#ef4444', borderRadius: 0.5 }}>
                                        <UserMinus size={14} />
                                    </Box>
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Deactivated</Typography>
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>01</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.65rem' }}>
                            You have 5 available seats.
                            <Button size="small" sx={{ ml: 0.5, fontSize: '0.65rem' }}>Upgrade</Button>
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
