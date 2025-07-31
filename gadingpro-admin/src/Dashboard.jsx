// gadingpro-admin/src/Dashboard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetList } from "react-admin";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    // Ambil 5 proyek terbaru
    const { data: projects, isLoading: isLoadingProjects } = useGetList('projects', {
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'id', order: 'DESC' },
    });

    // AMBIL 10 PESAN MASUK TERBARU (SESUAI PERMINTAAN)
    const { data: inquiries, isLoading: isLoadingInquiries } = useGetList('inquiries', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'createdAt', order: 'DESC' },
    });

    // Ambil 5 cabang terbaru
    const { data: branches, isLoading: isLoadingBranches } = useGetList('branches', {
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'id', order: 'DESC' },
    });

    // --- BARU: Ambil 5 artikel terbaru ---
    const { data: articles, isLoading: isLoadingArticles } = useGetList('articles', {
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'id', order: 'DESC' },
    });

    return (
        <div className="p-4 md:p-6 lg:p-8 grid gap-8">
            {/* Header Sambutan */}
            <div className="bg-card border p-6 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Selamat Datang di GadingPro Admin!</h1>
                <p className="text-muted-foreground mt-2">
                    Ini adalah pusat kendali untuk mengelola semua data properti, cabang, dan interaksi klien Anda.
                </p>
            </div>

            {/* Grid untuk menampilkan data */}
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
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingProjects ? (
                                    <TableRow><TableCell colSpan={3}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    projects?.map(project => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">{project.name}</TableCell>
                                            <TableCell>{project.location}</TableCell>
                                            <TableCell><Badge variant="secondary">{project.status}</Badge></TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* --- BARU: Kartu Artikel Terbaru --- */}
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
                                    <TableHead>Penulis</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingArticles ? (
                                    <TableRow><TableCell colSpan={3}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    articles?.map(article => (
                                        <TableRow key={article.id}>
                                            <TableCell className="font-medium">{article.title}</TableCell>
                                            <TableCell><Badge variant="secondary">{article.category}</Badge></TableCell>
                                            <TableCell>{article.author}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Grid untuk data panjang (inquiries dan branches) */}
            <div className="grid gap-8">
                 {/* Kartu Cabang Terbaru */}
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
                                    <TableHead>Alamat</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingBranches ? (
                                    <TableRow><TableCell colSpan={3}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    branches?.map(branch => (
                                        <TableRow key={branch.id}>
                                            <TableCell className="font-medium">{branch.name}</TableCell>
                                            <TableCell>{branch.city}</TableCell>
                                            <TableCell>{branch.address}</TableCell>
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
                        <CardTitle>10 Pesan Masuk Terbaru</CardTitle>
                        <Button asChild variant="outline" size="sm">
                            <Link to="/inquiries">Lihat Semua</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Tipe Pesan</TableHead>
                                    <TableHead>Unit Diminati</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingInquiries ? (
                                    <TableRow><TableCell colSpan={4}>Memuat data...</TableCell></TableRow>
                                ) : (
                                    inquiries?.map(inquiry => (
                                        <TableRow key={inquiry.id}>
                                            <TableCell className="font-medium">{inquiry.name}</TableCell>
                                            <TableCell><Badge variant="secondary">{inquiry.type}</Badge></TableCell>
                                            <TableCell>{inquiry.unitType || '-'}</TableCell>
                                            <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
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