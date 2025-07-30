// gadingpro-fullstack/gadingpro-frontend/src/data/index.js
import People1 from "../assets/img/testimonial/people-1.jpg";
import People2 from "../assets/img/testimonial/people-2.jpg";
import People3 from "../assets/img/testimonial/people-3.jpg";

import 'bootstrap-icons/font/bootstrap-icons.css';

export const navLinks = [
  {
    id: 1,
    path: "",
    text: "Home",
  },
  {
    id: 2,
    path: "about",
    text: "About",
  },
  {
    id: 3,
    path: "projects",
    text: "Projects",
  },
  {
    id: 4,
    path: "articles",
    text: "Articles",
  },
];

export const projects = [
  // Pertahankan ini jika masih digunakan sebagai data fallback atau data spesifik homepage yang tidak selalu sama dengan API.
  // Jika tidak, Anda bisa menghapus seluruh array 'projects' ini juga.
  {
    id: 1,
    name: "Griya Harmoni Residence",
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
    location: "Tangerang Selatan",
    price: "Rp 850 Juta",
    status: "Ready Stock",
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    landSize: 84,
    buildingSize: 54,
    facilities: ["Security 24 Jam", "Taman Bermain", "Masjid", "Kolam Renang", "Jogging Track", "Mini Market"],
    description: "Hunian modern dengan konsep cluster eksklusif yang menawarkan kenyamanan dan kemudahan akses ke berbagai fasilitas kota.",
    images: [
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    ],
    features: {
      electricity: "2200 Watt",
      water: "PDAM",
      flooring: "Keramik 40x40",
      ceiling: "Plafon Gypsum",
      structure: "Beton Bertulang"
    }
  },
  {
    id: 2,
    name: "Lavender Garden Estate",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    location: "BSD City",
    price: "Rp 1.2 Miliar",
    status: "Pre Launching",
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    landSize: 105,
    buildingSize: 78,
    facilities: ["Smart Home System", "Private Pool", "Garden View", "Car Port", "Kitchen Set", "AC"],
    description: "Perumahan premium dengan teknologi smart home dan desain kontemporer yang menghadirkan gaya hidup modern.",
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg"
    ],
    features: {
      electricity: "3500 Watt",
      water: "PDAM + Sumur Bor",
      flooring: "Granit 60x60",
      ceiling: "Plafon Gypsum + Drop Ceiling",
      structure: "Beton Bertulang Premium"
    }
  },
  {
    id: 3,
    name: "Emerald Hills Residence",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    location: "Serpong",
    price: "Rp 950 Juta",
    status: "Ready Stock",
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    landSize: 90,
    buildingSize: 65,
    facilities: ["Clubhouse", "Swimming Pool", "Gym", "Café", "Playground", "24H Security"],
    description: "Kompleks perumahan dengan konsep resort living yang memberikan suasana tenang dan asri di tengah kota.",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    ],
    features: {
      electricity: "2200 Watt",
      water: "PDAM",
      flooring: "Keramik Premium 50x50",
      ceiling: "Plafon Gypsum",
      structure: "Beton Bertulang"
    }
  },
  {
    id: 4,
    name: "Royal Mansion Park",
    image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
    location: "Gading Serpong",
    price: "Rp 1.5 Miliar",
    status: "Sold Out",
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    landSize: 120,
    buildingSize: 95,
    facilities: ["Private Garden", "Maid Room", "Study Room", "Walk-in Closet", "Balcony", "Carport"],
    description: "Hunian mewah dengan arsitektur klasik modern yang mengedepankan privasi dan eksklusivitas.",
    images: [
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    ],
    features: {
      electricity: "4400 Watt",
      water: "PDAM + Sumur Bor",
      flooring: "Parket + Granit",
      ceiling: "Plafon Gypsum Mewah",
      structure: "Beton Bertulang Premium + Steel Frame"
    }
  },
  {
    id: 5,
    name: "Green Valley Cluster",
    image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
    location: "Pamulang",
    price: "Rp 750 Juta",
    status: "Ready Stock",
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    landSize: 72,
    buildingSize: 45,
    facilities: ["Garden", "Carport", "Kitchen Set", "Water Heater", "Security", "Access Gate"],
    description: "Cluster modern dengan harga terjangkau yang cocok untuk keluarga muda yang ingin memiliki rumah pertama.",
    images: [
      "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    ],
    features: {
      electricity: "1300 Watt",
      water: "PDAM",
      flooring: "Keramik 30x30",
      ceiling: "Plafon Gypsum",
      structure: "Beton Bertulang"
    }
  },
  {
    id: 6,
    name: "Sapphire Heights Townhouse",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
    location: "Bintaro",
    price: "Rp 1.8 Miliar",
    status: "Pre Launching",
    bedrooms: 5,
    bathrooms: 4,
    garage: 2,
    landSize: 150,
    buildingSize: 120,
    facilities: ["Rooftop Terrace", "Home Theater", "Wine Cellar", "Maid Quarter", "Elevator", "Solar Panel"],
    description: "Townhouse eksklusif dengan desain kontemporer dan fasilitas premium untuk gaya hidup modern.",
    images: [
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    ],
    features: {
      electricity: "5500 Watt",
      water: "PDAM + Sumur Bor + Filter",
      flooring: "Marmer + Parket Premium",
      ceiling: "Plafon Gypsum Mewah + Wood Panel",
      structure: "Beton Bertulang Premium + Steel Frame"
    }
  }
];

export const testimonial = [
  {
    id: 1,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 1",
    skill: "UI UX Designer",
  },
  {
    id: 2,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 2",
    skill: "Flutter Developer",
  },
  {
    id: 3,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 3",
    skill: "Web Developer",
  },
  {
    id: 4,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 4",
    skill: "UI UX Designer",
  },
  {
    id: 5,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 5",
    skill: "Flutter Developer",
  },
  {
    id: 6,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 6",
    skill: "Web Developer",
  },
  {
    id: 7,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People1,
    name: "People 7",
    skill: "UI UX Designer",
  },
  {
    id: 8,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People2,
    name: "People 8",
    skill: "Flutter Developer",
  },
  {
    id: 9,
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe a. Quod eos non, dolores sapiente dicta quam esse reprehenderit explicabo vitae nesciunt ut laborum harum, vel optio corporis voluptatem?",
    image: People3,
    name: "People 9",
    skill: "Web Developer",
  },
];

export const dataSwiper = [
  {
    id: 1,
    desc: "Proses mencari rumah impian saya jadi sangat mudah berkat GadingPro. Timnya responsif dan sangat membantu dalam menemukan properti yang sesuai budget dan lokasi. Sangat direkomendasikan!",
    image: People1, // Asumsi People1 adalah import gambar
    name: "Andi Wijaya",
    skill: "Pembeli Rumah",
  },
  {
    id: 2,
    desc: "Saya terkesan dengan pilihan proyek yang beragam dan informasinya sangat detail. Fitur brosur sangat membantu saya membuat keputusan. Pelayanan GadingPro luar biasa!",
    image: People2, // Asumsi People2 adalah import gambar
    name: "Budi Santoso",
    skill: "Investor Properti",
  },
  {
    id: 3,
    desc: "Dari awal hingga serah terima kunci, GadingPro memberikan pendampingan terbaik. Mereka sangat profesional dan transparan. Saya sangat puas dengan hunian baru saya.",
    image: People3, // Asumsi People3 adalah import gambar
    name: "Citra Dewi",
    skill: "Klien GadingPro",
  },
  {
    id: 4,
    desc: "Meskipun sibuk, saya bisa menemukan properti yang pas di GadingPro. Antarmuka websitenya user-friendly dan data yang disajikan sangat akurat. Terima kasih GadingPro!",
    image: People1, // Asumsi People1 adalah import gambar
    name: "Dini Anggraini",
    skill: "Profesional Muda",
  },
  {
    id: 5,
    desc: "Saya sangat terbantu dengan adanya daftar cabang GadingPro yang lengkap. Bisa langsung datang dan berkonsultasi secara langsung. Stafnya ramah dan penjelasannya mudah dimengerti.",
    image: People2, // Asumsi People2 adalah import gambar
    name: "Eko Prasetyo",
    skill: "Pencari Hunian Keluarga",
  },
  {
    id: 6,
    desc: "Pilihan apartemen di GadingPro sangat bervariasi dan modern. Saya mendapatkan penawaran terbaik dan proses KPR juga dibantu. Layanan purna jualnya juga top!",
    image: People3, // Asumsi People3 adalah import gambar
    name: "Fitriani",
    skill: "Pembeli Apartemen",
  },
];

export const faq = [
  {
    id: 1,
    eventKey: 0,
    title: "Apa itu GadingPro dan layanan apa saja yang ditawarkan?",
    desc: "GadingPro adalah platform properti terkemuka yang menyediakan informasi komprehensif mengenai berbagai jenis properti, mulai dari rumah, apartemen, townhouse, hingga kondominium. Kami membantu Anda menemukan hunian impian dengan detail lengkap, lokasi strategis, dan fasilitas terkini.",
  },
  {
    id: 2,
    eventKey: 1,
    title: "Bagaimana cara mencari properti di GadingPro?",
    desc: "Anda dapat mencari properti melalui halaman Projects kami. Gunakan filter pencarian berdasarkan lokasi, kategori, tipe properti, rentang harga, atau gunakan kolom pencarian bebas untuk menemukan properti yang sesuai dengan kriteria Anda.",
  },
  {
    id: 3,
    eventKey: 2,
    title: "Apakah saya bisa mengunduh brosur properti secara langsung?",
    desc: "Ya, Anda bisa! Kunjungi halaman Get Brochure kami. Di sana Anda dapat melihat daftar brosur proyek yang tersedia dan mengunduhnya secara langsung dalam format PDF untuk informasi lebih detail.",
  },
  {
    id: 4,
    eventKey: 3,
    title: "Bagaimana jika saya ingin informasi lebih tentang  suatu properti?",
    desc: "Anda dapat mengisi formulir permintaan brosur atau formulir kontak yang tersedia di halaman detail proyek atau halaman Contact Us. Tim kami akan segera menghubungi Anda untuk memberikan informasi yang dibutuhkan atau menjadwalkan kunjungan.",
  },
  {
    id: 5,
    eventKey: 4,
    title: "Di mana saja lokasi cabang GadingPro berada?",
    desc: "Kami memiliki berbagai kantor cabang yang tersebar di kota-kota besar di seluruh Indonesia. Anda dapat melihat daftar lengkap alamat, nomor telepon, dan lokasi di Google Maps di halaman 'About' kami untuk menemukan cabang terdekat.",
  },
  {
    id: 6,
    eventKey: 5,
    title: "Apakah GadingPro menyediakan layanan konsultasi KPR?",
    desc: "Meskipun kami tidak menyediakan KPR secara langsung, kami memiliki kalkulator simulasi KPR di halaman Projects kami untuk membantu Anda mendapatkan gambaran awal estimasi cicilan. Kami juga dapat merekomendasikan mitra perbankan terpercaya.",
  },
  {
    id: 7,
    eventKey: 6,
    title: "Properti apa saja yang tersedia di GadingPro?",
    desc: "Kami menawarkan beragam jenis properti seperti Cluster, Perumahan, Apartemen, Townhouse, Kondominium, Estate, dan Studio, dengan berbagai status mulai dari Ready Stock, Launching, Pre-Launching, hingga Under Construction.",
  },
  {
    id: 8,
    eventKey: 7,
    title: "Bagaimana GadingPro memastikan informasi properti akurat?",
    desc: "Kami bekerja sama langsung dengan pengembang terpercaya dan secara berkala memperbarui data properti untuk memastikan informasi yang kami sajikan akurat dan relevan. Tim kami juga melakukan verifikasi data secara berkala.",
  },
];

export const projectByLocation = [
  {
    id: 1,
    name: "Jakarta Premium District",
    city: "Jakarta",
    area: "Jakarta Selatan",
    description: "Hunian mewah di jantung kota dengan akses mudah ke pusat bisnis dan lifestyle center terbaik Jakarta.",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    totalProjects: 12,
    priceRange: "Rp 2.5M - 8M",
    features: ["CBD Access", "MRT Station", "Mall & Cafe", "International School"],
  },
  {
    id: 2,
    name: "Bandung Highland Residence",
    city: "Bandung",
    area: "Bandung Utara",
    description: "Perumahan ekslusif dengan view pegunungan dan udara sejuk khas Kota Kembang yang nyaman untuk keluarga.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    totalProjects: 8,
    priceRange: "Rp 800Jt - 2.5M",
    features: ["Mountain View", "Cool Climate", "Factory Outlets", "Culinary Center"],
  },
  {
    id: 3,
    name: "Surabaya Business Hub",
    city: "Surabaya",
    area: "Surabaya Barat",
    description: "Kawasan berkembang dengan infrastruktur modern, cocok untuk profesional muda dan investor properti.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    totalProjects: 10,
    priceRange: "Rp 600Jt - 1.8M",
    features: ["Business District", "University Area", "Public Transport", "Shopping Center"],
  },
  {
    id: 4,
    name: "Yogyakarta Cultural District",
    city: "Yogyakarta",
    area: "Sleman",
    description: "Hunian modern dengan nuansa budaya Jogja, dekat kampus dan destinasi wisata populer.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    totalProjects: 6,
    priceRange: "Rp 400Jt - 1.2M",
    features: ["Cultural Sites", "Campus Area", "Art District", "Traditional Market"],
  },
  {
    id: 5,
    name: "Medan Garden City",
    city: "Medan",
    area: "Medan Timur",
    description: "Konsep garden city dengan taman luas dan fasilitas lengkap untuk keluarga modern di Sumatera Utara.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    totalProjects: 9,
    priceRange: "Rp 500Jt - 1.5M",
    features: ["Garden Concept", "Family Friendly", "Airport Access", "Culinary Hub"],
  },
  {
    id: 6,
    name: "Semarang Smart City",
    city: "Semarang",
    area: "Semarang Selatan",
    description: "Kawasan smart city dengan teknologi terdepan dan infrastruktur berkelanjutan untuk gaya hidup masa depan.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    totalProjects: 7,
    priceRange: "Rp 450Jt - 1.3M",
    features: ["Smart Technology", "Eco Friendly", "Port Access", "Industrial Zone"],
  }
];

// Array projectsAll dihapus, karena data ini akan diambil dari API.
// export const projectsAll = [...]; 

export const projectCategories = [
  "Semua",
  "Cluster",
  "Perumahan", 
  "Apartemen",
  "Townhouse",
  "Kondominium",
  "Estate",
  "Studio"
];

export const projectLocations = [
  "Semua Lokasi",
  "Jakarta Selatan",
  "Jakarta Pusat", 
  "Jakarta Barat",
  "Bekasi",
  "Tangerang",
  "Tangerang Selatan",
  "Bogor",
  "Depok"
];

export const priceRanges = [
  "Semua Harga",
  "< Rp 1 Miliar",
  "Rp 1 - 2 Miliar", 
  "Rp 2 - 3 Miliar",
  "> Rp 3 Miliar"
];