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
    LinearProgress
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Search,
    ArrowUpRight,
    Box as BoxIcon,
    AlertTriangle,
    Eye,
    TrendingUp
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_STOCK = [
    { id: '1', name: 'Drill Machine - Bosch', sku: 'BSH-DRL-01', stock: 15, capacity: 50, unit: 'pcs', category: 'Power Tools', value: '₹67,500' },
    { id: '2', name: 'Screwdriver Set', sku: 'TAP-SCR-42', stock: 42, capacity: 60, unit: 'set', category: 'Hand Tools', value: '₹35,700' },
    { id: '3', name: 'Loose Nails (1 inch)', sku: 'HRW-NAL-01', stock: 120, capacity: 200, unit: 'kg', category: 'Hardware', value: '₹14,400' },
    { id: '4', name: 'PVC Pipes (10ft)', sku: 'SUP-PVC-10', stock: 8, capacity: 100, unit: 'pcs', category: 'Plumbing', value: '₹3,600' },
    { id: '5', name: 'Asian Paints White (1L)', sku: 'ASP-PNT-01', stock: 25, capacity: 40, unit: 'box', category: 'Paints', value: '₹16,250' },
];

export default function StockLevels() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DashboardLayout>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Stock Analysis</Typography>
                    <Typography variant="body2" color="text.secondary">Real-time inventory levels.</Typography>
                </Box>
                <Button variant="contained" color="secondary" size="small" startIcon={<TrendingUp size={14} />}>
                    Valuation Report
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>INV VALUE</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>₹12.45L</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
                            <ArrowUpRight size={12} />
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>+4.2%</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>MOVEMENTS</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>842</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'secondary.main' }}>
                            <BoxIcon size={12} />
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>Active</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ p: 2, bgcolor: alpha('#ef4444', 0.02), border: '1px solid', borderColor: alpha('#ef4444', 0.1) }}>
                        <Typography variant="caption" color="error.main" sx={{ fontWeight: 800 }}>LOW STOCK ALERTS</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'error.main' }}>12 Items</Typography>
                        <Typography variant="caption" color="text.secondary">Immediate attention required</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Card>
                <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search SKU or Product..."
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={14} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ maxWidth: 300 }}
                    />
                </Box>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell width="20%">Utilization</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {INITIAL_STOCK.map((item) => {
                                const percentage = (item.stock / item.capacity) * 100;
                                const isLow = percentage < 25;
                                return (
                                    <TableRow key={item.id} hover>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{item.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{item.unit}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={item.sku} variant="outlined" />
                                        </TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={percentage > 100 ? 100 : percentage}
                                                    sx={{ flexGrow: 1, height: 4, borderRadius: 1 }}
                                                />
                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>{Math.round(percentage)}%</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 700, color: isLow ? 'error.main' : 'inherit' }}>{item.stock}</Typography>
                                                {isLow && <AlertTriangle size={12} color="#ef4444" />}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>{item.value}</TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small"><Eye size={14} /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </DashboardLayout>
    );
}
