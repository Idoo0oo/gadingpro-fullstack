// gadingpro-admin/src/branches.jsx (REVISI FINAL & LENGKAP)
import { 
    List, 
    Datagrid, 
    TextField, 
    UrlField, 
    EditButton, 
    DeleteButton, 
    Create, 
    Edit, // <-- Tambahkan Edit
    SimpleForm, 
    TextInput,
    required,
    Filter,
    SearchInput // <-- Tambahkan required
} from 'react-admin';

// Style untuk datagrid (tidak perlu diubah)
const datagridStyles = {
    '& .RaDatagrid-headerCell': {
        backgroundColor: 'hsl(var(--muted))',
        color: 'hsl(var(--muted-foreground))',
        fontWeight: 600,
    },
    '& .RaDatagrid-rowCell': {
        borderBottom: '1px solid hsl(var(--border))',
    },
    '& .RaDatagrid-row:hover': {
        backgroundColor: 'hsl(var(--accent))',
    },
};

// Tombol aksi (tidak perlu diubah)
const ActionsCell = () => (
    <div className="flex gap-2">
        <EditButton />
        <DeleteButton />
    </div>
);

const BranchFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn placeholder="Cari cabang..."/>
    </Filter>
);

// --- PERBAIKAN UTAMA DI SINI ---
// Gunakan (props) sebagai parameter, bukan (this.props,first)
export const BranchList = (props) => (
    <List {...props} filters={<BranchFilter />}>
        <Datagrid rowClick="edit" sx={datagridStyles}>
            <TextField source="id" />
            <TextField source="name" label="Nama Cabang" />
            <TextField source="city" label="Kota" />
            <TextField source="address" label="Alamat" />
            <TextField source="phone" label="Telepon" />
            <UrlField source="instagram" label="Instagram" />
            <ActionsCell />
        </Datagrid>
    </List>
);

// Form untuk Buat Cabang
export const BranchCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="city" validate={[required()]} fullWidth />
            <TextInput source="name" validate={[required()]} fullWidth />
            <TextInput source="address" multiline fullWidth />
            <TextInput source="phone" />
            <TextInput source="instagram" label="Link Instagram" fullWidth />
            <TextInput source="googleMaps" label="Link Google Maps" fullWidth />
        </SimpleForm>
    </Create>
);

// --- TAMBAHAN: Form untuk Edit Cabang ---
export const BranchEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="city" validate={[required()]} fullWidth />
            <TextInput source="name" validate={[required()]} fullWidth />
            <TextInput source="address" multiline fullWidth />
            <TextInput source="phone" />
            <TextInput source="instagram" label="Link Instagram" fullWidth />
            <TextInput source="googleMaps" label="Link Google Maps" fullWidth />
        </SimpleForm>
    </Edit>
);