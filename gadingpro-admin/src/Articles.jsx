// gadingpro-admin/src/Articles.jsx (Dimodernisasi dengan gaya Shadcn UI)

import React, { useEffect } from 'react';
import {
    List, Create, Edit, Datagrid, TextField, SimpleForm, TextInput,
    required, ImageField, ImageInput, Filter, SearchInput
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { RichTextInput } from 'ra-input-rich-text';
import slugify from 'slugify';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// --- FORM UTAMA ARTIKEL DENGAN GAYA SHADCN UI ---
const ArticleFormInputs = () => {
    const { watch, setValue } = useFormContext();
    const title = watch('title');

    // Efek untuk generate slug otomatis dari judul
    useEffect(() => {
        if (title) {
            const newSlug = slugify(title, {
                lower: true,
                strict: true,
                remove: /[*+~.()'"!:@]/g
            });
            setValue('slug', newSlug);
        }
    }, [title, setValue]);

    return (
        <div className="flex flex-col gap-6">
            {/* Kartu untuk Metadata Artikel */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Utama Artikel</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput source="title" validate={[required()]} fullWidth label="Judul Artikel" />
                    <TextInput source="slug" validate={[required()]} fullWidth helperText="URL-friendly, akan ter-generate otomatis dari judul" />
                    <TextInput source="category" validate={[required()]} fullWidth label="Kategori" helperText="Contoh: Tips & Trik, Panduan, Berita" />
                    <TextInput source="author" label="Nama Penulis" fullWidth defaultValue="Tim GadingPro" />
                </CardContent>
            </Card>

            {/* Kartu untuk Gambar dan Konten */}
            <Card>
                <CardHeader>
                    <CardTitle>Gambar dan Konten</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <ImageInput source="imageUrl" label="Gambar Utama Artikel" accept="image/*">
                        <ImageField source="src" title="title" />
                    </ImageInput>
                    {/* RichTextInput dibiarkan memanjang agar nyaman untuk menulis */}
                    <RichTextInput source="content" label="Konten Artikel" />
                </CardContent>
            </Card>
        </div>
    );
};

// Filter untuk List
const ArticleFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn placeholder="Cari judul artikel..." />
    </Filter>
);

// --- KOMPONEN LIST, CREATE, DAN EDIT ---

export const ArticleList = (props) => (
    <List {...props} filters={<ArticleFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" label="Judul" />
            <TextField source="category" label="Kategori" />
            <TextField source="author" label="Penulis" />
            <TextField source="slug" />
        </Datagrid>
    </List>
);

export const ArticleCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ArticleFormInputs />
        </SimpleForm>
    </Create>
);

export const ArticleEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <ArticleFormInputs />
        </SimpleForm>
    </Edit>
);