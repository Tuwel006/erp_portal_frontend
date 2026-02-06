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
    Paper,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    alpha,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Search,
    Plus,
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    History,
    MoreVertical,
    Edit3,
    Trash2
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_CUSTOMERS = [
    { id: 'CUST-001', name: 'Vikas Hardware', mobile: '+91 98765 43210', email: 'vikas@test.com', location: 'Mumbai', gstin: '27AAAAA0000A1Z5', balance: '₹4,500', totalOrders: 12 },
    { id: 'CUST-002', name: 'Rahul Sharma', mobile: '+91 88888 88888', email: 'rahul@gmail.com', location: 'Pune', gstin: '', balance: '₹0', totalOrders: 3 },
    { id: 'CUST-003', name: 'BuildCon Pvt Ltd', mobile: '+91 90000 11111', email: 'info@buildcon.in', location: 'Delhi', gstin: '07BBBBB1111B1Z2', balance: '₹28,600', totalOrders: 45 },
    { id: 'CUST-004', name: 'Amit Singh', mobile: '+91 77777 66666', email: 'amit@outlook.com', location: 'Jaipur', gstin: '', balance: '₹1,200', totalOrders: 5 },
    { id: 'CUST-005', name: 'New Tech Solutions', mobile: '+91 99999 88888', email: 'sales@newtech.com', location: 'Bangalore', gstin: '29CCCCC2222C1Z3', balance: '₹0', totalOrders: 8 },
];

export default function Customers() {
    const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const filteredCustomers = customers.filter(cust =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.mobile.includes(searchTerm)
    );

    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Customers</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your customer relations and their outstanding balances.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Plus size={20} />}
                    onClick={() => setOpen(true)}
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    Add New Customer
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, borderRadius: 3, bgcolor: alpha('#6366f1', 0.05), border: '1px solid', borderColor: alpha('#6366f1', 0.1) }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>TOTAL CUSTOMER BASE</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>1,245</Typography>
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>+12% from last month</Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, borderRadius: 3, bgcolor: alpha('#ef4444', 0.05), border: '1px solid', borderColor: alpha('#ef4444', 0.1) }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>TOTAL OUTSTANDING</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>₹1,42,800</Typography>
                        <Typography variant="caption" color="error.main" sx={{ fontWeight: 600 }}>Needs collection from 48 customers</Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, borderRadius: 3, bgcolor: alpha('#10b981', 0.05), border: '1px solid', borderColor: alpha('#10b981', 0.1) }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>ACTIVE THIS MONTH</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>482</Typography>
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>35 New registrations</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ borderRadius: 3 }}>
                <Box sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <TextField
                        placeholder="Search by name, mobile or mobile..."
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ maxWidth: 500 }}
                    />
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha('#f1f5f9', 0.5) }}>
                                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>GSTIN</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Total Orders</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Outstanding</TableCell>
                                <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomers.map((cust) => (
                                <TableRow key={cust.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: alpha('#6366f1', 0.1), color: '#6366f1', fontWeight: 700, fontSize: '0.875rem' }}>
                                                {cust.name.substring(0, 2).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>{cust.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{cust.id}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                <Phone size={12} />
                                                <Typography variant="caption">{cust.mobile}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                <Mail size={12} />
                                                <Typography variant="caption">{cust.email}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                            <MapPin size={14} />
                                            <Typography variant="body2">{cust.location}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: cust.gstin ? 600 : 400, color: cust.gstin ? 'text.primary' : 'text.disabled' }}>
                                            {cust.gstin || 'No GST'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <History size={16} color="#64748b" />
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{cust.totalOrders}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 700,
                                                color: cust.balance !== '₹0' ? 'error.main' : 'success.main'
                                            }}
                                        >
                                            {cust.balance}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <IconButton size="small" color="primary">
                                                <Edit3 size={18} />
                                            </IconButton>
                                            <IconButton size="small">
                                                <MoreVertical size={18} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>Add New Customer</DialogTitle>
                <DialogContent dividers sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField label="Full Name / Business Name" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="Mobile Number" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="Email Address" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField label="GSTIN" fullWidth size="small" placeholder="27XXXXX0000X1Z5" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField label="Billing Address" fullWidth size="small" multiline rows={2} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="City" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="Opening Balance" fullWidth size="small" type="number" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="secondary" sx={{ borderRadius: 2 }}>Save Customer</Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
