// gadingpro-admin/src/projects.jsx (Dengan gaya shadcn/ui)
import { List, Datagrid, TextField, ImageField, EditButton, DeleteButton, Create, SimpleForm, TextInput, NumberInput, SelectInput, ArrayInput, SimpleFormIterator } from 'react-admin';
import { Button } from '@/components/ui/button';

// Definisikan gaya untuk Datagrid
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

const inputSx = {
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--input))',
    borderRadius: 'calc(var(--radius) - 2px)',
    '& .MuiInputBase-input': {
        padding: '8px 12px',
    },
    '&.Mui-focused': {
        borderColor: 'hsl(var(--ring))',
        boxShadow: '0 0 0 2px hsl(var(--ring) / 0.2)',
    },
};


export const ProjectList = () => (
    <List>
        <Datagrid rowClick="edit" sx={datagridStyles}>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="location" />
            <TextField source="price" />
            <TextField source="status" />
            <ImageField source="image" title="image" />
            <TextField source="category" />
            <TextField source="type" />
            <ActionsCell /> {/* Tombol aksi */}
        </Datagrid>
    </List>
);
// Kita akan menata form di langkah berikutnya
export const ProjectCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" required fullWidth sx={inputSx} />
            <TextInput source="location" required fullWidth sx={inputSx} />
            <TextInput source="price" required fullWidth sx={inputSx} />
            <SelectInput source="status" choices={[
                { id: 'Ready Stock', name: 'Ready Stock' },
                { id: 'Launching', name: 'Launching' },
                { id: 'Pre-Launching', name: 'Pre-Launching' },
                { id: 'Sold Out', name: 'Sold Out' },
                { id: 'Under Construction', name: 'Under Construction' },
            ]} required fullWidth sx={inputSx} />
            <TextInput source="brochureLink" label="Brochure Link URL" fullWidth sx={inputSx} />
            <TextInput source="image" label="Main Image URL" required fullWidth sx={inputSx} />
            <ArrayInput source="images" label="Additional Image URLs" sx={inputSx}>
                <SimpleFormIterator>
                    <TextInput source="" label="Image URL" fullWidth sx={inputSx} />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput source="bedrooms" fullWidth sx={inputSx} />
            <NumberInput source="bathrooms" fullWidth sx={inputSx} />
            <NumberInput source="garage" fullWidth sx={inputSx} />
            <NumberInput source="landSize" fullWidth sx={inputSx} />
            <NumberInput source="buildingSize" fullWidth sx={inputSx} />
            <ArrayInput source="facilities" label="Facilities">
                <SimpleFormIterator>
                    <TextInput source="" label="Facility Name" fullWidth sx={inputSx} />
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput source="category" choices={[
                { id: 'Cluster', name: 'Cluster' },
                { id: 'Perumahan', name: 'Perumahan' },
                { id: 'Apartemen', name: 'Apartemen' },
            ]} fullWidth sx={inputSx} />
            <SelectInput source="type" choices={[
                { id: 'Rumah', name: 'Rumah' },
                { id: 'Apartemen', name: 'Apartemen' },
            ]} fullWidth sx={inputSx} />
            <TextInput source="developer" fullWidth sx={inputSx} />
            <NumberInput source="completionYear" fullWidth sx={inputSx} />
            <TextInput source="description" multiline fullWidth sx={inputSx} />
            {/* Fitur akan kita styling juga */}
            <TextInput source="features.electricity" label="Features: Electricity" fullWidth sx={inputSx} />
            <TextInput source="features.water" label="Features: Water" fullWidth sx={inputSx} />
        </SimpleForm>
    </Create>
);