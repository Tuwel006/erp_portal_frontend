'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    MenuItem,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Avatar,
    alpha,
    Snackbar,
    Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    Building2,
    Save,
    Upload,
    ShieldCheck
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function CompanySetup() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Company Configuration</Typography>
                <Typography variant="body2" color="text.secondary">
                    Sharp, compact branding and tax settings.
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ mb: 2 }}>
                        <Box sx={{ p: 1.5, px: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Building2 size={16} color="#6366f1" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Basic Information</Typography>
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <Avatar sx={{ width: 48, height: 48, bgcolor: alpha('#6366f1', 0.1), color: 'secondary.main', borderRadius: 1 }}>
                                            <Building2 size={24} />
                                        </Avatar>
                                        <Box>
                                            <Button variant="outlined" size="small" startIcon={<Upload size={12} />}>Logo</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}><TextField label="Company Name" fullWidth defaultValue="PRIME HARDWARE" /></Grid>
                                <Grid size={{ xs: 12, md: 6 }}><TextField label="Est. Date" fullWidth type="date" defaultValue="2020-01-01" InputLabelProps={{ shrink: true }} /></Grid>
                                <Grid size={{ xs: 12, md: 6 }}><TextField label="GSTIN" fullWidth defaultValue="27AAAAA0000A1Z5" /></Grid>
                                <Grid size={{ xs: 12, md: 6 }}><TextField label="Phone" fullWidth defaultValue="+91 98765 43210" /></Grid>
                                <Grid size={{ xs: 12 }}><TextField label="Address" fullWidth multiline rows={2} defaultValue="Hardware Plaza, Mumbai" /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card>
                        <Box sx={{ p: 1.5, px: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <ShieldCheck size={16} color="#10b981" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Tax Settings</Typography>
                        </Box>
                        <CardContent sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField label="FY" fullWidth select defaultValue="2024-25">
                                        <MenuItem value="2024-25">2024-25</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField label="Prefix" fullWidth defaultValue="PHW-" />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ mb: 2 }}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Isolation & Features</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {[
                                    { label: 'GST Mode', checked: true },
                                    { label: 'Multi-Warehouse', checked: true },
                                    { label: 'Barcode Gen', checked: true }
                                ].map(f => (
                                    <React.Fragment key={f.label}>
                                        <FormControlLabel
                                            control={<Switch size="small" defaultChecked={f.checked} color="secondary" />}
                                            label={<Typography variant="caption" sx={{ fontWeight: 600 }}>{f.label}</Typography>}
                                        />
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="small"
                        startIcon={<Save size={14} />}
                        onClick={handleSave}
                        disabled={loading}
                        sx={{ py: 1 }}
                    >
                        {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                </Grid>
            </Grid>

            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
                <Alert severity="success" sx={{ width: '100%', borderRadius: 1 }}>
                    Configuration updated!
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
