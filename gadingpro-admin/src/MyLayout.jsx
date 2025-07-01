// gadingpro-admin/src/MyLayout.jsx
import { Layout } from 'react-admin';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MyAppBar from './MyAppBar'; // Kita akan buat AppBar kustom

const MyLayout = (props) => (
    <>
        <Layout {...props} appBar={MyAppBar} />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
);

export default MyLayout;