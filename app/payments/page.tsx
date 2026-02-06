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
    Tabs,
    Tab
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Search,
    Filter,
    ArrowUpCircle,
    ArrowDownCircle,
    Plus,
    CreditCard,
    Wallet,
    QrCode,
    MoreVertical
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_TRANSACTIONS = [
    { id: 'TXN-4842', type: 'Credit (In)', from: 'Vikas Hardware', date: '2024-03-06', amount: '₹12,400', method: 'UPI', status: 'Success' },
    { id: 'TXN-4841', type: 'Debit (Out)', from: 'Bosch India Ltd', date: '2024-03-05', amount: '₹50,000', method: 'Bank Transfer', status: 'Success' },
    { id: 'TXN-4840', type: 'Credit (In)', from: 'BuildCon Pvt Ltd', date: '2024-03-05', amount: '₹15,000', method: 'Cash', status: 'Success' },
    { id: 'TXN-4839', type: 'Credit (In)', from: 'Rahul Sharma', date: '2024-03-04', amount: '₹850', method: 'UPI', status: 'Pending' },
    { id: 'TXN-4838', type: 'Debit (Out)', from: 'Rent - Shop', date: '2024-03-01', amount: '₹18,000', method: 'Cheque', status: 'Success' },
];

export default function Payments() {
    const [tab, setTab] = useState(0);

    return (
        <DashboardLayout>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Accounts & Ledger</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Streamlined cash flow monitoring.
                    </Typography>
                </Box>
                <Button variant="contained" color="secondary" size="small" startIcon={<Plus size={16} />}>
                    New Payment
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ bgcolor: 'secondary.main', color: 'white', border: 'none' }}>
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 700 }}>CASH BALANCE</Typography>
                                <Wallet size={16} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>₹2,48,500</Typography>
                            <Button
                                size="small"
                                startIcon={<QrCode size={12} />}
                                sx={{
                                    mt: 1.5,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    fontSize: '0.65rem'
                                }}
                            >
                                Shop QR
                            </Button>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 1, bgcolor: alpha('#10b981', 0.1), color: '#10b981', borderRadius: 1 }}>
                            <ArrowDownCircle size={20} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>MONTHLY INFLOW</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>₹4,12,000</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 1, bgcolor: alpha('#ef4444', 0.1), color: '#ef4444', borderRadius: 1 }}>
                            <ArrowUpCircle size={20} />
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>MONTHLY OUTFLOW</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>₹1,85,500</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
                    <Tabs value={tab} onChange={(e, n) => setTab(n)} textColor="secondary" indicatorColor="secondary">
                        <Tab label="Transactions" sx={{ minHeight: 48, fontSize: '0.75rem' }} />
                        <Tab label="Bank Accounts" sx={{ minHeight: 48, fontSize: '0.75rem' }} />
                        <Tab label="UPI" sx={{ minHeight: 48, fontSize: '0.75rem' }} />
                    </Tabs>
                </Box>

                <Box sx={{ p: 1.5, display: 'flex', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search..."
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={14} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ maxWidth: 250 }}
                    />
                    <Button variant="outlined" size="small" startIcon={<Filter size={14} />}>
                        Filter
                    </Button>
                </Box>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>TXN ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Particulars</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Method</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {INITIAL_TRANSACTIONS.map((txn) => (
                                <TableRow key={txn.id} hover>
                                    <TableCell sx={{ fontSize: '0.75rem' }}>{txn.id}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: txn.type.includes('Credit') ? 'success.main' : 'error.main' }}>
                                            {txn.type.includes('Credit') ? <ArrowDownCircle size={12} /> : <ArrowUpCircle size={12} />}
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{txn.type}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{txn.from}</TableCell>
                                    <TableCell>{txn.date}</TableCell>
                                    <TableCell>
                                        <Chip label={txn.method} variant="outlined" />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>{txn.amount}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={txn.status}
                                            sx={{
                                                bgcolor: txn.status === 'Success' ? alpha('#10b981', 0.1) : alpha('#f59e0b', 0.1),
                                                color: txn.status === 'Success' ? 'success.main' : 'warning.main',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small">
                                            <MoreVertical size={14} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </DashboardLayout>
    );
}
