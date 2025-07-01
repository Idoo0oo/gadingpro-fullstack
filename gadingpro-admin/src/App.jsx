// gadingpro-admin/src/App.jsx
import { Admin, Resource, EditGuesser } from 'react-admin';
import { createTheme } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MailIcon from '@mui/icons-material/Mail';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import MyLoginPage from './MyLoginPage';
import MyLayout from './MyLayout'; // Layout kustom kita

// Import komponen resource
import { ProjectList, ProjectCreate } from './projects';
import { BranchList, BranchCreate } from './branches';
import { InquiryList } from './inquiries';

// Kustomisasi tema MUI agar cocok dengan brand
const theme = createTheme({
    palette: {
        primary: {
            main: '#ff6b35', // Oranye khas GadingPro
        },
        secondary: {
            main: '#434343', // Abu-abu gelap
        },
        background: {
            default: '#f4f6f8',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
                }
            }
        }
    }
});

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={MyLoginPage}
      layout={MyLayout}
      theme={theme}
      requireAuth // Wajibkan login untuk semua halaman
    >
      <Resource
        name="projects"
        list={ProjectList}
        create={ProjectCreate}
        edit={EditGuesser} // EditGuesser sangat bagus untuk development awal
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
        icon={MailIcon}
        options={{ label: 'Pesan Masuk' }}
      />
    </Admin>
  );
}

export default App;