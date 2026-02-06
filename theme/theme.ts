'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0f172a', // Slate 900
            light: '#1e293b', // Slate 800
            dark: '#020617', // Slate 950
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#6366f1', // Indigo 500
            light: '#818cf8', // Indigo 400
            dark: '#4f46e5', // Indigo 600
        },
        background: {
            default: '#f8fafc', // Slate 50
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a',
            secondary: '#64748b',
        },
        success: {
            main: '#10b981',
        },
        warning: {
            main: '#f59e0b',
        },
        error: {
            main: '#ef4444',
        },
        info: {
            main: '#3b82f6',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 13, // Slightly smaller base font
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600, fontSize: '1.5rem' },
        h5: { fontWeight: 600, fontSize: '1.25rem' },
        h6: { fontWeight: 600, fontSize: '1rem' },
        subtitle1: { fontSize: '0.9rem' },
        subtitle2: { fontSize: '0.8rem' },
        body1: { fontSize: '0.875rem' },
        body2: { fontSize: '0.8rem' },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
        },
    },
    shape: {
        borderRadius: 4, // Smaller border radius (was 8)
    },
    components: {
        MuiButton: {
            defaultProps: {
                size: 'small', // Small buttons by default
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: '6px 16px',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small', // Small textfields by default
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    border: '1px solid #e2e8f0',
                },
            },
        },
        MuiChip: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    fontWeight: 600,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '8px 12px', // Compact tables
                    fontSize: '0.8rem',
                },
                head: {
                    fontWeight: 700,
                    backgroundColor: '#f8fafc',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    padding: '6px 12px',
                    borderRadius: 4,
                },
            },
        },
    },
});

export default theme;
