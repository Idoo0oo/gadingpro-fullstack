// gadingpro-admin/src/Dashboard.jsx (VERSI MODERN DENGAN STAT CARDS)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetList } from "react-admin";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Building2, Home, Mail, FileText, Building } from "lucide-react";

// Komponen Kartu Statistik yang bisa digunakan ulang
const StatCard = ({ title, value, icon, to, isLoading }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="text-2xl font-bold">Memuat...</div>
            ) : (
                <div className="text-2xl font-bold">{value}</div>
            )}
            <Link to={to} className="text-xs text-muted-foreground flex items-center hover:underline">
                Lihat Semua <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    // --- MENGAMBIL DATA TOTAL UNTUK STATISTIK ---
    const { total: totalProjects, isLoading: isLoadingTotalProjects } = useGetList('projects', { pagination: { page: 1, perPage: 1 } });
    const { total: totalUnits, isLoading: isLoadingTotalUnits } = useGetList('units', { pagination: { page: 1, perPage: 1 } });
    const { total: totalInquiries, isLoading: isLoadingTotalInquiries } = useGetList('inquiries', { pagination: { page: 1, perPage: 1 } });
    const { total: totalArticles, isLoading: isLoadingTotalArticles } = useGetList('articles', { pagination: { page: 1, perPage: 1 } });
    const { total: totalBranches, isLoading: isLoadingTotalBranches } = useGetList('branches', { pagination: { page: 1, perPage: 1 } });

    // --- MENGAMBIL DATA TERBARU UNTUK TABEL ---
    const { data: recentProjects, isLoading: isLoadingProjects } = useGetList('projects', { pagination: { page: 1, perPage: 5 }, sort: { field: 'id', order: 'DESC' } });
    const { data: recentInquiries, isLoading: isLoadingInquiries } = useGetList('inquiries', { pagination: { page: 1, perPage: 5 }, sort: { field: 'createdAt', order: 'DESC' } });
    const { data: recentArticles, isLoading: isLoadingArticles } = useGetList('articles', { pagination: { page: 1, perPage: 5 }, sort: { field: 'publishedDate', order: 'DESC' } }); // <-- DATA BARU
    const { data: recentBranches, isLoading: isLoadingBranches } = useGetList('branches', { pagination: { page: 1, perPage: 5 }, sort: { field: 'id', order: 'DESC' } });

    return (
        <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-8">
            {/* Header Sambutan */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Selamat Datang Kembali!</h1>
                <p className="text-muted-foreground mt-1">
                    Berikut adalah ringkasan singkat dari aktivitas di GadingPro.
                </p>
            </div>

            {/* --- KARTU STATISTIK --- */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"> {/* DIUBAH MENJADI 5 KOLOM */}
                <StatCard title="Total Proyek" value={totalProjects} icon={<Building2 className="h-4 w-4 text-muted-foreground" />} to="/projects" isLoading={isLoadingTotalProjects} />
                <StatCard title="Total Tipe Unit" value={totalUnits} icon={<Home className="h-4 w-4 text-muted-foreground" />} to="/units" isLoading={isLoadingTotalUnits} />
                <StatCard title="Total Cabang" value={totalBranches} icon={<Building className="h-4 w-4 text-muted-foreground" />} to="/branches" isLoading={isLoadingTotalBranches} /> {/* <-- KARTU BARU */}
                <StatCard title="Total Artikel" value={totalArticles} icon={<FileText className="h-4 w-4 text-muted-foreground" />} to="/articles" isLoading={isLoadingTotalArticles} />
                <StatCard title="Pesan Masuk" value={totalInquiries} icon={<Mail className="h-4 w-4 text-muted-foreground" />} to="/inquiries" isLoading={isLoadingTotalInquiries} />
            </div>

            {/* --- TABEL DATA TERBARU --- */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Kartu Proyek Terbaru */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Proyek Terbaru</CardTitle>
                        <Button asChild variant="outline" size="sm">
                            <Link to="/projects">Lihat Semua</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Proyek</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingProjects ? (
                                    <TableRow><TableCell colSpan={2}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    recentProjects?.map(project => (
                                        <TableRow key={project.id}>
                                            <TableCell>
                                                <div className="font-medium">{project.name}</div>
                                                <div className="text-xs text-muted-foreground">{project.location}</div>
                                            </TableCell>
                                            <TableCell><Badge variant="secondary">{project.status}</Badge></TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Kartu Pesan Masuk Terbaru */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Pesan Masuk Terbaru</CardTitle>
                        <Button asChild variant="outline" size="sm">
                            <Link to="/inquiries">Lihat Semua</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pengirim</TableHead>
                                    <TableHead>Tipe</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingInquiries ? (
                                    <TableRow><TableCell colSpan={2}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    recentInquiries?.map(inquiry => (
                                        <TableRow key={inquiry.id}>
                                            <TableCell>
                                                <div className="font-medium">{inquiry.name}</div>
                                                <div className="text-xs text-muted-foreground">{inquiry.unitType || 'Informasi Umum'}</div>
                                            </TableCell>
                                            <TableCell><Badge variant="secondary">{inquiry.type}</Badge></TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Kartu Artikel Terbaru (BARU) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Artikel Terbaru</CardTitle>
                        <Button asChild variant="outline" size="sm">
                            <Link to="/articles">Lihat Semua</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Judul Artikel</TableHead>
                                    <TableHead>Kategori</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingArticles ? (
                                    <TableRow><TableCell colSpan={2}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    recentArticles?.map(article => (
                                        <TableRow key={article.id}>
                                            <TableCell>
                                                <div className="font-medium">{article.title}</div>
                                                <div className="text-xs text-muted-foreground">Oleh: {article.author}</div>
                                            </TableCell>
                                            <TableCell><Badge variant="secondary">{article.category}</Badge></TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Kartu Cabang Terbaru (BARU) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Cabang Terbaru</CardTitle>
                        <Button asChild variant="outline" size="sm">
                            <Link to="/branches">Lihat Semua</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Cabang</TableHead>
                                    <TableHead>Kota</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingBranches ? (
                                    <TableRow><TableCell colSpan={2}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    recentBranches?.map(branch => (
                                        <TableRow key={branch.id}>
                                            <TableCell>
                                                <div className="font-medium">{branch.name}</div>
                                                <div className="text-xs text-muted-foreground">{branch.address}</div>
                                            </TableCell>
                                            <TableCell><Badge variant="secondary">{branch.city}</Badge></TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;