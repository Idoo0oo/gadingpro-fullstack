// gadingpro-admin/src/App.jsx
import { Admin, Resource, EditGuesser } from 'react-admin';
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
import { ProjectList, ProjectCreate } from './projects';
import { BranchList, BranchCreate } from './branches';
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
        edit={EditGuesser}
        icon={ApartmentIcon}
        options={{ label: 'Projects' }}
      />
      <Resource
        name="branches"
        list={BranchList}
        create={BranchCreate}
        edit={EditGuesser}
        icon={BusinessIcon}
        options={{ label: 'Cabang' }}
      />
      <Resource
        name="inquiries"
        list={InquiryList}
        show={InquiryShow}
        icon={MailIcon}
        options={{ label: 'Pesan Masuk' }}
      />
    </Admin>
  );
}

export default App;