// gadingpro-admin/src/projects.jsx (REVISED WITH AUTO-FORMAT PRICE)
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
    NumberInput,
    SelectInput,
    ImageInput,
    ImageField,
    Filter,
    SearchInput,
    required,
    ReferenceManyField,
    NumberField,
} from 'react-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

// --- Helper Functions untuk Format Harga ---
const formatPrice = (value) => {
    if (!value) return '';
    const numberValue = Number(value);
    if (isNaN(numberValue)) return '';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numberValue);
};

const parsePrice = (value) => {
    if (!value) return null;
    return String(value).replace(/[^\d]/g, '');
};
// -----------------------------------------

// Filter untuk List
const ProjectFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn placeholder="Cari nama atau lokasi..."/>
    </Filter>
);

// Form Utama Proyek
const ProjectForm = () => (
    <SimpleForm>
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Informasi Utama Proyek</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput source="name" validate={[required()]} fullWidth label="Nama Proyek"/>
                <TextInput source="developer" validate={[required()]} fullWidth label="Nama Pengembang"/>
                <TextInput source="location" validate={[required()]} fullWidth label="Lokasi (misal: Serpong, Tangerang Selatan)"/>
                <SelectInput source="status" validate={[required()]} choices={[
                    { id: 'Ready Stock', name: 'Ready Stock' },
                    { id: 'Launching', name: 'Launching' },
                    { id: 'Pre-Launching', name: 'Pre-Launching' },
                    { id: 'Sold Out', name: 'Sold Out' },
                    { id: 'Under Construction', name: 'Under Construction' },
                ]} fullWidth />
                 <SelectInput source="category" label="Kategori Properti" choices={[
                    { id: 'Cluster', name: 'Cluster' },
                    { id: 'Perumahan', name: 'Perumahan' },
                    { id: 'Apartemen', name: 'Apartemen' },
                    { id: 'Townhouse', name: 'Townhouse' },
                    { id: 'Kondominium', name: 'Kondominium' },
                ]} fullWidth />
                <NumberInput source="completionYear" label="Tahun Selesai (Opsional)" fullWidth />
            </CardContent>
        </Card>

        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Harga dan Promo</CardTitle></CardHeader>
            <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* --- PERUBAHAN DI SINI --- */}
                    <NumberInput 
                        source="priceMin" 
                        label="Harga Terendah" 
                        fullWidth 
                        format={formatPrice}
                        parse={parsePrice}
                    />
                    <NumberInput 
                        source="priceMax" 
                        label="Harga Tertinggi" 
                        fullWidth 
                        format={formatPrice}
                        parse={parsePrice}
                    />
                    {/* ------------------------- */}
                </div>
                <TextInput source="promo" label="Teks Promo (Opsional)" multiline fullWidth resettable />
            </CardContent>
        </Card>

        {/* ... Sisa komponen Card lainnya tetap sama ... */}
        <Card className="w-full mb-6">
             <CardHeader><CardTitle>Gambar, Brosur, dan Deskripsi</CardTitle></CardHeader>
             <CardContent>
                <ImageInput source="image" label="Gambar Utama (Cover)" accept="image/*" validate={[required()]}>
                    <ImageField source="src" title="title" />
                </ImageInput>
                <ImageInput source="images" label="Gambar Galeri Tambahan" multiple accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <TextInput source="brochureLink" label="Link URL Brosur (Opsional)" fullWidth />
                 <TextInput source="description" label="Deskripsi Lengkap Proyek" multiline fullWidth resettable validate={[required()]} />
             </CardContent>
        </Card>

        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Informasi Lokasi</CardTitle></CardHeader>
            <CardContent>
                <TextInput source="googleMapsUrl" label="URL Google Maps Lengkap" fullWidth />
                <h4 className="text-sm font-semibold mt-4 mb-2">Lokasi Terdekat (Opsional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput source="nearbyLocations.Gerbang Tol" label="Contoh: Gerbang Tol" helperText="Isi dengan jarak/waktu, misal: 5 menit" />
                    <TextInput source="nearbyLocations.Pusat Perbelanjaan" label="Contoh: Pusat Perbelanjaan" helperText="Isi dengan jarak/waktu, misal: 10 menit ke AEON Mall" />
                    <TextInput source="nearbyLocations.Rumah Sakit" label="Contoh: Rumah Sakit" />
                    <TextInput source="nearbyLocations.Stasiun" label="Contoh: Stasiun Kereta/MRT" />
                    <TextInput source="nearbyLocations.Sekolah" label="Contoh: Sekolah/Universitas" />
                    <TextInput source="nearbyLocations.Bandara" label="Contoh: Bandara" />
                </div>
            </CardContent>
        </Card>
    </SimpleForm>
);

// --- Komponen List, Create, dan Edit (Tidak ada perubahan di sini) ---
export const ProjectList = (props) => (
    <List {...props} filters={<ProjectFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" label="Nama Proyek"/>
            <TextField source="location" />
            <TextField source="status" />
            <TextField source="developer" />
            <EditButton />
            <DeleteButton />
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
        <Card className="w-full mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tipe Unit Tersedia</CardTitle>
                <Button asChild className="bg-green-500 hover:bg-green-600">
                     <Link to="/units/create">
                        <AddIcon className="mr-2" /> Tambah Tipe Unit Baru
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <ReferenceManyField
                    label={false}
                    reference="units"
                    target="projectId"
                    perPage={10}
                >
                    <Datagrid>
                        <TextField source="name" label="Nama Tipe Unit" />
                        <NumberField source="price" label="Harga" options={{ style: 'currency', currency: 'IDR' }} />
                        <TextField source="bedrooms" label="K. Tidur" />
                        <TextField source="bathrooms" label="K. Mandi" />
                        <TextField source="landSize" label="LT (m²)" />
                        <TextField source="buildingSize" label="LB (m²)" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </CardContent>
        </Card>
    </Edit>
);