'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    TextField,
    MenuItem,
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
    Snackbar,
    Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Plus,
    Trash2,
    Save,
    ChevronLeft,
    ScrollText,
    Truck
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';

interface PurchaseItem {
    id: string;
    productId: string;
    name: string;
    hsn: string;
    qty: number;
    unit: string;
    purchasePrice: number;
    gstPercent: number;
}

const PRODUCTS = [
    { id: '1', name: 'Drill Machine - Bosch', hsn: '8467', price: 3800, unit: 'pcs', gstPercent: 18 },
    { id: '2', name: 'Screwdriver Set', hsn: '8205', price: 650, unit: 'set', gstPercent: 12 },
    { id: '3', name: 'Loose Nails (1 inch)', hsn: '7317', price: 90, unit: 'kg', gstPercent: 18 },
    { id: '4', name: 'PVC Pipes (10ft)', hsn: '3917', price: 320, unit: 'pcs', gstPercent: 18 },
];

const SUPPLIERS = [
    { id: '1', name: 'Bosch India Ltd', mobile: '9876543210', gstin: '29AAAAA0000A1Z5' },
    { id: '2', name: 'Taparia Tools', mobile: '8888888888', gstin: '27BBBBB1111B1Z2' },
];

export default function NewPurchase() {
    const router = useRouter();
    const [items, setItems] = useState<PurchaseItem[]>([
        { id: '1', productId: '', name: '', hsn: '', qty: 1, unit: 'pcs', purchasePrice: 0, gstPercent: 18 }
    ]);
    const [supplier, setSupplier] = useState<any>(null);
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [billNo, setBillNo] = useState('');
    const [success, setSuccess] = useState(false);

    const handleAddItem = () => {
        setItems([...items, { id: Math.random().toString(), productId: '', name: '', hsn: '', qty: 1, unit: 'pcs', purchasePrice: 0, gstPercent: 18 }]);
    };

    const handleRemoveItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleItemChange = (id: string, field: keyof PurchaseItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleProductSelect = (id: string, product: any) => {
        if (product) {
            setItems(items.map(item => item.id === id ? {
                ...item,
                productId: product.id,
                name: product.name,
                hsn: product.hsn,
                purchasePrice: product.price,
                gstPercent: product.gstPercent,
                unit: product.unit
            } : item));
        }
    };

    const subTotal = items.reduce((acc, item) => acc + (item.qty * item.purchasePrice), 0);
    const totalGst = items.reduce((acc, item) => acc + ((item.qty * item.purchasePrice) * item.gstPercent / 100), 0);
    const grandTotal = subTotal + totalGst;

    const handleSave = () => {
        setSuccess(true);
        setTimeout(() => router.push('/purchase/history'), 2000);
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => router.back()} size="small">
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Record Purchase (Inward)</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Card sx={{ borderRadius: 3, mb: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Supplier Bill / Invoice No</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Enter vendor bill number"
                                        value={billNo}
                                        onChange={(e) => setBillNo(e.target.value)}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Purchase Date</Typography>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        size="small"
                                        value={purchaseDate}
                                        onChange={(e) => setPurchaseDate(e.target.value)}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Payment Terms</Typography>
                                    <TextField fullWidth size="small" select defaultValue="Credit">
                                        <MenuItem value="Cash">Cash / Immediate</MenuItem>
                                        <MenuItem value="Credit">Credit (Pay Later)</MenuItem>
                                        <MenuItem value="UPI">UPI / Digital</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Supplier Details</Typography>
                                    <Autocomplete
                                        options={SUPPLIERS}
                                        getOptionLabel={(option) => option.name}
                                        value={supplier}
                                        onChange={(e, val) => setSupplier(val)}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Search or select vendor" size="small" fullWidth />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Vendor GSTIN</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={supplier?.gstin || ''}
                                        disabled
                                        sx={{ bgcolor: alpha('#f8fafc', 0.5) }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Inward Item Details</Typography>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: alpha('#f1f5f9', 0.5) }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600, width: '40%' }}>Product/Item</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Inward Price</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>GST %</TableCell>
                                            <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Total (Excl. Tax)</TableCell>
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
                                                        renderInput={(params) => <TextField {...params} size="small" placeholder="Select item" fullWidth />}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        value={item.qty}
                                                        onChange={(e) => handleItemChange(item.id, 'qty', Number(e.target.value))}
                                                        sx={{ width: 80 }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        type="number"
                                                        size="small"
                                                        value={item.purchasePrice}
                                                        onChange={(e) => handleItemChange(item.id, 'purchasePrice', Number(e.target.value))}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        select
                                                        size="small"
                                                        value={item.gstPercent}
                                                        onChange={(e) => handleItemChange(item.id, 'gstPercent', Number(e.target.value))}
                                                        sx={{ minWidth: 80 }}
                                                    >
                                                        <MenuItem value={5}>5%</MenuItem>
                                                        <MenuItem value={12}>12%</MenuItem>
                                                        <MenuItem value={18}>18%</MenuItem>
                                                        <MenuItem value={28}>28%</MenuItem>
                                                    </TextField>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'right', fontWeight: 600 }}>
                                                    ₹{(item.qty * item.purchasePrice).toFixed(2)}
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
                                    Add Another Product
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ borderRadius: 3, position: 'sticky', top: 100 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Purchase Summary</Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="text.secondary">Taxable Amount</Typography>
                                <Typography sx={{ fontWeight: 600 }}>₹{subTotal.toFixed(2)}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="text.secondary">Total GST</Typography>
                                <Typography color="primary.main" sx={{ fontWeight: 600 }}>+ ₹{totalGst.toFixed(2)}</Typography>
                            </Box>

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
                                    onClick={handleSave}
                                    sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
                                >
                                    Complete Purchase
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    startIcon={<Truck size={20} />}
                                    sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
                                >
                                    Stock Update Only
                                </Button>
                                <Button
                                    variant="text"
                                    fullWidth
                                    sx={{ color: 'text.secondary' }}
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
                <Alert severity="success" sx={{ width: '100%', borderRadius: 3, fontWeight: 600 }}>
                    Purchase recorded successfully! Updating inventory levels...
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
