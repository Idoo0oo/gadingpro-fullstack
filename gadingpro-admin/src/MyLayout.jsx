// gadingpro-admin/src/MyLayout.jsx (KODE FINAL YANG SUDAH BERSIH)
import { Layout } from 'react-admin';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MyAppBar from './MyAppBar';
import { MyMenu } from './MyMenu';
import MyNotification from './MyNotification';
import { Toaster } from 'sonner';

const MyLayout = (props) => (
    <>
        <Layout 
            {...props} 
            appBar={MyAppBar} 
            menu={MyMenu} 
            notification={MyNotification}
        />
        <Toaster richColors position="top-right" /> 
        <ReactQueryDevtools initialIsOpen={false} />
    </>
);

export default MyLayout;