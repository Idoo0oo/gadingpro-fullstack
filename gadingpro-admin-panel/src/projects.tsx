// gadingpro-admin-panel/src/projects.tsx
import { List, Datagrid, TextField, ImageField,
         Create, SimpleForm, TextInput, NumberInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin'; // Tambahkan Create, SimpleForm, TextInput, dll.

export const ProjectList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="location" />
            <TextField source="price" />
            <TextField source="status" />
            <ImageField source="image" title="image" />
            <TextField source="category" />
            <TextField source="type" />
            <TextField source="developer" />
            <TextField source="completionYear" />
            <TextField source="description" />
        </Datagrid>
    </List>
);

// --- Tambahkan komponen ProjectCreate di sini ---
export const ProjectCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
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
            <TextInput source="brochureLink" label="Brochure Link URL" />
            <TextInput source="image" label="Main Image URL" required />
            {/* ArrayInput untuk multiple images (URL) */}
            <ArrayInput source="images" label="Additional Image URLs">
                <SimpleFormIterator>
                    <TextInput source="" label="Image URL" />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput source="bedrooms" />
            <NumberInput source="bathrooms" />
            <NumberInput source="garage" />
            <NumberInput source="landSize" />
            <NumberInput source="buildingSize" />
            {/* ArrayInput untuk facilities */}
            <ArrayInput source="facilities" label="Facilities">
                <SimpleFormIterator>
                    <TextInput source="" label="Facility Name" />
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
            {/* Input untuk fitur (objek) */}
            <TextInput source="features.electricity" label="Features: Electricity" />
            <TextInput source="features.water" label="Features: Water" />
            <TextInput source="features.flooring" label="Features: Flooring" />
            <TextInput source="features.ceiling" label="Features: Ceiling" />
            <TextInput source="features.structure" label="Features: Structure" />
        </SimpleForm>
    </Create>
);