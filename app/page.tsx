'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  alpha,
  Grid
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ArrowUpRight,
  MoreVertical,
  Calendar,
  Filter
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart, PieChart } from '@mui/x-charts';

const stats = [
  {
    title: 'Total Sales',
    value: '₹4,52,350',
    change: '+12.5%',
    trend: 'up',
    icon: <TrendingUp size={16} />,
    color: '#10b981'
  },
  {
    title: 'Total Purchase',
    value: '₹2,10,400',
    change: '+8.2%',
    trend: 'up',
    icon: <TrendingDown size={16} />,
    color: '#3b82f6'
  },
  {
    title: 'New Customers',
    value: '48',
    change: '+4.3%',
    trend: 'up',
    icon: <Users size={16} />,
    color: '#6366f1'
  },
  {
    title: 'Low Stock Items',
    value: '12',
    change: '-2',
    trend: 'down',
    icon: <Package size={16} />,
    color: '#f59e0b'
  },
];

const recentInvoices = [
  { id: 'INV-2024-001', customer: 'Vikas Hardware', date: '2024-03-01', amount: '₹12,400', status: 'Paid', type: 'GST' },
  { id: 'INV-2024-002', customer: 'Rahul Sharma', date: '2024-03-01', amount: '₹850', status: 'Pending', type: 'Non-GST' },
  { id: 'INV-2024-003', customer: 'BuildCon Pvt Ltd', date: '2024-02-28', amount: '₹45,000', status: 'Paid', type: 'GST' },
  { id: 'INV-2024-004', customer: 'Amit Singh', date: '2024-02-28', amount: '₹1,200', status: 'Cancelled', type: 'Non-GST' },
  { id: 'INV-2024-005', customer: 'New Tech Solutions', date: '2024-02-27', amount: '₹8,900', status: 'Paid', type: 'GST' },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Business performance at a glance.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Calendar size={14} />}
          >
            Last 30 Days
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Filter size={14} />}
          >
            Filters
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: alpha(stat.color, 0.1),
                      color: stat.color,
                      display: 'flex'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: stat.trend === 'up' ? 'success.main' : 'error.main' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{stat.change}</Typography>
                    <ArrowUpRight size={12} />
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Sales vs Purchase</Typography>
              <IconButton size="small"><MoreVertical size={14} /></IconButton>
            </Box>
            <Box sx={{ height: 260, width: '100%', p: 1 }}>
              <BarChart
                series={[
                  { data: [35000, 41000, 32000, 48000, 45000, 52000], label: 'Sales', color: '#6366f1' },
                  { data: [21000, 24000, 18000, 26000, 28000, 31000], label: 'Purchase', color: '#94a3b8' },
                ]}
                xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 20, left: 35, right: 5 }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Sales by Category</Typography>
            </Box>
            <Box sx={{ height: 260, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 45, label: 'Loose', color: '#6366f1' },
                      { id: 1, value: 25, label: 'Tools', color: '#10b981' },
                      { id: 2, value: 20, label: 'Elect', color: '#f59e0b' },
                      { id: 3, value: 10, label: 'Plumb', color: '#ef4444' },
                    ],
                    innerRadius: 50,
                    paddingAngle: 4,
                    cornerRadius: 3,
                  },
                ]}
              />
              <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" display="block">Total</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>100%</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Recent Invoices</Typography>
          <Button size="small">View All</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentInvoices.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.amount}</TableCell>
                  <TableCell>
                    <Chip label={row.type} variant="outlined" sx={{ fontSize: '0.65rem' }} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      sx={{
                        fontSize: '0.65rem',
                        bgcolor: row.status === 'Paid' ? alpha('#10b981', 0.1) : row.status === 'Pending' ? alpha('#f59e0b', 0.1) : alpha('#ef4444', 0.1),
                        color: row.status === 'Paid' ? 'success.main' : row.status === 'Pending' ? 'warning.main' : 'error.main',
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
