// gadingpro-admin/src/MyMenu.jsx
import { useState } from 'react';
import { Menu } from 'react-admin';
import { BookImage, Building2, MessageSquare, LayoutDashboard, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapse } from '@mui/material';

export const MyMenu = () => {
    const [open, setOpen] = useState(true);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Menu>
            <Menu.DashboardItem
                leftIcon={<LayoutDashboard size={18} />}
                primaryText="Dashboard"
            />

            {/* Kategori yang bisa diciutkan */}
            <div onClick={handleToggle} className="flex items-center justify-between cursor-pointer text-sm p-4 hover:bg-muted">
                <span className="font-semibold text-muted-foreground">Manajemen</span>
                {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>

            {/* Submenu di dalam Collapse */}
            <Collapse in={open} timeout="auto" unmountOnExit>
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
            </Collapse>
        </Menu>
    );
};