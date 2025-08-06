// gadingpro-admin/src/branches.jsx (Dimodernisasi dengan gaya Shadcn UI)
import {
    List,
    Datagrid,
    TextField,
    UrlField,
    EditButton,
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    required,
    Filter,
    SearchInput
} from 'react-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// --- FORM UTAMA CABANG DENGAN GAYA SHADCN UI ---
// Dibuat reusable untuk Create dan Edit.
const BranchForm = () => (
    <div className="flex flex-col gap-6">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Informasi Detail Cabang</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {/* --- Kolom Kiri: Input Utama --- */}
                <div className="flex flex-col gap-6">
                    <TextInput source="city" validate={[required()]} fullWidth label="Kota" />
                    <TextInput source="name" validate={[required()]} fullWidth label="Nama Cabang" helperText="Contoh: Gading Pro Serpong"/>
                    <TextInput source="phone" fullWidth label="Nomor Telepon" />
                </div>

                {/* --- Kolom Kanan: Input Lainnya --- */}
                <div className="flex flex-col gap-6">
                    <TextInput source="instagram" label="URL Instagram" fullWidth helperText="Contoh: https://instagram.com/gadingpro"/>
                    <TextInput source="googleMaps" label="URL Google Maps" fullWidth helperText="Salin URL lengkap dari Google Maps."/>
                    <TextInput
                        source="address"
                        multiline
                        fullWidth
                        label="Alamat Lengkap"
                        rows={3} // Dibuat lebih ringkas
                    />
                </div>
            </CardContent>
        </Card>
    </div>
);

// Filter untuk List (Sudah bagus, tidak perlu diubah)
const BranchFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn placeholder="Cari kota atau nama cabang..." />
    </Filter>
);

// Tombol aksi di dalam tabel (Sudah bagus, tidak perlu diubah)
const ActionsCell = () => (
    <div className="flex gap-2">
        <EditButton />
        <DeleteButton />
    </div>
);


// --- KOMPONEN LIST, CREATE, DAN EDIT ---

export const BranchList = (props) => (
    <List {...props} filters={<BranchFilter />}>
        {/* Menghapus 'sx' agar styling mengikuti tema global dari index.css */}
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" label="Nama Cabang" />
            <TextField source="city" label="Kota" />
            <TextField source="phone" label="Telepon" />
            <UrlField source="googleMaps" label="Google Maps" target="_blank" />
            <ActionsCell />
        </Datagrid>
    </List>
);

export const BranchCreate = (props) => (
    <Create {...props}>
        {/* SimpleForm membungkus Form kustom kita */}
        <SimpleForm>
            <BranchForm />
        </SimpleForm>
    </Create>
);

export const BranchEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            {/* ID ditampilkan di sini karena ini adalah halaman edit */}
            <TextInput source="id" disabled fullWidth />
            <BranchForm />
        </SimpleForm>
    </Edit>
);