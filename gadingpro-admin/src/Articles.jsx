// gadingpro-admin/src/articles.jsx
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
    required,
    Filter,
    SearchInput
} from 'react-admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ArticleFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn placeholder="Cari judul artikel..."/>
    </Filter>
);

export const ArticleList = (props) => (
    <List {...props} filters={<ArticleFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" label="Judul Artikel"/>
            <TextField source="category" label="Kategori" />
            <TextField source="author" label="Penulis" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const ArticleForm = () => (
    <SimpleForm>
        <Card className="w-full mb-6">
            <CardHeader>
                <CardTitle>Informasi Artikel</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <TextInput source="title" validate={[required()]} fullWidth label="Judul Artikel"/>
                <TextInput source="slug" validate={[required()]} fullWidth label="Slug (URL friendly)"/>
                <TextInput source="category" validate={[required()]} fullWidth label="Kategori"/>
                <TextInput source="imageUrl" validate={[required()]} fullWidth label="URL Gambar"/>
                <TextInput source="author" fullWidth label="Nama Penulis"/>
                <TextInput 
                    source="content" 
                    label="Konten Artikel" 
                    multiline
                    fullWidth 
                    resettable 
                />
            </CardContent>
        </Card>
    </SimpleForm>
);


export const ArticleCreate = (props) => (
    <Create {...props}>
        <ArticleForm />
    </Create>
);

export const ArticleEdit = (props) => (
    <Edit {...props}>
        <ArticleForm />
    </Edit>
);