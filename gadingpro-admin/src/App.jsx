// gadingpro-admin/src/App.jsx (VERSI FINAL & DIPERBAIKI)

import { Admin, Resource } from 'react-admin';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

// Import komponen kustom
import { theme } from './theme';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import MyLoginPage from './MyLoginPage';
import MyLayout from './MyLayout';
import Dashboard from './Dashboard';

// Import komponen resource
import { ProjectList, ProjectCreate, ProjectEdit } from './projects';
import { BranchList, BranchCreate, BranchEdit } from './branches';
import { UnitList, UnitCreate, UnitEdit } from './units';
import { InquiryList } from './inquiries';
import { InquiryShow } from './inquiriesShow'; 
import { UserList, UserCreate, UserEdit } from './users';

const App = () => (
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
            edit={ProjectEdit}
            icon={ApartmentIcon}
            options={{ label: 'Projects' }}
        />
        {/* RESOURCE BARU */}
        <Resource
            name="units"
            list={UnitList}
            create={UnitCreate}
            edit={UnitEdit}
            icon={HomeWorkIcon}
            options={{ label: 'Tipe Unit' }}
        />
        <Resource
            name="branches"
            list={BranchList}
            create={BranchCreate}
            edit={BranchEdit}
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
        <Resource
            name="users"
            list={UserList}
            create={UserCreate}
            edit={UserEdit}
            icon={PeopleIcon}
            options={{ label: 'Kelola Admin' }} // Ganti label jadi Kelola Admin
        />
        
    </Admin>
);

export default App;