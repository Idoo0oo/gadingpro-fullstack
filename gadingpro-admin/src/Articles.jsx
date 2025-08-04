// gadingpro-admin/src/Articles.jsx

import React, { useEffect } from 'react';
import {
    List, Create, Edit, Datagrid, TextField, SimpleForm, TextInput, RichTextField,
    required, ImageField, ImageInput
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { RichTextInput } from 'ra-input-rich-text';
import slugify from 'slugify'; // <-- 1. Import slugify

// 2. Buat komponen Form terpisah untuk dipakai berulang
const ArticleFormInputs = () => {
    const { watch, setValue } = useFormContext();
    const title = watch('title');

    useEffect(() => {
        if (title) {
            const newSlug = slugify(title, {
                lower: true,
                strict: true,
                remove: /[*+~.()'"!:@]/g
            });
            setValue('slug', newSlug);
        }
    }, [title, setValue]); // <-- Dependency array

    return (
        <>
            <TextInput source="title" validate={required()} fullWidth />
            <TextInput source="slug" validate={required()} fullWidth helperText="URL-friendly, akan ter-generate otomatis dari judul" />
            <TextInput source="category" validate={required()} fullWidth />
            <ImageInput source="imageUrl" label="Gambar Artikel" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="author" label="Nama Penulis" fullWidth />
            <RichTextInput source="content" label="Konten Artikel" />
        </>
    );
};

// 3. Gunakan ArticleForm di halaman Create dan Edit
export const ArticleList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" label="Judul" />
            <TextField source="slug" />
            <TextField source="author" label="Penulis" />
            <RichTextField source="category" label="Kategori" />
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