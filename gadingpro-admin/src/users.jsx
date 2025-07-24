// gadingpro-admin/src/users.jsx
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ImageInput,
    ImageField,
    required
} from 'react-admin';

export const UserList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="role" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const UserForm = () => (
    <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="username" validate={[required()]} />
        <TextInput 
            source="password" 
            type="password" 
            helperText="Kosongkan jika tidak ingin mengubah password" 
        />
        <TextInput source="phone" label="Nomor Telepon (WhatsApp)" />
        <SelectInput source="role" choices={[
            { id: 'admin', name: 'Admin' },
            { id: 'agent', name: 'Agent' },
        ]} validate={[required()]} defaultValue="agent" />
        <ImageInput source="profilePicture" label="Foto Profil">
            <ImageField source="src" title="title" />
        </ImageInput>
    </SimpleForm>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <UserForm />
    </Create>
);

export const UserEdit = (props) => (
    <Edit {...props}>
        <UserForm />
    </Edit>
);