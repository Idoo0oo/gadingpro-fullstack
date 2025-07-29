// gadingpro-admin/src/units.jsx
import {
    List, Create, Edit, SimpleForm, Datagrid, TextField,
    TextInput, NumberInput, ReferenceInput, SelectInput,
    ImageInput, ImageField, required, ReferenceField
} from 'react-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Form untuk Create & Edit Tipe Unit
const UnitForm = () => (
    <SimpleForm>
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Informasi Tipe Unit</CardTitle></CardHeader>
            <CardContent>
                <ReferenceInput source="projectId" reference="projects">
                    <SelectInput optionText="name" validate={[required()]} fullWidth label="Pilih Proyek Induk"/>
                </ReferenceInput>
                <TextInput source="name" validate={[required()]} fullWidth label="Nama Tipe Unit (misal: Tipe Canna)"/>
                <NumberInput source="price" validate={[required()]} fullWidth label="Harga"/>
                <TextInput source="description" multiline fullWidth label="Deskripsi Singkat"/>
            </CardContent>
        </Card>
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Spesifikasi Unit</CardTitle></CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <NumberInput source="bedrooms" label="Kamar Tidur"/>
                    <NumberInput source="bathrooms" label="Kamar Mandi"/>
                    <NumberInput source="garage" label="Garasi"/>
                    <NumberInput source="landSize" label="Luas Tanah (m²)"/>
                    <NumberInput source="buildingSize" label="Luas Bangunan (m²)"/>
                </div>
                <TextInput source="specifications.pondasi" label="Spesifikasi: Pondasi" fullWidth />
                <TextInput source="specifications.dinding" label="Spesifikasi: Dinding" fullWidth />
                 {/* Tambahkan TextInput lain untuk spesifikasi lainnya */}
            </CardContent>
        </Card>
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Gambar Unit</CardTitle></CardHeader>
            <CardContent>
                 <ImageInput source="images" label="Gambar Galeri Unit (Upload)" multiple accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </CardContent>
        </Card>
    </SimpleForm>
);

export const UnitList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="projectId" reference="projects" label="Proyek">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="name" label="Nama Tipe Unit"/>
            <TextField source="price" label="Harga"/>
            <TextField source="bedrooms" label="KT"/>
            <TextField source="bathrooms" label="KM"/>
        </Datagrid>
    </List>
);

export const UnitCreate = (props) => (<Create {...props}><UnitForm /></Create>);
export const UnitEdit = (props) => (<Edit {...props}><UnitForm /></Edit>);