// src/data/sections.js
// Daftar semua bagian pelajaran, URUT sesuai alur mengajar.
// Dipakai oleh daftar samping, navigasi panah, dan penghitung progres.
//   id     : nama unik (dipakai di kode)
//   label  : tulisan di daftar samping
//   topic  : keterangan singkat (diambil dari Peta Materi di Materi Ajar)
//   icon   : nama komponen ikon di src/icons
//   tone   : warna title bar jendela (blue | yellow | red | green)
//   window : nama "file" di title bar jendela
//   stage  : tahap pengerjaan yang akan mengisi bagian ini
export const SECTIONS = [
  { id: 'pemantik', label: 'Pertanyaan Pemantik', topic: 'Tiga pertanyaan pembuka sebelum masuk materi', icon: 'ComputerIcon', tone: 'blue', window: 'Pemantik.exe', stage: 2 },
  { id: 'cerita', label: 'Cerita Dika', topic: 'Cerita pembuka: Misi Menyelamatkan Tugas Dika', icon: 'DocumentIcon', tone: 'yellow', window: 'Cerita_Dika.txt', stage: 3 },
  { id: 'a', label: 'A. Peran Sistem Operasi', topic: 'Peran sistem operasi dalam manajemen file', icon: 'ComputerIcon', tone: 'blue', window: 'Materi_A.exe', stage: 3 },
  { id: 'b', label: 'B. Pengertian File & Folder', topic: 'Pengertian file dan folder', icon: 'DocumentIcon', tone: 'green', window: 'Materi_B.exe', stage: 3 },
  { id: 'c', label: 'C. Fungsi & Karakteristik', topic: 'Fungsi dan karakteristik file dan folder', icon: 'FolderIcon', tone: 'yellow', window: 'Materi_C.exe', stage: 3 },
  { id: 'd', label: 'D. Nama, Format, Ekstensi', topic: 'Nama, format, dan ekstensi file', icon: 'CodeIcon', tone: 'red', window: 'Materi_D.exe', stage: 4 },
  { id: 'e', label: 'E. Jenis File', topic: 'Jenis dan fungsi file berdasarkan ekstensi', icon: 'ImageIcon', tone: 'blue', window: 'Materi_E.exe', stage: 4 },
  { id: 'f', label: 'F. Operasi Dasar', topic: 'Operasi dasar file dan folder', icon: 'TrashIcon', tone: 'green', window: 'Materi_F.exe', stage: 5 },
  { id: 'g', label: 'G. Direktori & Struktur', topic: 'Direktori dan struktur folder', icon: 'FolderIcon', tone: 'yellow', window: 'Materi_G.exe', stage: 6 },
  { id: 'misi', label: 'Lima Misi', topic: 'Buat, Salin, Pindah, Ganti Nama, Hapus', icon: 'StarIcon', tone: 'red', window: 'Misi.exe', stage: 7 },
  { id: 'kuis', label: 'Kuis', topic: 'Lima soal formatif pilihan ganda', icon: 'CheckIcon', tone: 'blue', window: 'Kuis.exe', stage: 8 },
  { id: 'penutup', label: 'Penutup', topic: 'Kesimpulan, refleksi, dan tindak lanjut', icon: 'ArchiveIcon', tone: 'green', window: 'Penutup.txt', stage: 8 },
]

// Cari nomor urut bagian dari id-nya, misalnya indexOf('misi')
export const indexOfSection = (id) => SECTIONS.findIndex((s) => s.id === id)
