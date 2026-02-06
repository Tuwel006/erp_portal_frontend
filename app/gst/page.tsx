'use client';

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    alpha,
    Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Download,
    FileText,
    Database,
    Calendar,
    ChevronDown
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const gstSummary = [
    { type: 'Sales (Output GST)', taxable: '₹8,50,000', cgst: '₹76,500', sgst: '₹76,500', total: '₹1,53,000' },
    { type: 'Purchase (Input GST Credit)', taxable: '₹4,20,000', cgst: '₹37,800', sgst: '₹37,800', total: '₹75,600' },
    { type: 'Net GST Payable', taxable: '-', cgst: '₹38,700', sgst: '₹38,700', total: '₹77,400' },
];

export default function GstModule() {
    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>GST Reports & Summary</Typography>
                    <Typography variant="body2" color="text.secondary">
                        GSTR-1 Ready Data for the current financial year.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Calendar size={18} />}
                        endIcon={<ChevronDown size={14} />}
                        sx={{ borderRadius: 2, color: 'text.primary', borderColor: 'divider' }}
                    >
                        February 2024
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Download size={18} />}
                        sx={{ borderRadius: 2 }}
                    >
                        Export JSON (GSTR-1)
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            bgcolor: alpha('#10b981', 0.05),
                            border: '1px solid',
                            borderColor: alpha('#10b981', 0.2),
                            boxShadow: 'none'
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography color="success.main" sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                    Total ITC Available
                                </Typography>
                                <FileText size={18} color="#10b981" />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>₹75,600</Typography>
                            <Typography variant="caption" color="text.secondary">From eligible GST purchases</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            bgcolor: alpha('#ef4444', 0.05),
                            border: '1px solid',
                            borderColor: alpha('#ef4444', 0.2),
                            boxShadow: 'none'
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography color="error.main" sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                    Total Tax Payable
                                </Typography>
                                <Database size={18} color="#ef4444" />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>₹1,53,000</Typography>
                            <Typography variant="caption" color="text.secondary">Total Output Liability</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            bgcolor: alpha('#6366f1', 0.05),
                            border: '1px solid',
                            borderColor: alpha('#6366f1', 0.2),
                            boxShadow: 'none'
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography color="secondary.main" sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                    Net Cash Payment
                                </Typography>
                                <FileText size={18} color="#6366f1" />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>₹77,400</Typography>
                            <Typography variant="caption" color="text.secondary">After ITC Adjustment</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ borderRadius: 3, mb: 4 }}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Consolidated GST Summary</Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: alpha('#f1f5f9', 0.5) }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Taxable Value</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>CGST</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>SGST</TableCell>
                                <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Total Tax</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gstSummary.map((row, idx) => (
                                <TableRow key={idx} sx={{ '&:last-child': { bgcolor: alpha('#f8fafc', 0.8) } }}>
                                    <TableCell sx={{ fontWeight: idx === 2 ? 700 : 500 }}>{row.type}</TableCell>
                                    <TableCell>{row.taxable}</TableCell>
                                    <TableCell>{row.cgst}</TableCell>
                                    <TableCell>{row.sgst}</TableCell>
                                    <TableCell sx={{ textAlign: 'right', fontWeight: 700, color: idx === 2 ? 'primary.main' : 'inherit' }}>
                                        {row.total}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ borderRadius: 3 }}>
                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>HSN Wise Summary</Typography>
                            <Button size="small">Details</Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700 }}>HSN/SAC</TableCell>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700 }}>Qty</TableCell>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700 }}>Taxable Value</TableCell>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700, textAlign: 'right' }}>Total Tax</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>8467 (Tools)</TableCell>
                                        <TableCell>45 pcs</TableCell>
                                        <TableCell>₹2,40,000</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>₹43,200</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>7317 (Hardware)</TableCell>
                                        <TableCell>120 kg</TableCell>
                                        <TableCell>₹14,400</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>₹2,592</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ borderRadius: 3 }}>
                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>B2B vs B2C Invoices</Typography>
                            <Button size="small">Details</Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700 }}>Type</TableCell>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700 }}>Count</TableCell>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700 }}>Taxable Value</TableCell>
                                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 700, textAlign: 'right' }}>Total Tax</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>B2B (Taxable)</TableCell>
                                        <TableCell>12</TableCell>
                                        <TableCell>₹6,20,000</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>₹1,11,600</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>B2C (Retail)</TableCell>
                                        <TableCell>145</TableCell>
                                        <TableCell>₹2,30,000</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>₹41,400</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
