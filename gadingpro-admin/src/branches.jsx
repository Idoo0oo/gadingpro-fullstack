// gadingpro-admin-panel/src/branches.tsx
import { List, Datagrid, TextField, UrlField, EditButton, DeleteButton, Create, SimpleForm, TextInput } from 'react-admin';

const datagridStyles = {
    '& .RaDatagrid-headerCell': {
        backgroundColor: 'hsl(var(--muted))',
        color: 'hsl(var(--muted-foreground))',
        fontWeight: 600,
        fontSize: '0.8rem',
        borderBottom: '1px solid hsl(var(--border))',
    },
    '& .RaDatagrid-rowCell': {
        borderBottom: '1px solid hsl(var(--border))',
        padding: '12px 16px',
    },
    '& .RaDatagrid-row': {
        '&:last-child .RaDatagrid-rowCell': {
            borderBottom: 'none',
        },
        '&:hover': {
            backgroundColor: 'hsl(var(--accent))',
        },
    },
};

const ActionsCell = () => (
    <div className="flex gap-2">
        <EditButton />
        <DeleteButton />
    </div>
);

export const BranchList = () => (
    <List {...props}>
        <Datagrid rowClick="edit" sx={datagridStyles}>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="city" />
            <TextField source="address" />
            <TextField source="phone" />
            <UrlField source="instagram" />
            <ActionsCell /> {/* Tombol aksi */}
        </Datagrid>
    </List>
);

// --- Tambahkan komponen BranchCreate di sini ---
export const BranchCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="city" required />
            <TextInput source="name" required />
            <TextInput source="address" multiline fullWidth />
            <TextInput source="phone" />
            <TextInput source="link instagram" />
            <TextInput source="link googleMaps" />
        </SimpleForm>
    </Create>
);