// src/data/materiG.js  (BARU)
// Isi teks materi G: Direktori dan Struktur Folder. Diambil dari Materi Ajar bagian G (diringkas, bukan dikarang).
// Dipisah dari tampilan supaya mudah diedit tanpa menyentuh komponen.
import { ROOT_ID } from '../lib/fsModel'

export const MATERI_G = {
  lead: 'Sistem operasi menyusun file dalam struktur hierarki berbentuk pohon (tree). Titik awalnya adalah drive atau akar (root), misalnya C:\\ atau D:\\.',

  // Tabel istilah (Materi Ajar G.1)
  terms: {
    columns: ['Istilah', 'Penjelasan'],
    rows: [
      ['Drive / root', 'Titik awal penyimpanan, ditandai huruf dan titik dua (C:, D:, E:).'],
      ['Folder induk (parent)', 'Folder yang memuat folder lain di dalamnya.'],
      ['Subfolder (child)', 'Folder yang berada di dalam folder induk.'],
      ['File', 'Ujung cabang; file tidak dapat memuat folder atau file lain.'],
    ],
  },
  branchNote: 'Dari akar bercabang folder, dari folder bercabang subfolder, dan di ujung cabang terdapat file.',

  // Contoh struktur pada soal formatif (Materi Ajar G.2): D:\ > Informatika > Kelas_X > Tugas1.docx
  example: {
    startId: 'kelas',
    fileId: 'tugas1',
    nodes: [
      { id: ROOT_ID, name: 'D:', parent: null, type: 'folder' },
      { id: 'info', name: 'Informatika', parent: ROOT_ID, type: 'folder' },
      { id: 'kelas', name: 'Kelas_X', parent: 'info', type: 'folder' },
      { id: 'tugas1', name: 'Tugas1.docx', parent: 'kelas', type: 'file' },
    ],
  },

  // Path (Materi Ajar G.3)
  path: {
    intro: 'Setiap file memiliki path, yaitu alamat lengkap yang menuliskan jalur dari drive sampai file, dipisahkan tanda garis miring terbalik (\\).',
    next: 'Pembahasan lebih lanjut tentang lokasi file dan path menjadi topik pertemuan berikutnya.',
  },

  // Prinsip menata struktur folder (Materi Ajar G)
  principles: [
    { title: 'Kelompokkan berdasarkan fungsi atau jenis', text: 'Misalnya per mata pelajaran, per proyek, atau per jenis file.', tone: 'blue' },
    { title: 'Jangan terlalu dalam', text: 'Struktur lebih dari 4 sampai 5 tingkat menyulitkan penelusuran.', tone: 'red' },
    { title: 'Konsisten', text: 'Gunakan pola penamaan folder yang sama, misalnya Kelas_X, Kelas_XI.', tone: 'green' },
    { title: 'Pisahkan file kerja dan arsip', text: 'File yang sudah selesai dipindah ke folder Arsip agar folder kerja tetap ringan.', tone: 'yellow' },
  ],

  // Contoh rancangan struktur untuk Tugas Dika (Materi Ajar G.4).
  // Bagian ini DIKUNCI sampai guru menekan "Mulai Misi", karena sama dengan hasil akhir misi (spoiler).
  dika: {
    intro: 'Contoh rancangan struktur untuk Tugas Dika. Klik folder atau file untuk melihat hubungan dan path-nya.',
    startId: ROOT_ID,
    nodes: [
      { id: ROOT_ID, name: 'Tugas_Dika', parent: null, type: 'folder' },
      { id: 'tugas', name: 'Tugas', parent: ROOT_ID, type: 'folder' },
      { id: 'foto', name: 'Foto', parent: ROOT_ID, type: 'folder' },
      { id: 'dok', name: 'Dokumen', parent: ROOT_ID, type: 'folder' },
      { id: 'arsip', name: 'Arsip', parent: ROOT_ID, type: 'folder' },
      { id: 'd1', name: 'Tugas_Informatika_Dika.docx', parent: 'tugas', type: 'file' },
      { id: 'd2', name: 'Laporan_Praktikum_SO.pdf', parent: 'tugas', type: 'file' },
      { id: 'd3', name: 'foto_kelas.jpg', parent: 'foto', type: 'file' },
      { id: 'd4', name: 'Data_Nilai_KelasX.xlsx', parent: 'dok', type: 'file' },
      { id: 'd5', name: 'Presentasi_Kelompok.pptx', parent: 'dok', type: 'file' },
      { id: 'd6', name: 'Cadangan_Tugas.zip', parent: 'arsip', type: 'file' },
    ],
  },

  // Isi awal mini File Explorer + pohon untuk "Coba Sendiri". Nama file diambil dari contoh di Materi Ajar.
  lab: {
    start: ROOT_ID,
    nodes: [
      { id: ROOT_ID, name: 'D:', parent: null, type: 'folder' },
      { id: 'info', name: 'Informatika', parent: ROOT_ID, type: 'folder' },
      { id: 'kelas', name: 'Kelas_X', parent: 'info', type: 'folder' },
      { id: 'kelas11', name: 'Kelas_XI', parent: 'info', type: 'folder' },
      { id: 'musik', name: 'Musik', parent: ROOT_ID, type: 'folder' },
      { id: 'l1', name: 'Tugas1.docx', parent: 'kelas', type: 'file' },
      { id: 'l2', name: 'lagu.mp3', parent: 'musik', type: 'file' },
      { id: 'l3', name: 'foto_kelas.jpg', parent: ROOT_ID, type: 'file' },
    ],
    tries: [
      'Seret foto_kelas.jpg ke folder Kelas_X, lalu lihat path barunya di pohon.',
      'Buka Informatika, buat folder baru di dalamnya (klik kanan, New, Folder), lalu beri nama.',
      'Ganti nama folder Informatika, lalu klik Tugas1.docx di pohon. Apa yang terjadi pada path-nya?',
    ],
  },
}
