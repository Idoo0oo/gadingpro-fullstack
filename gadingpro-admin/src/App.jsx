// gadingpro-admin/src/App.jsx
import { Admin, Resource } from 'react-admin';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MailIcon from '@mui/icons-material/Mail';

// Import komponen kustom kita
import { theme } from './theme'; // Tema baru
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import MyLoginPage from './MyLoginPage';
import MyLayout from './MyLayout'; 
import Dashboard from './Dashboard'; // Dashboard baru

// Import komponen resource
import { ProjectList, ProjectCreate, ProjectEdit } from './projects';
import { BranchList, BranchCreate, BranchEdit } from './branches';
import { InquiryList } from './inquiries';
import { InquiryShow } from './inquiriesShow';

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={MyLoginPage}
      layout={MyLayout}
      theme={theme}
      dashboard={Dashboard}
      requireAuth
    >
      <Resource
        name="projects"
        list={ProjectList}
        create={ProjectCreate}
        edit={ProjectEdit} // <-- Ganti EditGuesser menjadi ProjectEdit
        icon={ApartmentIcon}
        options={{ label: 'Projects' }}
      />
      <Resource
        name="branches"
        list={BranchList}
        create={BranchCreate}
        edit={BranchEdit} // <-- Ganti EditGuesser menjadi BranchEdit
        icon={BusinessIcon}
        options={{ label: 'Cabang' }}
      />
      <Resource
        name="inquiries"
        list={InquiryList}
        show={InquiryShow} // <-- Show tetap ada untuk melihat detail
        icon={MailIcon}
        options={{ label: 'Pesan Masuk' }}
        create={null} // Pesan masuk tidak bisa dibuat dari admin
        edit={null}   // dan tidak bisa diedit
      />
    </Admin>
  );
}

export default App;