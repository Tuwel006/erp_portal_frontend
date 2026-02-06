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
    Pagination
} from '@mui/material';
import {
    Search,
    Filter,
    MoreVertical,
    FileText,
    Download,
    Eye,
    Calendar,
    Truck
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_PURCHASES = [
    { id: 'PUR-2024-001', supplier: 'Bosch India Ltd', date: '2024-03-05', amount: '₹1,42,400', status: 'Received', type: 'GST', billNo: 'BOS/24/091' },
    { id: 'PUR-2024-002', supplier: 'Taparia Tools', date: '2024-03-04', amount: '₹22,850', status: 'Pending', type: 'GST', billNo: 'TAP-8842' },
    { id: 'PUR-2024-003', supplier: 'Local Hardware', date: '2024-03-02', amount: '₹4,500', status: 'Received', type: 'Non-GST', billNo: 'CASH-011' },
    { id: 'PUR-2024-004', supplier: 'Asian Paints Ltd', date: '2024-03-01', amount: '₹85,200', status: 'In-Transit', type: 'GST', billNo: 'AP-INV-992' },
    { id: 'PUR-2024-005', supplier: 'Supreme Pipes', date: '2024-02-28', amount: '₹15,900', status: 'Received', type: 'GST', billNo: 'SP-2024-42' },
];

export default function PurchaseHistory() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Purchase History</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Track your inward stock, vendor bills and procurement history.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<Download size={18} />} sx={{ borderRadius: 2 }}>
                        Procurement Report
                    </Button>
                </Box>
            </Box>

            <Card sx={{ borderRadius: 3 }}>
                <Box sx={{ p: 3, display: 'flex', gap: 2 }}>
                    <TextField
                        placeholder="Search by Bill No, Supplier or Purchase ID..."
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
                    <Button variant="outlined" startIcon={<Filter size={18} />} sx={{ borderRadius: 2 }}>
                        Filters
                    </Button>
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha('#f1f5f9', 0.5) }}>
                                <TableCell sx={{ fontWeight: 600 }}>Purchase ID</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Vendor / Supplier</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Bill Number</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Tax Type</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {INITIAL_PURCHASES.map((pur) => (
                                <TableRow key={pur.id} hover>
                                    <TableCell sx={{ fontWeight: 600, color: 'secondary.main' }}>{pur.id}</TableCell>
                                    <TableCell>{pur.supplier}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{pur.billNo}</TableCell>
                                    <TableCell>{pur.date}</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>{pur.amount}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={pur.type}
                                            size="small"
                                            variant="outlined"
                                            sx={{ borderRadius: 1.5, borderColor: 'divider' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={pur.status}
                                            size="small"
                                            sx={{
                                                borderRadius: 2,
                                                bgcolor: pur.status === 'Received' ? alpha('#10b981', 0.1) : pur.status === 'Pending' ? alpha('#f59e0b', 0.1) : alpha('#6366f1', 0.1),
                                                color: pur.status === 'Received' ? 'success.main' : pur.status === 'Pending' ? 'warning.main' : 'primary.main',
                                                fontWeight: 700,
                                                fontSize: '0.7rem'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <IconButton size="small">
                                            <MoreVertical size={18} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={5} color="secondary" shape="rounded" />
                </Box>
            </Card>
        </DashboardLayout>
    );
}
