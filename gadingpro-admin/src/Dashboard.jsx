// gadingpro-admin/src/Dashboard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetList } from "react-admin";

const Dashboard = () => {
    // Ambil 5 proyek terbaru (diurutkan berdasarkan ID terbaru)
    const { data: projects, isLoading: isLoadingProjects } = useGetList('projects', {
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'id', order: 'DESC' },
    });

    // Ambil 5 pesan masuk terbaru
    const { data: inquiries, isLoading: isLoadingInquiries } = useGetList('inquiries', {
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'createdAt', order: 'DESC' },
    });

    const { data: branches, isLoading: isLoadingBranches } = useGetList('branches', {
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
                    <CardHeader>
                        <CardTitle>Proyek Terbaru Ditambahkan</CardTitle>
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
                                    <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
                                ) : (
                                    projects?.map(project => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">{project.name}</TableCell>
                                            <TableCell>{project.location}</TableCell>
                                            <TableCell><Badge variant="outline">{project.status}</Badge></TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Kartu Pesan Masuk Terbaru */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pesan Masuk Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Tipe</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingInquiries ? (
                                    <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
                                ) : (
                                    inquiries?.map(inquiry => (
                                        <TableRow key={inquiry.id}>
                                            <TableCell className="font-medium">{inquiry.name}</TableCell>
                                            <TableCell><Badge variant="secondary">{inquiry.type}</Badge></TableCell>
                                            <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Cabang Terbaru Ditambahkan</CardTitle>
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
                                    <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
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
            </div>
        </div>
    );
};

export default Dashboard;