'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    TextField,
    MenuItem,
    Switch,
    FormControlLabel,
    IconButton,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    alpha,
    Autocomplete,
    Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Plus,
    Trash2,
    Save,
    Printer,
    QrCode,
    ScanLine,
    ChevronLeft
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';

interface SaleItem {
    id: string;
    productId: string;
    name: string;
    hsn: string;
    qty: number;
    unit: string;
    price: number;
    gstPercent: number;
    discount: number;
}

const PRODUCTS = [
    { id: '1', name: 'Drill Machine - Bosch', hsn: '8467', price: 4500, unit: 'pcs', gstPercent: 18 },
    { id: '2', name: 'Screwdriver Set', hsn: '8205', price: 850, unit: 'set', gstPercent: 12 },
    { id: '3', name: 'Loose Nails (1 inch)', hsn: '7317', price: 120, unit: 'kg', gstPercent: 18 },
    { id: '4', name: 'PVC Pipes (10ft)', hsn: '3917', price: 450, unit: 'pcs', gstPercent: 18 },
];

const CUSTOMERS = [
    { id: '1', name: 'Vikas Hardware', mobile: '9876543210', gstin: '27AAAAA0000A1Z5' },
    { id: '2', name: 'Rahul Sharma (Retail)', mobile: '8888888888', gstin: '' },
];

export default function NewSale() {
    const router = useRouter();
    const [gstEnabled, setGstEnabled] = useState(true);
    const [items, setItems] = useState<SaleItem[]>([
        { id: '1', productId: '', name: '', hsn: '', qty: 1, unit: 'pcs', price: 0, gstPercent: 0, discount: 0 }
    ]);
    const [customer, setCustomer] = useState<any>(null);
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [invoiceNo, setInvoiceNo] = useState('SAL-2024-0042');

    const handleAddItem = () => {
        setItems([...items, { id: Math.random().toString(), productId: '', name: '', hsn: '', qty: 1, unit: 'pcs', price: 0, gstPercent: 0, discount: 0 }]);
    };

    const handleRemoveItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleItemChange = (id: string, field: keyof SaleItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleProductSelect = (id: string, product: any) => {
        if (product) {
            setItems(items.map(item => item.id === id ? {
                ...item,
                productId: product.id,
                name: product.name,
                hsn: product.hsn,
                price: product.price,
                gstPercent: product.gstPercent,
                unit: product.unit
            } : item));
        }
    };

    // Calculations
    const subTotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const totalDiscount = items.reduce((acc, item) => acc + item.discount, 0);

    let cgst = 0;
    let sgst = 0;
    let IGST = 0;

    if (gstEnabled) {
        items.forEach(item => {
            const itemTotal = (item.qty * item.price) - item.discount;
            const gstAmt = (itemTotal * item.gstPercent) / 100;
            // Assuming intra-state for now
            cgst += gstAmt / 2;
            sgst += gstAmt / 2;
        });
    }

    const grandTotal = subTotal - totalDiscount + cgst + sgst + IGST;

    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => router.back()} size="small">
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>New Sales Invoice</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Card sx={{ borderRadius: 3, mb: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Invoice Number</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={invoiceNo}
                                        disabled
                                        sx={{ bgcolor: alpha('#f1f5f9', 0.5) }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Invoice Date</Typography>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        size="small"
                                        value={invoiceDate}
                                        onChange={(e) => setInvoiceDate(e.target.value)}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>GST Mode</Typography>
                                        <Chip
                                            label={gstEnabled ? "GST ENABLED" : "SIMPLE BILL"}
                                            size="small"
                                            color={gstEnabled ? "success" : "default"}
                                            sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                                        />
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={gstEnabled}
                                                onChange={(e) => setGstEnabled(e.target.checked)}
                                                color="success"
                                            />
                                        }
                                        label={gstEnabled ? "Taxable Invoice" : "Simple Cash Bill"}
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Customer Details</Typography>
                                    <Autocomplete
                                        options={CUSTOMERS}
                                        getOptionLabel={(option) => `${option.name} (${option.mobile})`}
                                        value={customer}
                                        onChange={(e, val) => setCustomer(val)}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Search or select customer" size="small" fullWidth />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Customer GSTIN</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Auto-populated"
                                        value={customer?.gstin || ''}
                                        disabled
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>Item Details</Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<ScanLine size={16} />}
                                    sx={{ borderRadius: 2 }}
                                >
                                    Barcode Scan
                                </Button>
                            </Box>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: alpha('#f1f5f9', 0.5) }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600, width: '40%' }}>Product / Service</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Price/Unit</TableCell>
                                            {gstEnabled && <TableCell sx={{ fontWeight: 600 }}>GST %</TableCell>}
                                            <TableCell sx={{ fontWeight: 600 }}>Discount</TableCell>
                                            <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Amount</TableCell>
                                            <TableCell sx={{ width: 50 }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <Autocomplete
                                                        options={PRODUCTS}
                                                        getOptionLabel={(option) => option.name}
                                                        onChange={(e, val) => handleProductSelect(item.id, val)}
                                                        renderInput={(params) => <TextField {...params} size="small" placeholder="Search product" fullWidth />}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        value={item.qty}
                                                        onChange={(e) => handleItemChange(item.id, 'qty', Number(e.target.value))}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        value={item.unit}
                                                        onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        value={item.price}
                                                        onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                                                    />
                                                </TableCell>
                                                {gstEnabled && (
                                                    <TableCell>
                                                        <TextField
                                                            select
                                                            size="small"
                                                            value={item.gstPercent}
                                                            onChange={(e) => handleItemChange(item.id, 'gstPercent', Number(e.target.value))}
                                                            sx={{ minWidth: 80 }}
                                                        >
                                                            <MenuItem value={0}>0%</MenuItem>
                                                            <MenuItem value={5}>5%</MenuItem>
                                                            <MenuItem value={12}>12%</MenuItem>
                                                            <MenuItem value={18}>18%</MenuItem>
                                                            <MenuItem value={28}>28%</MenuItem>
                                                        </TextField>
                                                    </TableCell>
                                                )}
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        value={item.discount}
                                                        onChange={(e) => handleItemChange(item.id, 'discount', Number(e.target.value))}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'right', fontWeight: 600 }}>
                                                    ₹{(item.qty * item.price) - item.discount}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton size="small" color="error" onClick={() => handleRemoveItem(item.id)}>
                                                        <Trash2 size={18} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    startIcon={<Plus size={18} />}
                                    onClick={handleAddItem}
                                    sx={{ fontWeight: 600 }}
                                >
                                    Add Row
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ borderRadius: 3, position: 'sticky', top: 100 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Order Summary</Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="text.secondary">Sub Total</Typography>
                                <Typography sx={{ fontWeight: 600 }}>₹{subTotal.toFixed(2)}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="text.secondary">Total Discount</Typography>
                                <Typography color="error.main" sx={{ fontWeight: 600 }}>- ₹{totalDiscount.toFixed(2)}</Typography>
                            </Box>

                            {gstEnabled && (
                                <>
                                    <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography color="text.secondary">CGST (9%)</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>₹{cgst.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography color="text.secondary">SGST (9%)</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>₹{sgst.toFixed(2)}</Typography>
                                    </Box>
                                </>
                            )}

                            <Divider sx={{ my: 3 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>Grand Total</Typography>
                                <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 800 }}>
                                    ₹{grandTotal.toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    size="large"
                                    startIcon={<Save size={20} />}
                                    sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
                                >
                                    Save Invoice
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    startIcon={<Printer size={20} />}
                                    sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
                                >
                                    Print Bill
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    startIcon={<QrCode size={20} />}
                                    color="info"
                                    sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
                                >
                                    Show Payment QR
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
