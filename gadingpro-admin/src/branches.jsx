// gadingpro-admin-panel/src/branches.tsx
import { List, Datagrid, TextField, UrlField,
         Create, SimpleForm, TextInput } from 'react-admin'; // Tambahkan Create, SimpleForm, TextInput

export const BranchList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="city" />
            <TextField source="address" />
            <TextField source="phone" />
            <UrlField source="instagram" />
            <UrlField source="googleMaps" />
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