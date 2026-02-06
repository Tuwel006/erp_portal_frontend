'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Snackbar,
    Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    FileEdit,
    Trash2,
    Box as BoxIcon,
    AlertTriangle
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const INITIAL_PRODUCTS = [
    { id: '1', name: 'Drill Machine - Bosch', category: 'Power Tools', brand: 'Bosch', stock: 15, unit: 'pcs', price: 4500, minStock: 5, gst: 18 },
    { id: '2', name: 'Screwdriver Set', category: 'Hand Tools', brand: 'Taparia', stock: 42, unit: 'set', price: 850, minStock: 10, gst: 12 },
    { id: '3', name: 'Loose Nails (1 inch)', category: 'Hardware', brand: 'Local', stock: 120, unit: 'kg', price: 120, minStock: 20, gst: 18 },
    { id: '4', name: 'PVC Pipes (10ft)', category: 'Plumbing', brand: 'Supreme', stock: 8, unit: 'pcs', price: 450, minStock: 15, gst: 18 },
    { id: '5', name: 'Asian Paints White (1L)', category: 'Paints', brand: 'Asian Paints', stock: 25, unit: 'box', price: 650, minStock: 5, gst: 28 },
];

export default function ProductList() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Power Tools',
        brand: '',
        unit: 'pcs',
        price: '',
        gst: 18,
        stock: '',
        minStock: ''
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = () => {
        if (!newProduct.name || !newProduct.price) {
            setSnackbar({ open: true, message: 'Please fill required fields', severity: 'error' });
            return;
        }

        const productToAdd = {
            ...newProduct,
            id: (products.length + 1).toString(),
            price: Number(newProduct.price),
            stock: Number(newProduct.stock || 0),
            minStock: Number(newProduct.minStock || 0)
        };

        setProducts([productToAdd, ...products]);
        setOpen(false);
        setNewProduct({
            name: '',
            category: 'Power Tools',
            brand: '',
            unit: 'pcs',
            price: '',
            gst: 18,
            stock: '',
            minStock: ''
        });
        setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' });
    };

    const handleDelete = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
        setSnackbar({ open: true, message: 'Product deleted', severity: 'info' });
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>Inventory Items</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Small components, sharp design.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<Plus size={16} />}
                    onClick={() => setOpen(true)}
                >
                    Add Product
                </Button>
            </Box>

            <Card>
                <Box sx={{ p: 2, display: 'flex', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search items..."
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={14} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ maxWidth: 350 }}
                    />
                    <Button variant="outlined" size="small" startIcon={<Filter size={14} />}>
                        Filters
                    </Button>
                </Box>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell align="center">Stock</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>GST</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ p: 0.5, bgcolor: alpha('#6366f1', 0.1), color: '#6366f1', borderRadius: 0.5 }}>
                                                <BoxIcon size={14} />
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 700,
                                                color: product.stock <= product.minStock ? 'error.main' : 'text.primary',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 0.5
                                            }}
                                        >
                                            {product.stock}
                                            {product.stock <= product.minStock && <AlertTriangle size={12} />}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={product.unit} variant="outlined" />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>₹{product.price}</TableCell>
                                    <TableCell>{product.gst}%</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.stock <= product.minStock ? "Low" : "In Stock"}
                                            sx={{
                                                bgcolor: product.stock <= product.minStock ? alpha('#ef4444', 0.1) : alpha('#10b981', 0.1),
                                                color: product.stock <= product.minStock ? 'error.main' : 'success.main',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" color="info">
                                            <FileEdit size={14} />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
                                            <Trash2 size={14} />
                                        </IconButton>
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

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, fontSize: '1rem' }}>New Product Entry</DialogTitle>
                <DialogContent dividers sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Product Name"
                                fullWidth
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Category"
                                fullWidth
                                select
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            >
                                {['Power Tools', 'Hand Tools', 'Plumbing', 'Hardware', 'Paints'].map(c => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Brand"
                                fullWidth
                                value={newProduct.brand}
                                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                label="Price"
                                fullWidth
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                label="Stock"
                                fullWidth
                                type="number"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                label="Min Stock"
                                fullWidth
                                type="number"
                                value={newProduct.minStock}
                                onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)} size="small">Cancel</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={handleSave}>Save Product</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity as any} sx={{ width: '100%', borderRadius: 1 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
