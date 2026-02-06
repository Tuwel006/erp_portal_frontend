'use client';

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    alpha,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    ListItemButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    BarChart3,
    FilePieChart,
    Files,
    TrendingUp,
    Download,
    ChevronRight,
    ArrowUpRight,
    Calendar
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const reportGroups = [
    {
        title: 'Sales',
        icon: <TrendingUp size={16} color="#6366f1" />,
        reports: [
            { name: 'Daily Summary', desc: 'Consolidated sales today' },
            { name: 'Item-wise', desc: 'Breakdown by product' },
            { name: 'Customer Ledger', desc: 'History per client' },
            { name: 'GSTR-1 Register', desc: 'Monthly tax report' }
        ]
    },
    {
        title: 'Inventory',
        icon: <BarChart3 size={16} color="#10b981" />,
        reports: [
            { name: 'Stock Valuation', desc: 'Total warehouse value' },
            { name: 'Low Stock Alerts', desc: 'Below reorder point' },
            { name: 'Movement History', desc: 'In/Out logs' },
            { name: 'Expirables', desc: 'Products nearing expiry' }
        ]
    },
    {
        title: 'Financials',
        icon: <FilePieChart size={16} color="#f59e0b" />,
        reports: [
            { name: 'Profit & Loss', desc: 'Net profit/loss' },
            { name: 'Expenses', desc: 'Company overheads' },
            { name: 'Receivables', desc: 'Pending collection' },
            { name: 'Payables', desc: 'Pending payouts' }
        ]
    }
];

export default function Reports() {
    return (
        <DashboardLayout>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Intelligent Reports</Typography>
                    <Typography variant="body2" color="text.secondary">Business intelligence at your fingertips.</Typography>
                </Box>
                <Button variant="outlined" size="small" startIcon={<Calendar size={14} />}>
                    FY 2024-25
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: '100%' }}>
                        <Box sx={{ p: 2, bgcolor: alpha('#6366f1', 0.03), borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="caption" color="secondary.main" sx={{ fontWeight: 700, display: 'block' }}>DOWNLOAD</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>P&L Statement</Typography>
                            </Box>
                            <Box sx={{ p: 0.75, bgcolor: 'secondary.main', borderRadius: 1, color: 'white' }}>
                                <Download size={14} />
                            </Box>
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
                                <ArrowUpRight size={14} />
                                <Typography variant="caption" sx={{ fontWeight: 700 }}>+12.5% TRENDING</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ p: 2, height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Market Insights</Typography>
                        <Grid container spacing={1.5}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ p: 1.5, bgcolor: alpha('#f8fafc', 0.8), borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="caption" color="text.secondary" display="block">BEST CATEGORY</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>Power Tools (42%)</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ p: 1.5, bgcolor: alpha('#f8fafc', 0.8), borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="caption" color="text.secondary" display="block">GROWTH PRODUCT</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>Bosch Drill (+18%)</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {reportGroups.map((group) => (
                    <Grid size={{ xs: 12, md: 4 }} key={group.title}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            {group.icon}
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{group.title}</Typography>
                        </Box>
                        <Card sx={{ overflow: 'hidden' }}>
                            <List disablePadding>
                                {group.reports.map((report, idx) => (
                                    <React.Fragment key={report.name}>
                                        <ListItemButton>
                                            <ListItemIcon sx={{ minWidth: 32 }}>
                                                <Files size={14} color="#94a3b8" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={report.name}
                                                secondary={report.desc}
                                                primaryTypographyProps={{ fontWeight: 700, fontSize: '0.75rem' }}
                                                secondaryTypographyProps={{ fontSize: '0.65rem' }}
                                            />
                                            <ChevronRight size={12} color="#cbd5e1" />
                                        </ListItemButton>
                                        {idx < group.reports.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </DashboardLayout>
    );
}
