export const siteConfig = {
  name: "Nusantara Retreats",
  description: "Temukan penginapan eksklusif dan cottage mewah di seluruh Indonesia.",
  contact: {
    whatsapp: "+6281234567890",
    email: "halo@nusantararetreats.com"
  },
  banks: [
    {
      id: "bca",
      name: "BCA",
      accountNumber: "1234567890",
      accountName: "PT Nusantara Retreats",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
    },
    {
      id: "mandiri",
      name: "Bank Mandiri",
      accountNumber: "0987654321",
      accountName: "PT Nusantara Retreats",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
    }
  ],
  qris: {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg", // Placeholder QR
    instruction: "Scan QRIS ini menggunakan aplikasi m-banking atau e-wallet Anda."
  }
};

export const categories = [
  { id: "family", name: "Keluarga", icon: "Users" },
  { id: "romantic", name: "Romantis", icon: "Heart" },
  { id: "nature", name: "Alam", icon: "TreePine" },
  { id: "luxury", name: "Mewah", icon: "Gem" },
  { id: "beach", name: "Tepi Pantai", icon: "Umbrella" },
];

export const cottages = [
  {
    id: "c1",
    name: "Villa Kayu Hutan Ubud",
    location: "Ubud, Bali",
    rating: 4.9,
    reviews: 128,
    price: 2500000,
    images: [
      "https://picsum.photos/seed/ubud1/1200/800",
      "https://picsum.photos/seed/ubud2/1200/800",
      "https://picsum.photos/seed/ubud3/1200/800"
    ],
    category: "nature",
    description: "Nikmati ketenangan sejati di tengah rimbunnya hutan Ubud. Villa kayu eksklusif ini menawarkan kolam renang pribadi tanpa batas (infinity pool) yang menghadap langsung ke lembah hijau. Sempurna untuk pelarian romantis atau sekadar mencari kedamaian.",
    facilities: [
      { icon: "Wifi", name: "WiFi Cepat" },
      { icon: "Waves", name: "Kolam Renang Pribadi" },
      { icon: "Coffee", name: "Sarapan Gratis" },
      { icon: "Wind", name: "AC" },
      { icon: "Car", name: "Parkir Gratis" }
    ],
    highlights: [
      "Pemandangan lembah yang menakjubkan",
      "Desain arsitektur bambu dan kayu premium",
      "Layanan pijat panggilan tersedia"
    ],
    isFeatured: true
  },
  {
    id: "c2",
    name: "Oceanfront Glass Villa",
    location: "Nusa Penida, Bali",
    rating: 4.8,
    reviews: 95,
    price: 3200000,
    images: [
      "https://picsum.photos/seed/ocean1/1200/800",
      "https://picsum.photos/seed/ocean2/1200/800"
    ],
    category: "luxury",
    description: "Bangun dengan suara ombak di villa kaca tepi pantai kami. Desain modern minimalis dengan jendela setinggi langit-langit memberikan pemandangan laut 180 derajat yang tak terhalang.",
    facilities: [
      { icon: "Wifi", name: "WiFi" },
      { icon: "Umbrella", name: "Akses Pantai Pribadi" },
      { icon: "Tv", name: "Smart TV" },
      { icon: "Wind", name: "AC" }
    ],
    highlights: [
      "Akses langsung ke pantai pasir putih",
      "Dek observasi bintang di atap",
      "Koki pribadi (berdasarkan permintaan)"
    ],
    isFeatured: true
  },
  {
    id: "c3",
    name: "Pine Tree Family Cabin",
    location: "Lembang, Bandung",
    rating: 4.7,
    reviews: 210,
    price: 1500000,
    images: [
      "https://picsum.photos/seed/pine1/1200/800",
      "https://picsum.photos/seed/pine2/1200/800"
    ],
    category: "family",
    description: "Kabin kayu luas yang cocok untuk liburan keluarga besar. Dikelilingi hutan pinus yang sejuk, dilengkapi dengan area BBQ dan taman bermain anak.",
    facilities: [
      { icon: "Wifi", name: "WiFi" },
      { icon: "Flame", name: "Area BBQ" },
      { icon: "Users", name: "Kapasitas 8 Orang" },
      { icon: "Car", name: "Parkir Luas" }
    ],
    highlights: [
      "Halaman rumput luas untuk bermain",
      "Dapur lengkap",
      "Dekat dengan tempat wisata utama Lembang"
    ],
    isFeatured: false
  },
  {
    id: "c4",
    name: "Romantic Cliffhouse",
    location: "Uluwatu, Bali",
    rating: 4.9,
    reviews: 340,
    price: 4500000,
    images: [
      "https://picsum.photos/seed/cliff1/1200/800",
      "https://picsum.photos/seed/cliff2/1200/800"
    ],
    category: "romantic",
    description: "Tempat sempurna untuk bulan madu. Berada di tepi tebing Uluwatu dengan pemandangan matahari terbenam yang spektakuler langsung dari tempat tidur Anda.",
    facilities: [
      { icon: "Wifi", name: "WiFi Cepat" },
      { icon: "Waves", name: "Jacuzzi Pribadi" },
      { icon: "Wine", name: "Minibar Premium" },
      { icon: "Wind", name: "AC" }
    ],
    highlights: [
      "Pemandangan sunset terbaik",
      "Layanan kamar 24 jam",
      "Desain interior mewah"
    ],
    isFeatured: true
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Wijaya",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
    comment: "Pengalaman menginap yang luar biasa! Villa Kayu Hutan Ubud benar-benar memberikan ketenangan yang saya cari. Pelayanannya bintang lima."
  },
  {
    id: 2,
    name: "Budi Santoso",
    avatar: "https://i.pravatar.cc/150?u=budi",
    rating: 5,
    comment: "Sangat cocok untuk liburan keluarga. Anak-anak sangat suka bermain di halaman Pine Tree Cabin. Pasti akan kembali lagi!"
  },
  {
    id: 3,
    name: "Amanda & Reza",
    avatar: "https://i.pravatar.cc/150?u=amanda",
    rating: 5,
    comment: "Bulan madu kami di Romantic Cliffhouse sangat berkesan. Pemandangan sunsetnya tidak ada duanya. Terima kasih Nusantara Retreats!"
  }
];

export const whyChooseUs = [
  {
    icon: "ShieldCheck",
    title: "Pemesanan Aman",
    description: "Transaksi dijamin aman dengan enkripsi tingkat tinggi."
  },
  {
    icon: "Sparkles",
    title: "Kualitas Terjamin",
    description: "Semua properti telah dikurasi ketat untuk standar kenyamanan maksimal."
  },
  {
    icon: "Headset",
    title: "Layanan 24/7",
    description: "Tim dukungan kami siap membantu Anda kapan saja."
  },
  {
    icon: "Tag",
    title: "Harga Terbaik",
    description: "Jaminan harga terbaik tanpa biaya tersembunyi."
  }
];
