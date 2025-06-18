// gadingpro-admin-panel/src/App.tsx
// import React from 'react'; // <<< INI DIHAPUS
import { Admin, Resource, ShowGuesser } from 'react-admin'; // <<< ListGuesser, EditGuesser DIHAPUS
import dataProvider from './dataProvider';
import authProvider from './authProvider';

// --- Custom Components untuk Resource ---
// Projects
import { List, Datagrid, TextField, EditButton, DeleteButton, Create, Edit, SimpleForm, TextInput, NumberInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';
// <<< ImageInput, ImageField, BooleanInput DIHAPUS jika tidak digunakan

// Custom List Component for Projects
const ProjectList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" /> {/* Pastikan id ini sekarang adalah string dari _id */}
            <TextField source="name" />
            <TextField source="location" />
            <TextField source="price" />
            <TextField source="status" />
            <TextField source="developer" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Custom Create/Edit Component for Projects
const ProjectCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            {/* Input id tidak diperlukan karena _id dibuat otomatis oleh MongoDB */}
            <TextInput source="name" required />
            <TextInput source="location" required />
            <TextInput source="price" required />
            <SelectInput source="status" choices={[
                { id: 'Ready Stock', name: 'Ready Stock' },
                { id: 'Launching', name: 'Launching' },
                { id: 'Pre-Launching', name: 'Pre-Launching' },
                { id: 'Sold Out', name: 'Sold Out' },
                { id: 'Under Construction', name: 'Under Construction' },
            ]} required />
            <TextInput source="brochureLink" />
            <TextInput source="image" label="Main Image URL" required />
            <ArrayInput source="images" label="Additional Image URLs">
                <SimpleFormIterator>
                    <TextInput source="" />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput source="bedrooms" />
            <NumberInput source="bathrooms" />
            <NumberInput source="garage" />
            <NumberInput source="landSize" />
            <NumberInput source="buildingSize" />
            <ArrayInput source="facilities">
                <SimpleFormIterator>
                    <TextInput source="" />
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput source="category" choices={[
                { id: 'Cluster', name: 'Cluster' },
                { id: 'Perumahan', name: 'Perumahan' },
                { id: 'Apartemen', name: 'Apartemen' },
                { id: 'Townhouse', name: 'Townhouse' },
                { id: 'Kondominium', name: 'Kondominium' },
                { id: 'Estate', name: 'Estate' },
                { id: 'Studio', name: 'Studio' },
            ]} />
            <SelectInput source="type" choices={[
                { id: 'Rumah', name: 'Rumah' },
                { id: 'Apartemen', name: 'Apartemen' },
            ]} />
            <TextInput source="developer" />
            <NumberInput source="completionYear" />
            <TextInput source="description" multiline fullWidth />
            <TextInput source="features.electricity" label="Features: Electricity" />
            <TextInput source="features.water" label="Features: Water" />
            <TextInput source="features.flooring" label="Features: Flooring" />
            <TextInput source="features.ceiling" label="Features: Ceiling" />
            <TextInput source="features.structure" label="Features: Structure" />
        </SimpleForm>
    </Create>
);

const ProjectEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled /> {/* id ditampilkan tapi tidak bisa diedit */}
            <TextInput source="name" required />
            <TextInput source="location" required />
            <TextInput source="price" required />
            <SelectInput source="status" choices={[
                { id: 'Ready Stock', name: 'Ready Stock' },
                { id: 'Launching', name: 'Launching' },
                { id: 'Pre-Launching', name: 'Pre-Launching' },
                { id: 'Sold Out', name: 'Sold Out' },
                { id: 'Under Construction', name: 'Under Construction' },
            ]} required />
            <TextInput source="brochureLink" />
            <TextInput source="image" label="Main Image URL" required />
            <ArrayInput source="images" label="Additional Image URLs">
                <SimpleFormIterator>
                    <TextInput source="" />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput source="bedrooms" />
            <NumberInput source="bathrooms" />
            <NumberInput source="garage" />
            <NumberInput source="landSize" />
            <NumberInput source="buildingSize" />
            <ArrayInput source="facilities">
                <SimpleFormIterator>
                    <TextInput source="" />
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput source="category" choices={[
                { id: 'Cluster', name: 'Cluster' },
                { id: 'Perumahan', name: 'Perumahan' },
                { id: 'Apartemen', name: 'Apartemen' },
                { id: 'Townhouse', name: 'Townhouse' },
                { id: 'Kondominium', name: 'Kondominium' },
                { id: 'Estate', name: 'Estate' },
                { id: 'Studio', name: 'Studio' },
            ]} />
            <SelectInput source="type" choices={[
                { id: 'Rumah', name: 'Rumah' },
                { id: 'Apartemen', name: 'Apartemen' },
            ]} />
            <TextInput source="developer" />
            <NumberInput source="completionYear" />
            <TextInput source="description" multiline fullWidth />
            <TextInput source="features.electricity" label="Features: Electricity" />
            <TextInput source="features.water" label="Features: Water" />
            <TextInput source="features.flooring" label="Features: Flooring" />
            <TextInput source="features.ceiling" label="Features: Ceiling" />
            <TextInput source="features.structure" label="Features: Structure" />
        </SimpleForm>
    </Edit>
);

// Branches
const BranchList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" /> {/* Pastikan id ini sekarang adalah string dari _id */}
            <TextField source="name" />
            <TextField source="city" />
            <TextField source="address" />
            <TextField source="phone" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const BranchCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            {/* Input id tidak diperlukan karena _id dibuat otomatis oleh MongoDB */}
            <TextInput source="name" required />
            <TextInput source="city" required />
            <TextInput source="address" multiline fullWidth />
            <TextInput source="phone" />
            <TextInput source="instagram" />
            <TextInput source="googleMaps" />
        </SimpleForm>
    </Create>
);

const BranchEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled /> {/* id ditampilkan tapi tidak bisa diedit */}
            <TextInput source="name" required />
            <TextInput source="city" required />
            <TextInput source="address" multiline fullWidth />
            <TextInput source="phone" />
            <TextInput source="instagram" />
            <TextInput source="googleMaps" />
        </SimpleForm>
    </Edit>
);

// Inquiries (hanya bisa dibaca)
const InquiryList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" /> {/* Pastikan id ini sekarang adalah string dari _id */}
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="phone" />
            <TextField source="type" />
            <TextField source="message" />
            <TextField source="createdAt" />
            <DeleteButton />
        </Datagrid>
    </List>
);

const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="projects" list={ProjectList} create={ProjectCreate} edit={ProjectEdit} show={ShowGuesser} />
        <Resource name="branches" list={BranchList} create={BranchCreate} edit={BranchEdit} show={ShowGuesser} />
        <Resource name="inquiries" list={InquiryList} show={ShowGuesser} />
    </Admin>
);

export default App;