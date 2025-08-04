// gadingpro-admin/src/units.jsx (FINAL VERSION - CUSTOM CURRENCY INPUT FIXED)
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
    ReferenceInput,
    SelectInput,
    ImageInput,
    ImageField,
    required,
    ReferenceField,
    NumberField,
    useInput, // <-- Import useInput
} from 'react-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // <-- Import Input dari ShadCN
import { Label } from '@/components/ui/label'; // <-- Import Label dari ShadCN

// ====================================================================
// === KOMPONEN BARU UNTUK INPUT HARGA (SOLUSI PASTI) ===
// ====================================================================
const CurrencyInput = (props) => {
    const {
        field,
        fieldState: { error },
    } = useInput(props);

    const formatToRupiah = (value) => {
        if (value === null || value === undefined || value === '') return '';
        const stringValue = String(value).replace(/[^\d]/g, '');
        if (stringValue === '') return '';
        const numberValue = parseInt(stringValue, 10);
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numberValue);
    };

    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        field.onChange(rawValue === '' ? null : parseInt(rawValue, 10));
    };

    return (
        <div className="w-full">
            <Label htmlFor={field.name} className={error ? 'text-red-500' : ''}>
                {props.label || 'Harga Unit'} {props.validate?.includes(required()) && '*'}
            </Label>
            <Input
                {...field}
                id={field.name}
                type="text" // Type text agar bisa menampilkan "Rp"
                value={formatToRupiah(field.value)}
                onChange={handleInputChange}
                className={`mt-1 ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    );
};
// ====================================================================

// --- Form untuk Unit yang sudah diperbaiki total ---
const UnitForm = () => (
    <SimpleForm>
        {/* --- KARTU 1: INFORMASI UTAMA --- */}
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Informasi Utama Unit</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-6">
                <ReferenceInput source="projectId" reference="projects">
                    <SelectInput 
                        optionText="name" 
                        label="Pilih Proyek Induk" 
                        fullWidth 
                        validate={[required()]} 
                    />
                </ReferenceInput>
                <TextInput source="name" validate={[required()]} fullWidth label="Nama Tipe Unit (Contoh: Tipe Ruby, Tipe 6x12)"/>
                
                {/* MENGGUNAKAN KOMPONEN BARU KITA */}
                <CurrencyInput source="price" label="Harga Unit" validate={[required()]} />

            </CardContent>
        </Card>

        {/* --- KARTU 2: DETAIL FISIK --- */}
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Detail Fisik Unit</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <NumberInput source="bedrooms" validate={[required()]} label="Jml Kamar Tidur"/>
                <NumberInput source="bathrooms" validate={[required()]} label="Jml Kamar Mandi"/>
                <NumberInput source="garage" label="Kapasitas Garasi"/>
                <NumberInput source="landSize" validate={[required()]} label="Luas Tanah (m²)"/>
                <NumberInput source="buildingSize" validate={[required()]} label="Luas Bangunan (m²)"/>
            </CardContent>
        </Card>
        
        {/* --- KARTU 3: SPESIFIKASI TEKNIS --- */}
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Spesifikasi Teknis (Opsional)</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <TextInput source="specifications.Pondasi" label="Pondasi" />
                 <TextInput source="specifications.Dinding" label="Dinding" />
                 <TextInput source="specifications.Lantai" label="Lantai" />
                 <TextInput source="specifications.Atap" label="Atap" />
                 <TextInput source="specifications.Sanitasi" label="Sanitasi" />
            </CardContent>
        </Card>

        {/* --- KARTU 4: MEDIA & DESKRIPSI --- */}
        <Card className="w-full mb-6">
            <CardHeader><CardTitle>Media & Deskripsi Unit</CardTitle></CardHeader>
            <CardContent>
                <ImageInput source="images" label="Gambar Galeri Unit" multiple accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
                <TextInput source="description" label="Deskripsi Singkat Unit" multiline fullWidth resettable/>
            </CardContent>
        </Card>
    </SimpleForm>
);

// --- Komponen List, Create, dan Edit (Tidak perlu diubah) ---
export const UnitList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" label="Nama Tipe Unit" />
            <ReferenceField source="projectId" reference="projects" label="Proyek">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="price" label="Harga" options={{ style: 'currency', currency: 'IDR' }} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UnitCreate = (props) => (
    <Create {...props}>
        <UnitForm />
    </Create>
);

export const UnitEdit = (props) => (
    <Edit {...props}>
        <UnitForm />
    </Edit>
);