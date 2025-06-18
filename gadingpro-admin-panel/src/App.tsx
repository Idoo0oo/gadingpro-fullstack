// gadingpro-admin-panel/src/App.tsx
import { Admin, Resource, EditGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';

import { ProjectList, ProjectCreate } from './projects'; // <<< Tambahkan ProjectCreate di import
import { BranchList, BranchCreate } from './branches';   // <<< Tambahkan BranchCreate di import
import { InquiryList } from './inquiries';

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      {/* Gunakan ProjectCreate untuk properti 'create' */}
      <Resource name="projects" list={ProjectList} edit={EditGuesser} create={ProjectCreate} />
      {/* Gunakan BranchCreate untuk properti 'create' */}
      <Resource name="branches" list={BranchList} edit={EditGuesser} create={BranchCreate} />
      {/* Inquiry tidak perlu tombol create, karena datang dari form publik */}
      <Resource name="inquiries" list={InquiryList} />
    </Admin>
  );
}

export default App;