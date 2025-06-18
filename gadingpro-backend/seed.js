require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// --- Data Dummy Langsung di sini ---
const projectsAll = [
  {
    // id: 1, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Grand Orchid Residence",
    location: "Bekasi, Jawa Barat",
    price: "Rp 850 Juta",
    status: "Ready Stock",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259649/pexels-photo-259649.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    landSize: 84,
    buildingSize: 60,
    facilities: ["Swimming Pool", "Playground", "Security 24/7", "Masjid", "Taman"],
    category: "Cluster",
    type: "Rumah",
    developer: "Orchid Property",
    completionYear: 2024,
    description: "Hunian modern dengan desain minimalis di kawasan strategis Bekasi"
  },
  {
    // id: 2, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Emerald Park Village",
    location: "Tangerang, Banten",
    price: "Rp 1.2 Miliar",
    status: "Launching",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    landSize: 120,
    buildingSize: 90,
    facilities: ["Club House", "Jogging Track", "CCTV", "Posyandu", "Mini Market"],
    category: "Perumahan",
    type: "Rumah",
    developer: "Emerald Developer",
    completionYear: 2025,
    description: "Perumahan premium dengan konsep green living dan fasilitas lengkap"
  },
  {
    // id: 3, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Sunset Heights Apartment",
    location: "Jakarta Selatan, DKI Jakarta",
    price: "Rp 2.5 Miliar",
    status: "Pre-Launching",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    landSize: 0,
    buildingSize: 75,
    facilities: ["Sky Garden", "Gym", "Concierge", "Ballroom", "Business Center"],
    category: "Apartemen",
    type: "Apartemen",
    developer: "Sunset Development",
    completionYear: 2026,
    description: "Apartemen mewah dengan pemandangan kota yang menakjubkan"
  },
  {
    // id: 4, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Pine Valley Townhouse",
    location: "Bogor, Jawa Barat",
    price: "Rp 1.8 Miliar",
    status: "Ready Stock",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 3,
    bathrooms: 3,
    garage: 2,
    landSize: 150,
    buildingSize: 120,
    facilities: ["Private Garden", "Home Automation", "Solar Panel", "Rain Water Harvesting"],
    category: "Townhouse",
    type: "Rumah",
    developer: "Pine Valley Corp",
    completionYear: 2024,
    description: "Townhouse eksklusif dengan teknologi smart home dan konsep eco-friendly"
  },
  {
    // id: 5, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Lotus Garden Residence",
    location: "Depok, Jawa Barat",
    price: "Rp 950 Juta",
    status: "Under Construction",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259649/pexels-photo-259649.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    landSize: 96,
    buildingSize: 72,
    facilities: ["Central Park", "Children Playground", "Klinik", "Food Court", "ATM Center"],
    category: "Cluster",
    type: "Rumah",
    developer: "Lotus Property",
    completionYear: 2025,
    description: "Hunian nyaman dengan akses mudah ke berbagai fasilitas publik"
  },
  {
    // id: 6, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Golden Bay Residence",
    location: "Bekasi, Jawa Barat",
    price: "Rp 1.1 Miliar",
    status: "Ready Stock",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    landSize: 105,
    buildingSize: 85,
    facilities: ["Waterpark", "Tennis Court", "Badminton Court", "Sauna", "Spa"],
    category: "Perumahan",
    type: "Rumah",
    developer: "Golden Developer",
    completionYear: 2024,
    description: "Perumahan mewah dengan fasilitas rekreasi yang lengkap"
  },
  {
    // id: 7, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Azure Sky Condominium",
    location: "Jakarta Pusat, DKI Jakarta",
    price: "Rp 3.2 Miliar",
    status: "Launching",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 3,
    bathrooms: 2,
    garage: 1,
    landSize: 0,
    buildingSize: 120,
    facilities: ["Infinity Pool", "Sky Lounge", "Valet Parking", "Private Lift", "Wine Cellar"],
    category: "Kondominium",
    type: "Apartemen",
    developer: "Azure Development",
    completionYear: 2026,
    description: "Kondominium super premium dengan layanan hotel berbintang lima"
  },
  {
    // id: 8, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Harmony Hills Estate",
    location: "Tangerang Selatan, Banten",
    price: "Rp 1.6 Miliar",
    status: "Pre-Launching",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    landSize: 200,
    buildingSize: 150,
    facilities: ["Golf Course", "Horse Riding", "Lake View", "Helipad", "Wine Tasting Room"],
    category: "Estate",
    type: "Rumah",
    developer: "Harmony Group",
    completionYear: 2027,
    description: "Estate mewah dengan pemandangan danau dan fasilitas rekreasi eksklusif"
  },
  {
    // id: 9, // <<< HAPUS PROPERTI ID NUMERIK INI
    name: "Urban Loft Studios",
    location: "Jakarta Barat, DKI Jakarta",
    price: "Rp 750 Juta",
    status: "Ready Stock",
    brochureLink: "/assets/brochures/modern-home.pdf",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    bedrooms: 1,
    bathrooms: 1,
    garage: 1,
    landSize: 0,
    buildingSize: 45,
    facilities: ["Co-working Space", "Rooftop Garden", "Coffee Shop", "Art Gallery", "Music Studio"],
    category: "Studio",
    type: "Apartemen",
    developer: "Urban Living Co",
    completionYear: 2024,
    description: "Studio apartment modern untuk young professional dengan gaya hidup urban"
  }
];

const branches = [
  {
    // id: 1, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Jakarta",
    name: "Head Office Jakarta",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    phone: "+62 21 1234 5678",
    instagram: "https://instagram.com/ourcompany_jakarta",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+123,+Jakarta+Pusat"
  },
  {
    // id: 2, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Bandung",
    name: "Branch Office Bandung",
    address: "Jl. Dago No. 45, Bandung",
    phone: "+62 22 1234 5678",
    instagram: "https://instagram.com/ourcompany_bandung",
    googleMaps: "https://maps.google.com/?q=Jl.+Dago+No.+45,+Bandung"
  },
  {
    // id: 3, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Surabaya",
    name: "Branch Office Surabaya",
    address: "Jl. Pemuda No. 67, Surabaya",
    phone: "+62 31 1234 5678",
    instagram: "https://instagram.com/ourcompany_surabaya",
    googleMaps: "https://maps.google.com/?q=Jl.+Pemuda+No.+67,+Surabaya"
  },
  {
    // id: 4, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Yogyakarta",
    name: "Branch Office Yogyakarta",
    address: "Jl. Malioboro No. 89, Yogyakarta",
    phone: "+62 274 1234 567",
    instagram: "https://instagram.com/ourcompany_yogya",
    googleMaps: "https://maps.google.com/?q=Jl.+Malioboro+No.+89,+Yogyakarta"
  },
  {
    // id: 5, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Medan",
    name: "Branch Office Medan",
    address: "Jl. Gatot Subroto No. 12, Medan",
    phone: "+62 61 1234 5678",
    instagram: "https://instagram.com/ourcompany_medan",
    googleMaps: "https://maps.google.com/?q=Jl.+Gatot+Subroto+No.+12,+Medan"
  },
  {
    // id: 6, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Semarang",
    name: "Branch Office Semarang",
    address: "Jl. Pandanaran No. 56, Semarang",
    phone: "+62 24 1234 5678",
    instagram: "https://instagram.com/ourcompany_semarang",
    googleMaps: "https://maps.google.com/?q=Jl.+Pandanaran+No.+56,+Semarang"
  },
  {
    // id: 7, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Palembang",
    name: "Branch Office Palembang",
    address: "Jl. Sudirman No. 78, Palembang",
    phone: "+62 711 1234 567",
    instagram: "https://instagram.com/ourcompany_palembang",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+78,+Palembang"
  },
  {
    // id: 8, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Balikpapan",
    name: "Branch Office Balikpapan",
    address: "Jl. Ahmad Yani No. 90, Balikpapan",
    phone: "+62 542 1234 567",
    instagram: "https://instagram.com/ourcompany_balikpapan",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+90,+Balikpapan"
  },
  {
    // id: 9, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Pontianak",
    name: "Branch Office Pontianak",
    address: "Jl. Gajah Mada No. 12, Pontianak",
    phone: "+62 561 1234 567",
    instagram: "https://instagram.com/ourcompany_pontianak",
    googleMaps: "https://maps.google.com/?q=Jl.+Gajah+Mada+No.+12,+Pontianak"
  },
  {
    // id: 10, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Banjarmasin",
    name: "Branch Office Banjarmasin",
    address: "Jl. Lambung Mangkurat No. 34, Banjarmasin",
    phone: "+62 511 1234 567",
    instagram: "https://instagram.com/ourcompany_banjarmasin",
    googleMaps: "https://maps.google.com/?q=Jl.+Lambung+Mangkurat+No.+34,+Banjarmasin"
  },
  {
    // id: 11, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Pekanbaru",
    name: "Branch Office Pekanbaru",
    address: "Jl. Sudirman No. 56, Pekanbaru",
    phone: "+62 761 1234 567",
    instagram: "https://instagram.com/ourcompany_pekanbaru",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+56,+Pekanbaru"
  },
  {
    // id: 12, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Padang",
    name: "Branch Office Padang",
    address: "Jl. Proklamasi No. 78, Padang",
    phone: "+62 751 1234 567",
    instagram: "https://instagram.com/ourcompany_padang",
    googleMaps: "https://maps.google.com/?q=Jl.+Proklamasi+No.+78,+Padang"
  },
  {
    // id: 13, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Jambi",
    name: "Branch Office Jambi",
    address: "Jl. Gatot Subroto No. 90, Jambi",
    phone: "+62 741 1234 567",
    instagram: "https://instagram.com/ourcompany_jambi",
    googleMaps: "https://maps.google.com/?q=Jl.+Gatot+Subroto+No.+90,+Jambi"
  },
  {
    // id: 14, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Lampung",
    name: "Branch Office Lampung",
    address: "Jl. Zainal Abidin No. 12, Bandar Lampung",
    phone: "+62 721 1234 567",
    instagram: "https://instagram.com/ourcompany_lampung",
    googleMaps: "https://maps.google.com/?q=Jl.+Zainal+Abidin+No.+12,+Bandar+Lampung"
  },
  {
    // id: 15, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Bengkulu",
    name: "Branch Office Bengkulu",
    address: "Jl. Sudirman No. 34, Bengkulu",
    phone: "+62 736 1234 567",
    instagram: "https://instagram.com/ourcompany_bengkulu",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+34,+Bengkulu"
  },
  {
    // id: 16, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Denpasar",
    name: "Branch Office Denpasar",
    address: "Jl. Gajah Mada No. 56, Denpasar",
    phone: "+62 361 1234 567",
    instagram: "https://instagram.com/ourcompany_denpasar",
    googleMaps: "https://maps.google.com/?q=Jl.+Gajah+Mada+No.+56,+Denpasar"
  },
  {
    // id: 17, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Mataram",
    name: "Branch Office Mataram",
    address: "Jl. Pejanggik No. 78, Mataram",
    phone: "+62 370 1234 567",
    instagram: "https://instagram.com/ourcompany_mataram",
    googleMaps: "https://maps.google.com/?q=Jl.+Pejanggik+No.+78,+Mataram"
  },
  {
    // id: 18, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Kupang",
    name: "Branch Office Kupang",
    address: "Jl. Timor Raya No. 90, Kupang",
    phone: "+62 380 1234 567",
    instagram: "https://instagram.com/ourcompany_kupang",
    googleMaps: "https://maps.google.com/?q=Jl.+Timor+Raya+No.+90,+Kupang"
  },
  {
    // id: 19, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Ambon",
    name: "Branch Office Ambon",
    address: "Jl. Pattimura No. 12, Ambon",
    phone: "+62 911 1234 567",
    instagram: "https://instagram.com/ourcompany_ambon",
    googleMaps: "https://maps.google.com/?q=Jl.+Pattimura+No.+12,+Ambon"
  },
  {
    // id: 20, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Jayapura",
    name: "Branch Office Jayapura",
    address: "Jl. Ahmad Yani No. 34, Jayapura",
    phone: "+62 967 1234 567",
    instagram: "https://instagram.com/ourcompany_jayapura",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+34,+Jayapura"
  },
  {
    // id: 21, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Manado",
    name: "Branch Office Manado",
    address: "Jl. Sam Ratulangi No. 56, Manado",
    phone: "+62 431 1234 567",
    instagram: "https://instagram.com/ourcompany_manado",
    googleMaps: "https://maps.google.com/?q=Jl.+Sam+Ratulangi+No.+56,+Manado"
  },
  {
    // id: 22, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Palu",
    name: "Branch Office Palu",
    address: "Jl. Tadulako No. 78, Palu",
    phone: "+62 451 1234 567",
    instagram: "https://instagram.com/ourcompany_palu",
    googleMaps: "https://maps.google.com/?q=Jl.+Tadulako+No.+78,+Palu"
  },
  {
    // id: 23, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Kendari",
    name: "Branch Office Kendari",
    address: "Jl. Diponegoro No. 90, Kendari",
    phone: "+62 401 1234 567",
    instagram: "https://instagram.com/ourcompany_kendari",
    googleMaps: "https://maps.google.com/?q=Jl.+Diponegoro+No.+90,+Kendari"
  },
  {
    // id: 24, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Gorontalo",
    name: "Branch Office Gorontalo",
    address: "Jl. Jenderal Sudirman No. 12, Gorontalo",
    phone: "+62 435 1234 567",
    instagram: "https://instagram.com/ourcompany_gorontalo",
    googleMaps: "https://maps.google.com/?q=Jl.+Jenderal+Sudirman+No.+12,+Gorontalo"
  },
  {
    // id: 25, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Mamuju",
    name: "Branch Office Mamuju",
    address: "Jl. Trans Sulawesi No. 34, Mamuju",
    phone: "+62 426 1234 567",
    instagram: "https://instagram.com/ourcompany_mamuju",
    googleMaps: "https://maps.google.com/?q=Jl.+Trans+Sulawesi+No.+34,+Mamuju"
  },
  {
    // id: 26, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Samarinda",
    name: "Branch Office Samarinda",
    address: "Jl. Mulawarman No. 56, Samarinda",
    phone: "+62 541 1234 567",
    instagram: "https://instagram.com/ourcompany_samarinda",
    googleMaps: "https://maps.google.com/?q=Jl.+Mulawarman+No.+56,+Samarinda"
  },
  {
    // id: 27, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Tarakan",
    name: "Branch Office Tarakan",
    address: "Jl. Yos Sudarso No. 78, Tarakan",
    phone: "+62 551 1234 567",
    instagram: "https://instagram.com/ourcompany_tarakan",
    googleMaps: "https://maps.google.com/?q=Jl.+Yos+Sudarso+No.+78,+Tarakan"
  },
  {
    // id: 28, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Pangkalpinang",
    name: "Branch Office Pangkalpinang",
    address: "Jl. Jenderal Sudirman No. 90, Pangkalpinang",
    phone: "+62 717 1234 567",
    instagram: "https://instagram.com/ourcompany_pangkalpinang",
    googleMaps: "https://maps.google.com/?q=Jl.+Jenderal+Sudirman+No.+90,+Pangkalpinang"
  },
  {
    // id: 29, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Tanjung Pinang",
    name: "Branch Office Tanjung Pinang",
    address: "Jl. Diponegoro No. 12, Tanjung Pinang",
    phone: "+62 771 1234 567",
    instagram: "https://instagram.com/ourcompany_tanjungpinang",
    googleMaps: "https://maps.google.com/?q=Jl.+Diponegoro+No.+12,+Tanjung+Pinang"
  },
  {
    // id: 30, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Serang",
    name: "Branch Office Serang",
    address: "Jl. Raya Jakarta No. 34, Serang",
    phone: "+62 254 1234 567",
    instagram: "https://instagram.com/ourcompany_serang",
    googleMaps: "https://maps.google.com/?q=Jl.+Raya+Jakarta+No.+34,+Serang"
  },
  {
    // id: 31, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Cilegon",
    name: "Branch Office Cilegon",
    address: "Jl. Raya Anyer No. 56, Cilegon",
    phone: "+62 254 1234 890",
    instagram: "https://instagram.com/ourcompany_cilegon",
    googleMaps: "https://maps.google.com/?q=Jl.+Raya+Anyer+No.+56,+Cilegon"
  },
  {
    // id: 32, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Bekasi",
    name: "Branch Office Bekasi",
    address: "Jl. Ahmad Yani No. 78, Bekasi",
    phone: "+62 21 1234 9012",
    instagram: "https://instagram.com/ourcompany_bekasi",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+78,+Bekasi"
  },
  {
    // id: 33, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Depok",
    name: "Branch Office Depok",
    address: "Jl. Margonda Raya No. 90, Depok",
    phone: "+62 21 1234 3456",
    instagram: "https://instagram.com/ourcompany_depok",
    googleMaps: "https://maps.google.com/?q=Jl.+Margonda+Raya+No.+90,+Depok"
  },
  {
    // id: 34, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Tangerang",
    name: "Branch Office Tangerang",
    address: "Jl. Sudirman No. 12, Tangerang",
    phone: "+62 21 1234 7890",
    instagram: "https://instagram.com/ourcompany_tangerang",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+12,+Tangerang"
  },
  {
    // id: 35, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Bogor",
    name: "Branch Office Bogor",
    address: "Jl. Pajajaran No. 34, Bogor",
    phone: "+62 251 1234 567",
    instagram: "https://instagram.com/ourcompany_bogor",
    googleMaps: "https://maps.google.com/?q=Jl.+Pajajaran+No.+34,+Bogor"
  },
  {
    // id: 36, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Cirebon",
    name: "Branch Office Cirebon",
    address: "Jl. Siliwangi No. 56, Cirebon",
    phone: "+62 231 1234 567",
    instagram: "https://instagram.com/ourcompany_cirebon",
    googleMaps: "https://maps.google.com/?q=Jl.+Siliwangi+No.+56,+Cirebon"
  },
  {
    // id: 37, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Tasikmalaya",
    name: "Branch Office Tasikmalaya",
    address: "Jl. Asia Afrika No. 78, Tasikmalaya",
    phone: "+62 265 1234 567",
    instagram: "https://instagram.com/ourcompany_tasikmalaya",
    googleMaps: "https://maps.google.com/?q=Jl.+Asia+Afrika+No.+78,+Tasikmalaya"
  },
  {
    // id: 38, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Sukabumi",
    name: "Branch Office Sukabumi",
    address: "Jl. Ahmad Yani No. 90, Sukabumi",
    phone: "+62 266 1234 567",
    instagram: "https://instagram.com/ourcompany_sukabumi",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+90,+Sukabumi"
  },
  {
    // id: 39, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Purwokerto",
    name: "Branch Office Purwokerto",
    address: "Jl. Jenderal Sudirman No. 12, Purwokerto",
    phone: "+62 281 1234 567",
    instagram: "https://instagram.com/ourcompany_purwokerto",
    googleMaps: "https://maps.google.com/?q=Jl.+Jenderal+Sudirman+No.+12,+Purwokerto"
  },
  {
    // id: 40, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Tegal",
    name: "Branch Office Tegal",
    address: "Jl. Pancasila No. 34, Tegal",
    phone: "+62 283 1234 567",
    instagram: "https://instagram.com/ourcompany_tegal",
    googleMaps: "https://maps.google.com/?q=Jl.+Pancasila+No.+34,+Tegal"
  },
  {
    // id: 41, // <<< HAPUS PROPERTI ID NUMERIK INI
    city: "Pekalongan",
    name: "Branch Office Pekalongan",
    address: "Jl. Hayam Wuruk No. 56, Pekalongan",
    phone: "+62 285 1234 567",
    instagram: "https://instagram.com/ourcompany_pekalongan",
    googleMaps: "https://maps.google.com/?q=Jl.+Hayam+Wuruk+No.+56,+Pekalongan"
  }
];
// --- Akhir Data Dummy ---

const MONGODB_URI = process.env.MONGODB_URI;

// Define Schemas and Models (must be the same as in server.js)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
    // id: { type: Number, required: true, unique: true }, // <<< INI DIHAPUS
    name: String,
    location: String,
    price: String,
    status: String,
    brochureLink: String,
    image: String,
    images: [String],
    bedrooms: Number,
    bathrooms: Number,
    garage: Number,
    landSize: Number,
    buildingSize: Number,
    facilities: [String],
    category: String,
    type: String,
    developer: String,
    completionYear: Number,
    description: String,
    features: Object
});
const Project = mongoose.model('Project', projectSchema);

// Branch Schema
const branchSchema = new mongoose.Schema({
    // id: { type: Number, required: true, unique: true }, // <<< INI DIHAPUS
    city: String,
    name: String,
    address: String,
    phone: String,
    instagram: String,
    googleMaps: String
});
const Branch = mongoose.model('Branch', branchSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected for Seeding!');

    console.log('Clearing existing Projects...');
    await Project.deleteMany({});
    console.log('Clearing existing Branches...');
    await Branch.deleteMany({});

    console.log('Inserting new Projects...');
    // Menghapus 'id' numerik dari objek sebelum dimasukkan
    const projectsToInsert = projectsAll.map(({ id, ...rest }) => rest);
    await Project.insertMany(projectsToInsert);
    console.log(`${projectsToInsert.length} Projects inserted.`);

    console.log('Inserting new Branches...');
    // Menghapus 'id' numerik dari objek sebelum dimasukkan
    const branchesToInsert = branches.map(({ id, ...rest }) => rest);
    await Branch.insertMany(branchesToInsert);
    console.log(`${branchesToInsert.length} Branches inserted.`);

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Database seeding error:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

seedDatabase();