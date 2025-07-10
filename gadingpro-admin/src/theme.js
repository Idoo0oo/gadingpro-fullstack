// gadingpro-admin/src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#ff6b35', // Oranye utama
            light: '#ff8a5e',
            dark: '#c43c0a',
        },
        secondary: {
            main: '#434343', // Abu-abu gelap
            light: '#6d6d6d',
            dark: '#1b1b1b',
        },
        background: {
            default: '#f4f6f8', // Latar belakang abu-abu sangat muda
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif', // Menggunakan font yang lebih modern
        h6: { // Untuk judul di AppBar
            fontWeight: 600,
        },
    },
    components: {
        // Kustomisasi tombol
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Tombol tidak menggunakan huruf kapital semua
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
        // Kustomisasi kartu
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.08)',
                },
            },
        },
        // Kustomisasi AppBar agar lebih flat
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0',
                },
                colorDefault: {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                }
            }
        }
    }
});