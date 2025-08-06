// gadingpro-admin/src/projects.jsx (DIROMBAK DENGAN SHADCN UI STYLE)
import {
    List, Datagrid, TextField, EditButton, DeleteButton, Create, Edit, SimpleForm,
    TextInput, NumberInput, SelectInput, ImageInput, ImageField, Filter, SearchInput,
    required, ReferenceManyField, NumberField, useInput
} from 'react-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Komponen Input Kustom untuk Harga (Sudah Sempurna)
const CurrencyInput = (props) => {
    const { field, fieldState: { error } } = useInput(props);
    const formatToRupiah = (value) => {
        if (value === null || value === undefined || value === '') return '';
        const stringValue = String(value).replace(/[^\d]/g, '');
        if (stringValue === '') return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(parseInt(stringValue, 10));
    };
    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        field.onChange(rawValue === '' ? null : parseInt(rawValue, 10));
    };
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={field.name} className={error ? 'text-destructive' : ''}>
                {props.label || 'Harga'} {props.validate?.includes(required()) && '*'}
            </Label>
            <Input {...field} id={field.name} type="text" value={formatToRupiah(field.value)} onChange={handleInputChange} />
            {error && <p className="text-destructive text-sm mt-1">{error.message}</p>}
        </div>
    );
};

// Filter untuk List (Tetap sama)
const ProjectFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn placeholder="Cari nama atau lokasi..." />
    </Filter>
);

// --- FORM UTAMA PROYEK DENGAN GAYA SHADCN UI ---
const ProjectForm = () => (
    <SimpleForm toolbar={null}> {/* Hapus toolbar default untuk layout penuh */}
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader><CardTitle>Informasi Utama Proyek</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput source="name" validate={[required()]} fullWidth label="Nama Proyek"/>
                    <TextInput source="developer" validate={[required()]} fullWidth label="Nama Pengembang"/>
                    <TextInput source="location" validate={[required()]} fullWidth label="Lokasi (misal: Serpong, Tangerang Selatan)"/>
                    <SelectInput source="status" validate={[required()]} choices={[
                        { id: 'Ready Stock', name: 'Ready Stock' }, { id: 'Launching', name: 'Launching' },
                        { id: 'Pre-Launching', name: 'Pre-Launching' }, { id: 'Sold Out', name: 'Sold Out' },
                        { id: 'Under Construction', name: 'Under Construction' },
                    ]} fullWidth />
                    <SelectInput source="category" label="Kategori Properti" choices={[
                        { id: 'Cluster', name: 'Cluster' }, { id: 'Perumahan', name: 'Perumahan' },
                        { id: 'Apartemen', name: 'Apartemen' }, { id: 'Townhouse', name: 'Townhouse' },
                        { id: 'Kondominium', name: 'Kondominium' },
                    ]} fullWidth />
                    <NumberInput source="completionYear" label="Tahun Selesai (Opsional)" fullWidth />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Harga dan Promo</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CurrencyInput source="priceMin" label="Harga Terendah" />
                    <CurrencyInput source="priceMax" label="Harga Tertinggi" />
                    <div className="md:col-span-2">
                        <TextInput source="promo" label="Teks Promo (Opsional)" multiline fullWidth resettable />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Media & Deskripsi</CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-6">
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

            <Card>
                <CardHeader><CardTitle>Informasi Lokasi</CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <TextInput source="googleMapsUrl" label="URL Google Maps Lengkap" fullWidth />
                    <div>
                        <h4 className="text-md font-semibold mb-4">Lokasi Terdekat (Opsional)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInput source="nearbyLocations.Gerbang Tol" label="Gerbang Tol" helperText="Isi dengan jarak/waktu, misal: 5 menit" fullWidth/>
                            <TextInput source="nearbyLocations.Pusat Perbelanjaan" label="Pusat Perbelanjaan" helperText="misal: 10 menit ke AEON Mall" fullWidth/>
                            <TextInput source="nearbyLocations.Rumah Sakit" label="Rumah Sakit" fullWidth/>
                            <TextInput source="nearbyLocations.Stasiun" label="Stasiun Kereta/MRT" fullWidth/>
                            <TextInput source="nearbyLocations.Sekolah" label="Sekolah/Universitas" fullWidth/>
                            <TextInput source="nearbyLocations.Bandara" label="Bandara" fullWidth/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </SimpleForm>
);


// --- KOMPONEN LIST, CREATE, DAN EDIT ---
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

export const ProjectEdit = (props) => {
    const source = { projectId: props.id };
    const to = `/units/create?source=${JSON.stringify(source)}`;

    return (
        <Edit {...props} redirect="list">
            <ProjectForm />
            <Card className="w-full mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tipe Unit Tersedia</CardTitle>
                    <Button asChild>
                        <Link to={to}>
                            <AddIcon className="mr-2 h-4 w-4" /> Tambah Tipe Unit
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <ReferenceManyField
                        label={false} reference="units" target="projectId" perPage={10}
                    >
                        <Datagrid bulkActionButtons={false}>
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
};