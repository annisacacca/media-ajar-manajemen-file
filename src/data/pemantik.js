// src/data/pemantik.js
// Tiga pertanyaan pemantik, diambil PERSIS dari Modul Ajar (bagian Pertanyaan Pemantik).
// q : pertanyaan (tampil saat guru menekan tombol; siswa menjawab lisan)
// a : pembahasan (bisa dibuka setelah bagian G, dirangkum dari Materi A sampai G dan Modul Ajar)
// dika : ekspresi Dika saat pertanyaan itu muncul
//        (senang, bingung, mikir, kaget, semangat, sedih, bangga)
export const PEMANTIK = [
  {
    id: 1,
    dika: 'bingung',
    q: 'Siapa yang sebenarnya mengatur penyimpanan file di komputer?',
    a: 'Sistem operasi, melalui file system. Sistem operasi mencatat nama, lokasi, ukuran, dan tipe setiap file serta menyusunnya dalam struktur folder. File Explorer hanyalah tampilan dari hasil kerjanya.',
  },
  {
    id: 2,
    dika: 'mikir',
    q: 'Bagaimana komputer mengetahui aplikasi yang harus membuka suatu file?',
    a: 'Lewat ekstensinya. Ekstensi seperti .docx atau .pdf memberi tahu jenis file kepada sistem operasi, lalu sistem operasi memilih aplikasi pembukanya. Kalau ekstensi hilang, seperti pada laporan_praktikum milik teman Dika, sistem tidak tahu aplikasi pembukanya.',
  },
  {
    id: 3,
    dika: 'semangat',
    q: 'Bagaimana cara menata file agar mudah ditemukan dan aman dari kesalahan hapus?',
    a: 'Beri nama yang jelas, kelompokkan ke dalam folder menurut fungsi atau jenisnya, dan pakai pola yang konsisten. Agar aman, salin file penting sebagai cadangan dan periksa dulu sebelum menghapus. Delete masih bisa dipulihkan dari Recycle Bin.',
  },
]