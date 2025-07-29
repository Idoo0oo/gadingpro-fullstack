// gadingpro-admin/src/inquiriesShow.jsx
import { Show, SimpleShowLayout, TextField, EmailField, DateField } from 'react-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InquiryShow = (props) => (
    <Show {...props} component={Card}>
        <CardHeader>
            <CardTitle>Detail Pesan Masuk</CardTitle>
        </CardHeader>
        <CardContent>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" label="Nama Pengirim" />
                <EmailField source="email" label="Email" />
                <TextField source="phone" label="No. Telepon" />
                <TextField source="type" label="Tipe Pesan" />
                <TextField source="unitType" label="Tipe Unit Diminati" />
                <TextField source="message" label="Isi Pesan" />
                <DateField source="createdAt" label="Tanggal Diterima" showTime />
            </SimpleShowLayout>
        </CardContent>
    </Show>
);