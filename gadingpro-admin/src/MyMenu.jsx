// gadingpro-admin/src/MyMenu.jsx (REVISI)
import { Menu, usePermissions } from 'react-admin';
import { BookImage, Building2, MessageSquare, LayoutDashboard, Users } from 'lucide-react';

export const MyMenu = () => (
    <Menu>
        <Menu.DashboardItem
            leftIcon={<LayoutDashboard size={18} />}
            primaryText="Dashboard"
        />
        {/* React-admin akan otomatis membuat ini menjadi kategori jika ada item di dalamnya */}
        <Menu.Item
            to="/projects"
            primaryText="Projects"
            leftIcon={<BookImage size={18} />}
        />
        <Menu.Item
            to="/branches"
            primaryText="Cabang"
            leftIcon={<Building2 size={18} />}
        />
        <Menu.Item
            to="/inquiries"
            primaryText="Pesan Masuk"
            leftIcon={<MessageSquare size={18} />}
        />
        <Menu.Item
            to="/users"
            primaryText="Kelola Agent"
            leftIcon={<Users size={18} />}
        />
    </Menu>
);