// gadingpro-admin/src/MyLayout.jsx
import { Layout } from 'react-admin';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MyAppBar from './MyAppBar';
import { MyMenu } from './MyMenu';
import MyNotification from './MyNotification';
import { Toaster } from 'sonner';

// Objek gaya untuk menimpa layout default
const layoutSx = {
    '& .RaLayout-content': {
        // Beri padding atas sebesar tinggi header + margin
        paddingTop: 'calc(56px + 1rem)',
    },
};

const MyLayout = (props) => (
    <>
        {/* Layout utama dengan notifikasi kustom */}
        <Layout 
            {...props} 
            appBar={MyAppBar} 
            menu={MyMenu} 
            notification={MyNotification} // <-- Gunakan komponen notifikasi kita
            sx={layoutSx} 
        />
        {/* Tempat Toaster akan merender notifikasi */}
        <Toaster richColors position="top-right" /> 
        <ReactQueryDevtools initialIsOpen={false} />
    </>
);
export default MyLayout;