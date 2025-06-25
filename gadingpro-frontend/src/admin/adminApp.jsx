// Konversi dari App.tsx
import { Admin, Resource, EditGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import { ProjectList, ProjectCreate } from './projects';
import { BranchList, BranchCreate } from './branches';
import { InquiryList } from './inquiries';

function AdminApp() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="projects" list={ProjectList} edit={EditGuesser} create={ProjectCreate} />
      <Resource name="branches" list={BranchList} edit={EditGuesser} create={BranchCreate} />
      <Resource name="inquiries" list={InquiryList} />
    </Admin>
  );
}

export default AdminApp;