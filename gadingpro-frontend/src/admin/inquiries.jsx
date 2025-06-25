// gadingpro-admin-panel/src/inquiries.tsx
import { List, Datagrid, TextField, EmailField, DateField } from 'react-admin';

export const InquiryList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="type" />
            <DateField source="createdAt" showTime />
            <TextField source="message" />
        </Datagrid>
    </List>
);