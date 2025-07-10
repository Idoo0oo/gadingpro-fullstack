// gadingpro-admin/src/MyAppBar.jsx (Versi shadcn/ui)
import { TitlePortal } from 'react-admin';
import { Box, Typography } from '@mui/material'; // Kita masih butuh Box untuk layouting

const MyAppBar = () => (
    // Header utama menggunakan div dengan class Tailwind
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
            {/* Portal untuk judul halaman React Admin */}
            <div className="mr-4 hidden md:flex">
                <TitlePortal />
            </div>

            {/* Spacer */}
            <Box flex="1" />

            {/* Logo */}
            <div className="flex items-center space-x-2">
                 <img
                    src="https://agents-events-prod.storage.googleapis.com/wp-content/uploads/sites/20/2024/03/20035510/Gading-Pro-Logo.png"
                    alt="GadingPro Logo"
                    className="h-8" // Menggunakan class Tailwind
                />
            </div>
        </div>
    </header>
);

export default MyAppBar;