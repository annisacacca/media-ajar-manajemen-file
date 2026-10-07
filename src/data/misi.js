// src/data/misi.js  (DIGANTI)
// Data lima misi + isi folder berantakan Dika untuk simulasi.
// Nama file di sini SAMA dengan File_Berantakan_Dika.zip (versi file asli untuk dicoba di komputer).
import { ROOT_ID } from '../lib/fsModel.js'

export const DIKA_ID = 'dika'

// id tetap (f1..f12) dipakai pemeriksa misi untuk mengenali file asli walau sudah diganti nama / dipindah
export const DIKA_FILES = [
  { id: 'f1', name: 'Tugas_Informatika.docx' },
  { id: 'f2', name: 'Tugas_Informatika - Copy.docx' },
  { id: 'f3', name: 'Tugas_Informatika (1).docx' },
  { id: 'f4', name: 'Document1.docx' },
  { id: 'f5', name: 'laporan_praktikum' }, // kiriman teman: tanpa ekstensi
  { id: 'f6', name: 'Data_Nilai.xlsx' },
  { id: 'f7', name: 'Presentasi_Kelompok.pptx' },
  { id: 'f8', name: 'Materi_Sistem_Operasi.pdf' },
  { id: 'f9', name: 'foto_kelas.jpg' },
  { id: 'f10', name: 'foto_kelas - Copy.jpg' },
  { id: 'f11', name: 'Screenshot (3).png' },
  { id: 'f12', name: 'Tugas_Semester_Lalu.zip' },
]
export const DUPLIKAT = ['f2', 'f3', 'f10']

export const DIKA_NODES = [
  { id: ROOT_ID, name: 'D:', parent: null, type: 'folder' },
  { id: DIKA_ID, name: 'File_Berantakan_Dika', parent: ROOT_ID, type: 'folder' },
  ...DIKA_FILES.map((f) => ({ ...f, parent: DIKA_ID, type: 'file' })),
]

// items = daftar centang yang DIPERIKSA OTOMATIS (urutannya sama dengan lib/misiCheck.js)
export const MISI = [
  {
    id: 'buat', nomor: 1, kode: 'BUAT', tone: 'blue', kunci: 'Buat',
    judul: 'Buat folder induk dan empat subfolder',
    tugas: 'Buat satu folder induk di drive D: (nama bebas, misalnya Tugas_Dika_Rapi). Di dalamnya buat subfolder Tugas, Foto, Dokumen, dan Arsip.',
    items: ['Folder induk berhasil dibuat', 'Keempat subfolder ada di dalam folder induk dengan nama yang tepat'],
    langkah: ['Klik kanan area kosong, pilih New, lalu Folder (atau tombol Folder Baru).', 'Ketik nama, tekan Enter.', 'Buka folder induk, ulangi untuk empat subfolder.'],
    refleksi: { tanya: 'Mengapa file jadi lebih mudah ditemukan setelah dikelompokkan dalam subfolder?', jawab: 'Karena lokasi file mengikuti pola yang logis, sehingga kita tahu harus mencari di mana tanpa membuka ratusan file satu per satu.' },
  },
  {
    id: 'salin', nomor: 2, kode: 'SALIN', tone: 'yellow', kunci: 'Salin',
    judul: 'Salin tugas Dika sebagai cadangan',
    tugas: 'Salin Tugas_Informatika.docx ke subfolder Tugas. File aslinya harus tetap ada di folder berantakan.',
    items: ['File asli masih ada di lokasi awal', 'Salinan ada di subfolder Tugas'],
    langkah: ['Klik Tugas_Informatika.docx, tekan Ctrl + C (atau tombol Salin).', 'Buka subfolder Tugas.', 'Tekan Ctrl + V.'],
    refleksi: { tanya: 'Mengapa menyalin berguna untuk membuat cadangan?', jawab: 'Karena file asli tetap ada. Kalau file asli rusak atau terhapus, salinannya masih bisa dipakai.' },
  },
  {
    id: 'pindah', nomor: 3, kode: 'PINDAH', tone: 'green', kunci: 'Pindah',
    judul: 'Pindahkan file ke subfolder yang sesuai',
    tugas: 'Pindahkan setiap file ke subfolder sesuai jenisnya: dokumen ke Dokumen, gambar ke Foto, arsip ke Arsip. Kiriman teman yang tanpa ekstensi harus kamu selidiki jenisnya dulu (ingat Bagian 3 LKPD).',
    items: ['Semua dokumen (.docx .xlsx .pptx .pdf) berada di Dokumen', 'Semua gambar (.jpg .png) berada di Foto', 'File arsip (.zip) berada di Arsip', 'laporan_praktikum sudah diberi ekstensi yang benar dan masuk ke Dokumen'],
    langkah: ['Pilih beberapa file sejenis (tahan Ctrl), tekan Ctrl + X, buka subfolder tujuan, tekan Ctrl + V. Atau seret file ke folder.', 'File tanpa ekstensi: isinya dokumen Word. Ganti namanya (F2) dengan menambahkan .docx.'],
    refleksi: { tanya: 'Apa perbedaan menyalin (Misi 2) dengan memindahkan file?', jawab: 'Menyalin membuat file kedua dan file asal tetap ada. Memindahkan hanya mengubah lokasi, jadi di lokasi asal file sudah tidak ada.' },
  },
  {
    id: 'ganti', nomor: 4, kode: 'GANTI NAMA', tone: 'red', kunci: 'Ganti',
    judul: 'Ganti nama menjadi nama yang jelas',
    tugas: 'Ganti nama minimal tiga file yang namanya asal-asalan (contoh: Document1.docx, Screenshot (3).png) tanpa mengubah ekstensinya. Menambah .docx pada laporan_praktikum juga dihitung.',
    items: ['Minimal tiga file punya nama baru', 'Ekstensi file tidak ada yang berubah'],
    langkah: ['Pilih file, tekan F2 (atau klik kanan lalu Rename).', 'Ganti hanya bagian sebelum titik terakhir.', 'Kalau muncul peringatan ekstensi, pilih No lalu ulangi.'],
    refleksi: { tanya: 'Apa yang bisa terjadi jika ekstensi ikut diganti?', jawab: 'Sistem operasi salah memilih aplikasi pembuka, sehingga file tidak bisa dibuka atau terbuka dengan salah, walaupun isinya tidak berubah.' },
  },
  {
    id: 'hapus', nomor: 5, kode: 'HAPUS', tone: 'blue', kunci: 'Hapus',
    judul: 'Hapus duplikat, periksa, lalu kembalikan',
    tugas: 'Cari tiga file duplikat (namanya berakhiran - Copy atau (1)), hapus ke Recycle Bin, buka Recycle Bin, lalu pulihkan (restore) minimal satu file. Jangan hapus file penting!',
    items: ['Ketiga file duplikat masuk ke Recycle Bin', 'Ada file yang berhasil dikembalikan (restore)', 'Tidak ada file penting yang terhapus permanen'],
    langkah: ['Pilih duplikat, tekan Delete (bukan Shift + Delete).', 'Buka Recycle Bin di panel kiri.', 'Pilih file, klik Restore, lalu lihat ke folder mana ia kembali.'],
    refleksi: { tanya: 'Apa bedanya Delete dengan Shift + Delete?', jawab: 'Delete memindahkan file ke Recycle Bin sehingga masih bisa dipulihkan. Shift + Delete menghapus permanen tanpa melewati Recycle Bin.' },
  },
]
