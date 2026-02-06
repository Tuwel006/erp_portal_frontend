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
    Truck,
    Mail,
    Phone,
    MapPin,
    History,
    MoreVertical,
    Edit3,
    Trash2,
    Briefcase
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_SUPPLIERS = [
    { id: 'SUP-001', name: 'Bosch India Ltd', mobile: '+91 1800 123 4567', email: 'sales@bosch.com', location: 'Bangalore', gstin: '29AAAAA0000A1Z5', balance: '₹42,500', totalPurchase: 145 },
    { id: 'SUP-002', name: 'Taparia Tools', mobile: '+91 22 1234 5678', email: 'info@taparia.com', location: 'Nashik', gstin: '27BBBBB1111B1Z2', balance: '₹12,000', totalPurchase: 82 },
    { id: 'SUP-003', name: 'Supreme Pipes', mobile: '+91 22 9999 8888', email: 'billing@supreme.co.in', location: 'Mumbai', gstin: '27CCCCC2222C1Z3', balance: '₹0', totalPurchase: 34 },
    { id: 'SUP-004', name: 'Asian Paints Ltd', mobile: '+91 800 209 5678', email: 'orders@asianpaints.com', location: 'Mumbai', gstin: '27DDDDD3333D1Z4', balance: '₹1,45,000', totalPurchase: 512 },
    { id: 'SUP-005', name: 'Local Hardware Wholesaler', mobile: '+91 98989 89898', email: 'local@wholesale.com', location: 'Mumbai', gstin: '', balance: '₹4,200', totalPurchase: 15 },
];

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const filteredSuppliers = suppliers.filter(sup =>
        sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.mobile.includes(searchTerm)
    );

    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Suppliers (Vendors)</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your procurement sources and outstanding payables.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Plus size={20} />}
                    onClick={() => setOpen(true)}
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    Add New Supplier
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>TOTAL VENDORS</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>84</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Truck size={16} color="#6366f1" />
                            <Typography variant="caption" color="text.secondary">Active supply chains</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid', borderColor: alpha('#ef4444', 0.1) }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>TOTAL PAYABLE</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'error.main' }}>₹2,03,700</Typography>
                        <Typography variant="caption" color="error.main" sx={{ fontWeight: 600 }}>Due in next 15 days</Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>MONTHLY PROCUREMENT</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>₹8,12,000</Typography>
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>+5.2% Volume</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ borderRadius: 3 }}>
                <Box sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <TextField
                        placeholder="Search by supplier name or mobile..."
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
                                <TableCell sx={{ fontWeight: 600 }}>Supplier</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>GSTIN</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Purchase Count</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Payable Balance</TableCell>
                                <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSuppliers.map((sup) => (
                                <TableRow key={sup.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: alpha('#10b981', 0.1), color: '#10b981', fontWeight: 700, fontSize: '0.875rem' }}>
                                                {sup.name.substring(0, 2).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600 }}>{sup.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{sup.id}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                <Phone size={12} />
                                                <Typography variant="caption">{sup.mobile}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                <Mail size={12} />
                                                <Typography variant="caption">{sup.email}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                            <MapPin size={14} />
                                            <Typography variant="body2">{sup.location}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: sup.gstin ? 600 : 400, color: sup.gstin ? 'text.primary' : 'text.disabled' }}>
                                            {sup.gstin || 'Unregistered'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Briefcase size={16} color="#64748b" />
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{sup.totalPurchase} orders</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 700,
                                                color: sup.balance !== '₹0' ? 'error.main' : 'success.main'
                                            }}
                                        >
                                            {sup.balance}
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
                <DialogTitle sx={{ fontWeight: 700 }}>Add New Supplier</DialogTitle>
                <DialogContent dividers sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField label="Company / Vendor Name" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="Mobile Number" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="Email Address" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField label="GSTIN" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField label="Office Address" fullWidth size="small" multiline rows={2} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="City" fullWidth size="small" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField label="Credit Limit" fullWidth size="small" type="number" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="secondary" sx={{ borderRadius: 2 }}>Save Supplier</Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
