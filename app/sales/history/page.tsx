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
    TextField,
    InputAdornment,
    alpha,
    Button,
    Menu,
    MenuItem,
    Pagination,
    Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Search,
    Filter,
    MoreVertical,
    FileText,
    Download,
    Eye,
    Printer,
    Trash2,
    Calendar,
    ArrowUpDown
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_SALES = [
    { id: 'INV-2024-001', customer: 'Vikas Hardware', date: '2024-03-01', amount: '₹12,400', status: 'Paid', type: 'GST', items: 5 },
    { id: 'INV-2024-002', customer: 'Rahul Sharma', date: '2024-03-01', amount: '₹850', status: 'Pending', type: 'Non-GST', items: 2 },
    { id: 'INV-2024-003', customer: 'BuildCon Pvt Ltd', date: '2024-02-28', amount: '₹45,000', status: 'Paid', type: 'GST', items: 12 },
    { id: 'INV-2024-004', customer: 'Amit Singh', date: '2024-02-28', amount: '₹1,200', status: 'Cancelled', type: 'Non-GST', items: 3 },
    { id: 'INV-2024-005', customer: 'New Tech Solutions', date: '2024-02-27', amount: '₹8,900', status: 'Paid', type: 'GST', items: 6 },
    { id: 'INV-2024-006', customer: 'Karan Traders', date: '2024-02-26', amount: '₹15,200', status: 'Paid', type: 'GST', items: 8 },
    { id: 'INV-2024-007', customer: 'Suresh Raina', date: '2024-02-25', amount: '₹3,400', status: 'Pending', type: 'Non-GST', items: 4 },
];

export default function SalesHistory() {
    const [sales, setSales] = useState(INITIAL_SALES);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSale, setSelectedSale] = useState<string | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedSale(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedSale(null);
    };

    const filteredSales = sales.filter(sale =>
        sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = () => {
        if (selectedSale) {
            setSales(sales.filter(s => s.id !== selectedSale));
        }
        handleMenuClose();
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Sales History</Typography>
                    <Typography variant="body2" color="text.secondary">Simplified log of all transactions.</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small" startIcon={<Download size={14} />}>Export</Button>
                    <Button variant="contained" color="secondary" size="small" startIcon={<Calendar size={14} />}>Date</Button>
                </Box>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 0.75, bgcolor: alpha('#6366f1', 0.1), color: '#6366f1', borderRadius: 0.5 }}>
                            <FileText size={16} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>INVOICES</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>142</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 0.75, bgcolor: alpha('#10b981', 0.1), color: '#10b981', borderRadius: 0.5 }}>
                            <ArrowUpDown size={16} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>TOTAL SALES</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>₹8.45L</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Card>
                <Box sx={{ p: 1.5, display: 'flex', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search invoices..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={14} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ maxWidth: 280 }}
                    />
                    <Button variant="outlined" size="small" startIcon={<Filter size={14} />}>Filter</Button>
                </Box>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Invoice ID</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSales.map((sale) => (
                                <TableRow key={sale.id} hover>
                                    <TableCell sx={{ fontWeight: 700, color: 'secondary.main', fontSize: '0.75rem' }}>{sale.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{sale.customer}</TableCell>
                                    <TableCell>{sale.date}</TableCell>
                                    <TableCell>{sale.items}</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>{sale.amount}</TableCell>
                                    <TableCell><Chip label={sale.type} variant="outlined" /></TableCell>
                                    <TableCell>
                                        <Chip
                                            label={sale.status}
                                            sx={{
                                                bgcolor: sale.status === 'Paid' ? alpha('#10b981', 0.1) : sale.status === 'Pending' ? alpha('#f59e0b', 0.1) : alpha('#ef4444', 0.1),
                                                color: sale.status === 'Paid' ? 'success.main' : sale.status === 'Pending' ? 'warning.main' : 'error.main',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, sale.id)}>
                                            <MoreVertical size={14} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={5} size="small" color="secondary" />
                </Box>
            </Card>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{ sx: { minWidth: 140 } }}
            >
                <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.75rem', gap: 1 }}>
                    <Eye size={14} /> View detail
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.75rem', gap: 1 }}>
                    <Printer size={14} /> Print
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDelete} sx={{ fontSize: '0.75rem', gap: 1, color: 'error.main' }}>
                    <Trash2 size={14} /> Delete
                </MenuItem>
            </Menu>
        </DashboardLayout>
    );
}
