// gadingpro-admin-panel/src/inquiries.tsx
import { List, Datagrid, TextField, EmailField, DateField, ShowButton, DeleteButton } from 'react-admin';

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
        <ShowButton label="Lihat" />
        <DeleteButton />
    </div>
);

export const InquiryList = () => (
    <List>
        <Datagrid rowClick="show" sx={datagridStyles}>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="type" />
            <DateField source="createdAt" showTime />
            <ActionsCell /> {/* Tombol aksi */}
        </Datagrid>
    </List>
);