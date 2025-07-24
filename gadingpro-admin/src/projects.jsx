// gadingpro-admin/src/projects.jsx (FIX FINAL)
import {
    List,
    Datagrid,
    TextField,
    ImageField,
    EditButton,
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput, // <-- TextInput tetap di sini
    NumberInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    ImageInput,
    Filter,
    SearchInput,
    required
} from 'react-admin';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

// Form yang bisa digunakan kembali untuk Create dan Edit
const ProjectForm = () => (
    <SimpleForm>
        <Card className="w-full mb-6">
            <CardHeader>
                <CardTitle>Informasi Utama</CardTitle>
            </CardHeader>
            <CardContent>
                <TextInput source="name" validate={[required()]} fullWidth label="Nama Proyek"/>
                <TextInput source="location" validate={[required()]} fullWidth label="Lokasi"/>
                <TextInput source="price" validate={[required()]} fullWidth label="Harga (misal: Rp 1.2 Miliar)"/>
                <SelectInput source="status" validate={[required()]} choices={[
                    { id: 'Ready Stock', name: 'Ready Stock' },
                    { id: 'Launching', name: 'Launching' },
                    { id: 'Pre-Launching', name: 'Pre-Launching' },
                    { id: 'Sold Out', name: 'Sold Out' },
                    { id: 'Under Construction', name: 'Under Construction' },
                ]} fullWidth />
                <TextInput source="developer" fullWidth label="Nama Pengembang"/>
            </CardContent>
        </Card>

        <Card className="w-full mb-6">
             <CardHeader>
                <CardTitle>Gambar & Brosur</CardTitle>
            </CardHeader>
             <CardContent>
                <ImageInput source="image" label="Gambar Utama (Upload)" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <ImageInput source="images" label="Gambar Galeri Tambahan (Upload)" multiple accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <TextInput source="brochureLink" label="Link URL Brosur (Opsional)" fullWidth />
             </CardContent>
        </Card>
        
        <Card className="w-full mb-6">
            <CardHeader>
                <CardTitle>Detail & Spesifikasi</CardTitle>
            </CardHeader>
            <CardContent>
                 <TextInput 
                    source="description" 
                    label="Deskripsi Proyek" 
                    multiline // Ini akan membuatnya menjadi textarea
                    fullWidth 
                    resettable 
                 />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <NumberInput source="bedrooms" label="Kamar Tidur"/>
                    <NumberInput source="bathrooms" label="Kamar Mandi"/>
                    <NumberInput source="garage" label="Garasi"/>
                    <NumberInput source="landSize" label="Luas Tanah (m²)"/>
                    <NumberInput source="buildingSize" label="Luas Bangunan (m²)"/>
                    <NumberInput source="completionYear" label="Tahun Selesai"/>
                </div>
                 <SelectInput source="category" choices={[
                    { id: 'Cluster', name: 'Cluster' },
                    { id: 'Perumahan', name: 'Perumahan' },
                    { id: 'Apartemen', name: 'Apartemen' },
                ]} fullWidth />
                <SelectInput source="type" choices={[
                    { id: 'Rumah', name: 'Rumah' },
                    { id: 'Apartemen', name: 'Apartemen' },
                ]} fullWidth />
            </CardContent>
        </Card>

        <Card className="w-full mb-6">
             <CardHeader>
                <CardTitle>Fasilitas & Fitur</CardTitle>
            </CardHeader>
             <CardContent>
                <ArrayInput source="facilities" label="Fasilitas">
                    <SimpleFormIterator inline>
                        <TextInput source="" label="Nama Fasilitas" />
                    </SimpleFormIterator>
                </ArrayInput>
                 <TextInput source="features.electricity" label="Fitur: Listrik" fullWidth />
                 <TextInput source="features.water" label="Fitur: Sumber Air" fullWidth />
             </CardContent>
        </Card>
    </SimpleForm>
);

const ProjectFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn placeholder="Cari proyek..."/>
    </Filter>
);

export const ProjectList = (props) => (
    <List {...props} filters={<ProjectFilter />}>
        <Datagrid rowClick="edit" sx={datagridStyles}>
            <TextField source="id" />
            <TextField source="name" label="Nama Proyek"/>
            <TextField source="location" />
            <TextField source="price" />
            <TextField source="status" />
            <TextField source="category" />
            <ActionsCell />
        </Datagrid>
    </List>
);

export const ProjectCreate = (props) => (
    <Create {...props}>
        <ProjectForm />
    </Create>
);

export const ProjectEdit = (props) => (
    <Edit {...props}>
        <ProjectForm />
    </Edit>
);