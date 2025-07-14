// gadingpro-admin/src/MyAppBar.jsx (REVISI FINAL UNTUK SIDEBAR)
import * as React from 'react';
import { AppBar, TitlePortal, SidebarToggleButton } from 'react-admin';
import { Box } from '@mui/material';

const MyAppBar = () => {
    return (
        // Gunakan komponen AppBar dari react-admin sebagai dasar
        <AppBar
            sx={{
                // Terapkan styling shadcn/ui di sini
                backgroundColor: 'hsla(var(--background))',
                backdropFilter: 'blur(8px)',
                boxShadow: 'none',
                borderBottom: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
            }}
        >
            {/* SidebarToggleButton akan secara otomatis menampilkan/menyembunyikan 
              tombol hamburger berdasarkan ukuran layar.
            */}
            <SidebarToggleButton />

            {/* TitlePortal akan menampilkan judul halaman (misal: "Projects", "Dashboard") */}
            <TitlePortal />

            {/* Box ini berfungsi sebagai spacer untuk mendorong item berikutnya ke kanan */}
            <Box flex="1" />

            {/* Logo Anda */}
            <img
                src="https://agents-events-prod.storage.googleapis.com/wp-content/uploads/sites/20/2024/03/20035510/Gading-Pro-Logo.png"
                alt="GadingPro Logo"
                style={{ height: '32px' }} // Sesuaikan ukurannya
            />
        </AppBar>
    );
};

export default MyAppBar;