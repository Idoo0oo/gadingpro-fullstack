// gadingpro-backend/seed.js (REVISI FINAL DENGAN 12 PROYEK)
require('dotenv').config();
const sequelize = require('./config/database');
const Project = require('./models/Project');
const UnitType = require('./models/UnitType');
const Branch = require('./models/Branch');
const User = require('./models/User');
const Inquiry = require('./models/Inquiry');

// Relasi antar model
Project.hasMany(UnitType, { foreignKey: 'projectId', as: 'unitTypes' });
UnitType.belongsTo(Project, { foreignKey: 'projectId' });

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized. All tables were dropped and recreated.');

    // 1. Buat User Admin
    const adminUser = await User.create({
        username: 'admin',
        password: 'admin123',
        phone: '081234567890',
    });
    console.log('Admin user created successfully.');

    // 2. Data 12 Proyek dan Tipe Unit-nya
    const projectsWithUnits = [
      { // Proyek 1
        project: {
          name: "Serpong Garden Residence", developer: "PT Properti Jaya Abadi", location: "Serpong, Tangerang Selatan",
          googleMapsUrl: "https://maps.app.goo.gl/example1", status: "Launching", brochureLink: "/assets/brochures/modern-home.pdf",
          image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: ["https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg", "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg", "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"],
          promo: "Diskon DP 10% dan bonus kanopi untuk 20 pembeli pertama!",
          nearbyLocations: { "Gerbang Tol": "5 menit ke Gerbang Tol Serpong", "Pusat Perbelanjaan": "10 menit ke AEON Mall BSD", "Stasiun": "7 menit ke Stasiun Cisauk", "Rumah Sakit": "12 menit ke Eka Hospital" },
          description: "Kawasan hunian modern di Serpong dengan konsep 'green living'. Menawarkan keseimbangan antara kehidupan kota yang dinamis dan ketenangan alam.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Canna", price: 850000000, bedrooms: 2, bathrooms: 2, garage: 1, landSize: 60, buildingSize: 55, images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"], specifications: { Pondasi: "Beton Bertulang", Dinding: "Bata Ringan", Plafon: "Gypsum", Lantai: "Keramik 40x40" } },
          { name: "Tipe Belladonna", price: 1200000000, bedrooms: 3, bathrooms: 2, garage: 2, landSize: 72, buildingSize: 68, images: ["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"], specifications: { Pondasi: "Beton Bertulang", Dinding: "Bata Merah", Plafon: "Gypsum & GRC", Lantai: "Granit 60x60" } },
          { name: "Tipe Amaryllis", price: 1500000000, bedrooms: 4, bathrooms: 3, garage: 2, landSize: 90, buildingSize: 85, images: ["https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg"], specifications: { Pondasi: "Tiang Pancang", Dinding: "Bata Merah Plester Aci", Plafon: "PVC Drop Ceiling", Lantai: "Marmer" } },
        ]
      },
      { // Proyek 2
        project: {
          name: "Grand Galaxy City", developer: "Agung Sedayu Group", location: "Bekasi, Jawa Barat",
          googleMapsUrl: "https://maps.app.goo.gl/example2", status: "Ready Stock", brochureLink: "/assets/brochures/modern-home.pdf",
          image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: ["https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg", "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg"],
          promo: "Free BPHTB dan Biaya KPR. Unit siap huni!",
          nearbyLocations: { "Pusat Perbelanjaan": "3 menit ke Mall Grand Galaxy Park", "Rumah Sakit": "5 menit ke RS Hermina Galaxy", "Sekolah": "Dekat dengan Sekolah Tunas Jakasampurna" },
          description: "Sebuah kota mandiri yang terintegrasi dengan berbagai fasilitas komersial, hiburan, dan pendidikan di jantung kota Bekasi.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Amethyst", price: 1100000000, bedrooms: 3, bathrooms: 2, garage: 1, landSize: 84, buildingSize: 70, images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"], specifications: { Dinding: "Bata Plester Aci", Atap: "Rangka Baja Ringan", Sanitasi: "TOTO" } },
          { name: "Tipe Sapphire", price: 1600000000, bedrooms: 4, bathrooms: 3, garage: 2, landSize: 105, buildingSize: 90, images: ["https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"], specifications: { Dinding: "Bata Merah", Atap: "Rangka Baja Ringan", Sanitasi: "TOTO/Setara" } },
        ]
      },
      { // Proyek 3
        project: {
          name: "The Royal Residence", developer: "Sinarmas Land", location: "Jakarta Selatan, DKI Jakarta",
          googleMapsUrl: "https://maps.app.goo.gl/example3", status: "Pre-Launching", brochureLink: "/assets/brochures/modern-home.pdf",
          image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: ["https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg"],
          promo: "Early Bird Price! Dapatkan harga perdana khusus masa Pre-Launching.",
          nearbyLocations: { "Pusat Perbelanjaan": "15 menit ke Pondok Indah Mall", "Bandara": "45 menit ke Soekarno-Hatta", "Sekolah": "Dekat Jakarta Intercultural School" },
          description: "Hunian vertikal mewah yang menawarkan privasi dan kemewahan di lokasi paling premium di Jakarta Selatan.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Crown (2BR)", price: 3200000000, bedrooms: 2, bathrooms: 2, garage: 1, landSize: 0, buildingSize: 98, images: ["https://images.pexels.com/photos/6585756/pexels-photo-6585756.jpeg"], specifications: { Lantai: "Marmer Italia", Dapur: "Full Set by Bosch", AC: "Central Daikin" } },
          { name: "Tipe Imperial (3BR)", price: 4500000000, bedrooms: 3, bathrooms: 3, garage: 2, landSize: 0, buildingSize: 145, images: ["https://images.pexels.com/photos/6585767/pexels-photo-6585767.jpeg"], specifications: { Lantai: "Marmer Italia", Dapur: "Full Set by Miele", AC: "Central Daikin VRV" } },
        ]
      },
      { // Proyek 4
        project: {
          name: "Sentul Paradise Park", developer: "PT Sentul City Tbk", location: "Bogor, Jawa Barat",
          googleMapsUrl: "https://maps.app.goo.gl/example4", status: "Under Construction",
          image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], promo: "Cicilan DP 0% hingga 12x.",
          nearbyLocations: { "Gerbang Tol": "10 menit ke Tol Jagorawi", "Pusat Perbelanjaan": "5 menit ke AEON Mall Sentul City", "Wisata": "Dekat JungleLand Adventure Theme Park" },
          description: "Nikmati hidup berkualitas dengan udara sejuk dan pemandangan pegunungan. Kawasan terpadu dengan fasilitas rekreasi dan gaya hidup.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Edelweiss", price: 980000000, bedrooms: 2, bathrooms: 1, garage: 1, landSize: 72, buildingSize: 60, images: [], specifications: { Atap: "Genteng Beton", Kusen: "Aluminium" } },
          { name: "Tipe Bougenville", price: 1350000000, bedrooms: 3, bathrooms: 2, garage: 2, landSize: 90, buildingSize: 80, images: [], specifications: { Atap: "Genteng Beton Flat", Kusen: "Aluminium" } },
        ]
      },
       { // Proyek 5
        project: {
          name: "Citra Lake Depok", developer: "Ciputra Group", location: "Depok, Jawa Barat",
          googleMapsUrl: "https://maps.app.goo.gl/example5", status: "Ready Stock",
          image: "https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Hunian dengan pemandangan danau yang menenangkan, menciptakan suasana liburan setiap hari.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Azure", price: 780000000, bedrooms: 2, bathrooms: 1, garage: 1, landSize: 60, buildingSize: 45, images: [], specifications: {} },
          { name: "Tipe Emerald", price: 1050000000, bedrooms: 3, bathrooms: 2, garage: 1, landSize: 72, buildingSize: 62, images: [], specifications: {} },
        ]
      },
      { // Proyek 6
        project: {
          name: "Puri Mansion Apartment", developer: "Agung Podomoro Land", location: "Jakarta Barat, DKI Jakarta",
          googleMapsUrl: "https://maps.app.goo.gl/example6", status: "Ready Stock",
          image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Apartemen mewah dengan 51 fasilitas outdoor & indoor, berlokasi strategis di Jakarta Barat.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Studio", price: 600000000, bedrooms: 1, bathrooms: 1, garage: 0, landSize: 0, buildingSize: 26, images: [], specifications: {} },
          { name: "Tipe 2BR", price: 1250000000, bedrooms: 2, bathrooms: 1, garage: 0, landSize: 0, buildingSize: 49, images: [], specifications: {} },
          { name: "Tipe 3BR", price: 1800000000, bedrooms: 3, bathrooms: 2, garage: 0, landSize: 0, buildingSize: 68, images: [], specifications: {} },
        ]
      },
      { // Proyek 7
        project: {
          name: "Alam Sutera - Cluster Sutera Winona", developer: "Alam Sutera Realty", location: "Tangerang, Banten",
          googleMapsUrl: "https://maps.app.goo.gl/example7", status: "Launching",
          image: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Cluster mewah terbaru di Alam Sutera dengan desain American Classic yang megah dan elegan.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Alder", price: 6000000000, bedrooms: 4, bathrooms: 4, garage: 2, landSize: 200, buildingSize: 250, images: [], specifications: {} },
          { name: "Tipe Laurel", price: 8500000000, bedrooms: 5, bathrooms: 5, garage: 3, landSize: 250, buildingSize: 320, images: [], specifications: {} },
        ]
      },
       { // Proyek 8
        project: {
          name: "Summarecon Bekasi - The SpringLake", developer: "Summarecon Agung", location: "Bekasi, Jawa Barat",
          googleMapsUrl: "https://maps.app.goo.gl/example8", status: "Ready Stock",
          image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Apartemen modern yang terhubung langsung dengan Summarecon Mall Bekasi melalui skybridge.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe 1BR", price: 550000000, bedrooms: 1, bathrooms: 1, garage: 0, landSize: 0, buildingSize: 32, images: [], specifications: {} },
          { name: "Tipe 2BR", price: 820000000, bedrooms: 2, bathrooms: 1, garage: 0, landSize: 0, buildingSize: 45, images: [], specifications: {} },
        ]
      },
       { // Proyek 9
        project: {
          name: "Menteng Park Apartment", developer: "Agung Sedayu Group", location: "Jakarta Pusat, DKI Jakarta",
          googleMapsUrl: "https://maps.app.goo.gl/example9", status: "Sold Out",
          image: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Hunian eksklusif di Cikini, Jakarta Pusat, dengan konsep Diamond in the City.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Sapphire", price: 1500000000, bedrooms: 1, bathrooms: 1, garage: 0, landSize: 0, buildingSize: 33, images: [], specifications: {} },
          { name: "Tipe Diamond", price: 2500000000, bedrooms: 2, bathrooms: 2, garage: 0, landSize: 0, buildingSize: 60, images: [], specifications: {} },
        ]
      },
       { // Proyek 10
        project: {
          name: "Rancamaya Golf Estate", developer: "PT Suryamas Dutamakmur Tbk", location: "Bogor, Jawa Barat",
          googleMapsUrl: "https://maps.app.goo.gl/example10", status: "Ready Stock",
          image: "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Kawasan hunian premium dengan lapangan golf internasional dan pemandangan Gunung Salak.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Amadeus", price: 2100000000, bedrooms: 3, bathrooms: 2, garage: 2, landSize: 200, buildingSize: 150, images: [], specifications: {} },
          { name: "Tipe Salvador", price: 3500000000, bedrooms: 4, bathrooms: 3, garage: 2, landSize: 300, buildingSize: 220, images: [], specifications: {} },
        ]
      },
      { // Proyek 11
        project: {
          name: "The Zora - BSD City", developer: "Sinar Mas Land & Mitsubishi Corp", location: "BSD City, Tangerang",
          googleMapsUrl: "https://maps.app.goo.gl/example11", status: "Launching",
          image: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Hunian mewah berkonsep 'Beauty of Balance' yang memadukan desain, fasilitas, dan teknologi Jepang.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe Kiyomi", price: 7000000000, bedrooms: 4, bathrooms: 4, garage: 2, landSize: 220, buildingSize: 300, images: [], specifications: {} },
          { name: "Tipe Kazumi", price: 9000000000, bedrooms: 5, bathrooms: 5, garage: 3, landSize: 280, buildingSize: 380, images: [], specifications: {} },
        ]
      },
      { // Proyek 12
        project: {
          name: "Gold Coast Apartment PIK", developer: "Agung Sedayu Group", location: "Jakarta Utara, DKI Jakarta",
          googleMapsUrl: "https://maps.app.goo.gl/example12", status: "Ready Stock",
          image: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=800",
          images: [], description: "Apartemen tepi laut di Pantai Indah Kapuk dengan pemandangan laut lepas dan akses langsung ke kawasan PIK.",
          creatorId: adminUser.id,
        },
        units: [
          { name: "Tipe 2BR Sea View", price: 2800000000, bedrooms: 2, bathrooms: 2, garage: 0, landSize: 0, buildingSize: 90, images: [], specifications: {} },
          { name: "Tipe 3BR Ocean View", price: 4200000000, bedrooms: 3, bathrooms: 2, garage: 0, landSize: 0, buildingSize: 120, images: [], specifications: {} },
        ]
      }
    ];

    // Proses dan masukkan data proyek & unit
    for (const item of projectsWithUnits) {
      const prices = item.units.map(u => u.price);
      item.project.priceMin = Math.min(...prices);
      item.project.priceMax = Math.max(...prices);

      const createdProject = await Project.create(item.project);
      
      const unitsToCreate = item.units.map(unit => ({ ...unit, projectId: createdProject.id }));
      await UnitType.bulkCreate(unitsToCreate);
    }
    console.log(`${projectsWithUnits.length} projects with their units have been inserted.`);

    // 3. Data Cabang
    const branches = [
  {
    city: "Jakarta",
    name: "Head Office Jakarta",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    phone: "+62 21 1234 5678",
    instagram: "https://instagram.com/ourcompany_jakarta",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+123,+Jakarta+Pusat"
  },
  {
    city: "Bandung",
    name: "Branch Office Bandung",
    address: "Jl. Dago No. 45, Bandung",
    phone: "+62 22 1234 5678",
    instagram: "https://instagram.com/ourcompany_bandung",
    googleMaps: "https://maps.google.com/?q=Jl.+Dago+No.+45,+Bandung"
  },
  {
    city: "Surabaya",
    name: "Branch Office Surabaya",
    address: "Jl. Pemuda No. 67, Surabaya",
    phone: "+62 31 1234 5678",
    instagram: "https://instagram.com/ourcompany_surabaya",
    googleMaps: "https://maps.google.com/?q=Jl.+Pemuda+No.+67,+Surabaya"
  },
  {
    city: "Yogyakarta",
    name: "Branch Office Yogyakarta",
    address: "Jl. Malioboro No. 89, Yogyakarta",
    phone: "+62 274 1234 567",
    instagram: "https://instagram.com/ourcompany_yogya",
    googleMaps: "https://maps.google.com/?q=Jl.+Malioboro+No.+89,+Yogyakarta"
  },
  {
    city: "Medan",
    name: "Branch Office Medan",
    address: "Jl. Gatot Subroto No. 12, Medan",
    phone: "+62 61 1234 5678",
    instagram: "https://instagram.com/ourcompany_medan",
    googleMaps: "https://maps.google.com/?q=Jl.+Gatot+Subroto+No.+12,+Medan"
  },
  {
    city: "Semarang",
    name: "Branch Office Semarang",
    address: "Jl. Pandanaran No. 56, Semarang",
    phone: "+62 24 1234 5678",
    instagram: "https://instagram.com/ourcompany_semarang",
    googleMaps: "https://maps.google.com/?q=Jl.+Pandanaran+No.+56,+Semarang"
  },
  {
    city: "Palembang",
    name: "Branch Office Palembang",
    address: "Jl. Sudirman No. 78, Palembang",
    phone: "+62 711 1234 567",
    instagram: "https://instagram.com/ourcompany_palembang",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+78,+Palembang"
  },
  {
    city: "Balikpapan",
    name: "Branch Office Balikpapan",
    address: "Jl. Ahmad Yani No. 90, Balikpapan",
    phone: "+62 542 1234 567",
    instagram: "https://instagram.com/ourcompany_balikpapan",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+90,+Balikpapan"
  },
  {
    city: "Pontianak",
    name: "Branch Office Pontianak",
    address: "Jl. Gajah Mada No. 12, Pontianak",
    phone: "+62 561 1234 567",
    instagram: "https://instagram.com/ourcompany_pontianak",
    googleMaps: "https://maps.google.com/?q=Jl.+Gajah+Mada+No.+12,+Pontianak"
  },
  {
    city: "Banjarmasin",
    name: "Branch Office Banjarmasin",
    address: "Jl. Lambung Mangkurat No. 34, Banjarmasin",
    phone: "+62 511 1234 567",
    instagram: "https://instagram.com/ourcompany_banjarmasin",
    googleMaps: "https://maps.google.com/?q=Jl.+Lambung+Mangkurat+No.+34,+Banjarmasin"
  },
  {
    city: "Pekanbaru",
    name: "Branch Office Pekanbaru",
    address: "Jl. Sudirman No. 56, Pekanbaru",
    phone: "+62 761 1234 567",
    instagram: "https://instagram.com/ourcompany_pekanbaru",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+56,+Pekanbaru"
  },
  {
    city: "Padang",
    name: "Branch Office Padang",
    address: "Jl. Proklamasi No. 78, Padang",
    phone: "+62 751 1234 567",
    instagram: "https://instagram.com/ourcompany_padang",
    googleMaps: "https://maps.google.com/?q=Jl.+Proklamasi+No.+78,+Padang"
  },
  {
    city: "Jambi",
    name: "Branch Office Jambi",
    address: "Jl. Gatot Subroto No. 90, Jambi",
    phone: "+62 741 1234 567",
    instagram: "https://instagram.com/ourcompany_jambi",
    googleMaps: "https://maps.google.com/?q=Jl.+Gatot+Subroto+No.+90,+Jambi"
  },
  {
    city: "Lampung",
    name: "Branch Office Lampung",
    address: "Jl. Zainal Abidin No. 12, Bandar Lampung",
    phone: "+62 721 1234 567",
    instagram: "https://instagram.com/ourcompany_lampung",
    googleMaps: "https://maps.google.com/?q=Jl.+Zainal+Abidin+No.+12,+Bandar+Lampung"
  },
  {
    city: "Bengkulu",
    name: "Branch Office Bengkulu",
    address: "Jl. Sudirman No. 34, Bengkulu",
    phone: "+62 736 1234 567",
    instagram: "https://instagram.com/ourcompany_bengkulu",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+34,+Bengkulu"
  },
  {
    city: "Denpasar",
    name: "Branch Office Denpasar",
    address: "Jl. Gajah Mada No. 56, Denpasar",
    phone: "+62 361 1234 567",
    instagram: "https://instagram.com/ourcompany_denpasar",
    googleMaps: "https://maps.google.com/?q=Jl.+Gajah+Mada+No.+56,+Denpasar"
  },
  {
    city: "Mataram",
    name: "Branch Office Mataram",
    address: "Jl. Pejanggik No. 78, Mataram",
    phone: "+62 370 1234 567",
    instagram: "https://instagram.com/ourcompany_mataram",
    googleMaps: "https://maps.google.com/?q=Jl.+Pejanggik+No.+78,+Mataram"
  },
  {
    city: "Kupang",
    name: "Branch Office Kupang",
    address: "Jl. Timor Raya No. 90, Kupang",
    phone: "+62 380 1234 567",
    instagram: "https://instagram.com/ourcompany_kupang",
    googleMaps: "https://maps.google.com/?q=Jl.+Timor+Raya+No.+90,+Kupang"
  },
  {
    city: "Ambon",
    name: "Branch Office Ambon",
    address: "Jl. Pattimura No. 12, Ambon",
    phone: "+62 911 1234 567",
    instagram: "https://instagram.com/ourcompany_ambon",
    googleMaps: "https://maps.google.com/?q=Jl.+Pattimura+No.+12,+Ambon"
  },
  {
    city: "Jayapura",
    name: "Branch Office Jayapura",
    address: "Jl. Ahmad Yani No. 34, Jayapura",
    phone: "+62 967 1234 567",
    instagram: "https://instagram.com/ourcompany_jayapura",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+34,+Jayapura"
  },
  {
    city: "Manado",
    name: "Branch Office Manado",
    address: "Jl. Sam Ratulangi No. 56, Manado",
    phone: "+62 431 1234 567",
    instagram: "https://instagram.com/ourcompany_manado",
    googleMaps: "https://maps.google.com/?q=Jl.+Sam+Ratulangi+No.+56,+Manado"
  },
  {
    city: "Palu",
    name: "Branch Office Palu",
    address: "Jl. Tadulako No. 78, Palu",
    phone: "+62 451 1234 567",
    instagram: "https://instagram.com/ourcompany_palu",
    googleMaps: "https://maps.google.com/?q=Jl.+Tadulako+No.+78,+Palu"
  },
  {
    city: "Kendari",
    name: "Branch Office Kendari",
    address: "Jl. Diponegoro No. 90, Kendari",
    phone: "+62 401 1234 567",
    instagram: "https://instagram.com/ourcompany_kendari",
    googleMaps: "https://maps.google.com/?q=Jl.+Diponegoro+No.+90,+Kendari"
  },
  {
    city: "Gorontalo",
    name: "Branch Office Gorontalo",
    address: "Jl. Jenderal Sudirman No. 12, Gorontalo",
    phone: "+62 435 1234 567",
    instagram: "https://instagram.com/ourcompany_gorontalo",
    googleMaps: "https://maps.google.com/?q=Jl.+Jenderal+Sudirman+No.+12,+Gorontalo"
  },
  {
    city: "Mamuju",
    name: "Branch Office Mamuju",
    address: "Jl. Trans Sulawesi No. 34, Mamuju",
    phone: "+62 426 1234 567",
    instagram: "https://instagram.com/ourcompany_mamuju",
    googleMaps: "https://maps.google.com/?q=Jl.+Trans+Sulawesi+No.+34,+Mamuju"
  },
  {
    city: "Samarinda",
    name: "Branch Office Samarinda",
    address: "Jl. Mulawarman No. 56, Samarinda",
    phone: "+62 541 1234 567",
    instagram: "https://instagram.com/ourcompany_samarinda",
    googleMaps: "https://maps.google.com/?q=Jl.+Mulawarman+No.+56,+Samarinda"
  },
  {
    city: "Tarakan",
    name: "Branch Office Tarakan",
    address: "Jl. Yos Sudarso No. 78, Tarakan",
    phone: "+62 551 1234 567",
    instagram: "https://instagram.com/ourcompany_tarakan",
    googleMaps: "https://maps.google.com/?q=Jl.+Yos+Sudarso+No.+78,+Tarakan"
  },
  {
    city: "Pangkalpinang",
    name: "Branch Office Pangkalpinang",
    address: "Jl. Jenderal Sudirman No. 90, Pangkalpinang",
    phone: "+62 717 1234 567",
    instagram: "https://instagram.com/ourcompany_pangkalpinang",
    googleMaps: "https://maps.google.com/?q=Jl.+Jenderal+Sudirman+No.+90,+Pangkalpinang"
  },
  {
    city: "Tanjung Pinang",
    name: "Branch Office Tanjung Pinang",
    address: "Jl. Diponegoro No. 12, Tanjung Pinang",
    phone: "+62 771 1234 567",
    instagram: "https://instagram.com/ourcompany_tanjungpinang",
    googleMaps: "https://maps.google.com/?q=Jl.+Diponegoro+No.+12,+Tanjung+Pinang"
  },
  {
    city: "Serang",
    name: "Branch Office Serang",
    address: "Jl. Raya Jakarta No. 34, Serang",
    phone: "+62 254 1234 567",
    instagram: "https://instagram.com/ourcompany_serang",
    googleMaps: "https://maps.google.com/?q=Jl.+Raya+Jakarta+No.+34,+Serang"
  },
  {
    city: "Cilegon",
    name: "Branch Office Cilegon",
    address: "Jl. Raya Anyer No. 56, Cilegon",
    phone: "+62 254 1234 890",
    instagram: "https://instagram.com/ourcompany_cilegon",
    googleMaps: "https://maps.google.com/?q=Jl.+Raya+Anyer+No.+56,+Cilegon"
  },
  {
    city: "Bekasi",
    name: "Branch Office Bekasi",
    address: "Jl. Ahmad Yani No. 78, Bekasi",
    phone: "+62 21 1234 9012",
    instagram: "https://instagram.com/ourcompany_bekasi",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+78,+Bekasi"
  },
  {
    city: "Depok",
    name: "Branch Office Depok",
    address: "Jl. Margonda Raya No. 90, Depok",
    phone: "+62 21 1234 3456",
    instagram: "https://instagram.com/ourcompany_depok",
    googleMaps: "https://maps.google.com/?q=Jl.+Margonda+Raya+No.+90,+Depok"
  },
  {
    city: "Tangerang",
    name: "Branch Office Tangerang",
    address: "Jl. Sudirman No. 12, Tangerang",
    phone: "+62 21 1234 7890",
    instagram: "https://instagram.com/ourcompany_tangerang",
    googleMaps: "https://maps.google.com/?q=Jl.+Sudirman+No.+12,+Tangerang"
  },
  {
    city: "Bogor",
    name: "Branch Office Bogor",
    address: "Jl. Pajajaran No. 34, Bogor",
    phone: "+62 251 1234 567",
    instagram: "https://instagram.com/ourcompany_bogor",
    googleMaps: "https://maps.google.com/?q=Jl.+Pajajaran+No.+34,+Bogor"
  },
  {
    city: "Cirebon",
    name: "Branch Office Cirebon",
    address: "Jl. Siliwangi No. 56, Cirebon",
    phone: "+62 231 1234 567",
    instagram: "https://instagram.com/ourcompany_cirebon",
    googleMaps: "https://maps.google.com/?q=Jl.+Siliwangi+No.+56,+Cirebon"
  },
  {
    city: "Tasikmalaya",
    name: "Branch Office Tasikmalaya",
    address: "Jl. Asia Afrika No. 78, Tasikmalaya",
    phone: "+62 265 1234 567",
    instagram: "https://instagram.com/ourcompany_tasikmalaya",
    googleMaps: "https://maps.google.com/?q=Jl.+Asia+Afrika+No.+78,+Tasikmalaya"
  },
  {
    city: "Sukabumi",
    name: "Branch Office Sukabumi",
    address: "Jl. Ahmad Yani No. 90, Sukabumi",
    phone: "+62 266 1234 567",
    instagram: "https://instagram.com/ourcompany_sukabumi",
    googleMaps: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+90,+Sukabumi"
  },
  {
    city: "Purwokerto",
    name: "Branch Office Purwokerto",
    address: "Jl. Jenderal Sudirman No. 12, Purwokerto",
    phone: "+62 281 1234 567",
    instagram: "https://instagram.com/ourcompany_purwokerto",
    googleMaps: "https://maps.google.com/?q=Jl.+Jenderal+Sudirman+No.+12,+Purwokerto"
  },
  {
    city: "Tegal",
    name: "Branch Office Tegal",
    address: "Jl. Pancasila No. 34, Tegal",
    phone: "+62 283 1234 567",
    instagram: "https://instagram.com/ourcompany_tegal",
    googleMaps: "https://maps.google.com/?q=Jl.+Pancasila+No.+34,+Tegal"
  },
  {
    city: "Pekalongan",
    name: "Branch Office Pekalongan",
    address: "Jl. Hayam Wuruk No. 56, Pekalongan",
    phone: "+62 285 1234 567",
    instagram: "https://instagram.com/ourcompany_pekalongan",
    googleMaps: "https://maps.google.com/?q=Jl.+Hayam+Wuruk+No.+56,+Pekalongan"
  }
];
    await Branch.bulkCreate(branches);
    console.log(`${branches.length} branches inserted.`);

    // 4. Buat Contoh Inquiry
    await Inquiry.bulkCreate([
        { name: 'Budi Santoso', phone: '081122334455', message: 'Saya ingin bertanya tentang promo.', type: 'contact' },
        { name: 'Citra Lestari', phone: '085566778899', message: 'Minta brosur untuk proyek di Serpong.', type: 'brochure' },
        { name: 'Andi Wijaya', phone: '087711223344', unitType: 'Tipe Belladonna', message: 'Tertarik dengan Tipe Belladonna di Serpong Garden.', type: 'whatsapp' },
    ]);
    console.log('Sample inquiries created.');


    console.log('✅ Database seeding complete!');

  } catch (err) {
    console.error('❌ Database seeding error:', err);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

seedDatabase();