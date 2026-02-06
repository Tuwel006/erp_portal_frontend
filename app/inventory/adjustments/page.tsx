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
    MenuItem
} from '@mui/material';
import {
    Search,
    Plus,
    RefreshCw,
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    Box as BoxIcon
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_ADJUSTMENTS = [
    { id: 'ADJ-001', date: '2024-03-05', product: 'Loose Nails', type: 'Add (+)', qty: 20, reason: 'Physical Count correction', user: 'Admin' },
    { id: 'ADJ-002', date: '2024-03-04', product: 'PVC Pipes', type: 'Subtract (-)', qty: 2, reason: 'Damaged in Warehouse', user: 'Warehouse Lead' },
];

export default function StockAdjustments() {
    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Stock Adjustments</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manually update stock counts for corrections or damages.
                    </Typography>
                </Box>
                <Button variant="contained" color="secondary" startIcon={<Plus size={20} />} sx={{ borderRadius: 2 }}>
                    New Adjustment
                </Button>
            </Box>

            <Card sx={{ borderRadius: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: alpha('#f1f5f9', 0.5) }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Adjustment Type</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Adjusted By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {INITIAL_ADJUSTMENTS.map((adj) => (
                                <TableRow key={adj.id} hover>
                                    <TableCell>{adj.date}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{adj.product}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={adj.type}
                                            size="small"
                                            sx={{
                                                borderRadius: 2,
                                                bgcolor: adj.type.includes('+') ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
                                                color: adj.type.includes('+') ? 'success.main' : 'error.main',
                                                fontWeight: 800
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>{adj.qty}</TableCell>
                                    <TableCell color="text.secondary">{adj.reason}</TableCell>
                                    <TableCell>{adj.user}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </DashboardLayout>
    );
}
