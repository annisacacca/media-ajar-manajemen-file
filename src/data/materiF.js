// src/data/materiF.js  (BARU)
// Isi teks materi F. Diambil dari Materi Ajar bagian F (diringkas, bukan dikarang).
// Kolom "Misi" pada tabel di Materi Ajar sengaja TIDAK ditampilkan supaya misi tidak jadi spoiler.
import { ROOT_ID } from '../lib/fsModel'

export const MATERI_F = {
  lead: 'Lima operasi dasar ini dapat dilakukan lewat menu klik kanan, tombol di toolbar File Explorer, maupun pintasan papan ketik (keyboard shortcut).',
  table: {
    columns: ['Operasi', 'Cara Melalui Menu', 'Pintasan Papan Ketik'],
    rows: [
      ['Membuat', 'Klik kanan area kosong, New, Folder', 'Ctrl + Shift + N'],
      ['Menyalin', 'Klik kanan file, Copy; buka tujuan, klik kanan, Paste', 'Ctrl + C lalu Ctrl + V'],
      ['Memindahkan', 'Klik kanan file, Cut; buka tujuan, klik kanan, Paste', 'Ctrl + X lalu Ctrl + V'],
      ['Mengganti nama', 'Klik kanan file, Rename', 'F2'],
      ['Menghapus', 'Klik kanan file, Delete', 'Delete'],
    ],
  },
  // Langkah tiap operasi
  operations: [
    {
      id: 'buat', title: 'Membuat', keys: 'Ctrl + Shift + N',
      intro: 'Membuat folder baru untuk menampung file.',
      steps: [
        'Buka lokasi tempat folder akan dibuat, misalnya Documents atau Drive D.',
        'Klik kanan pada area kosong, pilih New, lalu Folder.',
        'Ketik nama folder, misalnya Tugas_Dika, lalu tekan Enter.',
        'Buka folder tersebut dan buat subfolder Tugas, Foto, Dokumen, dan Arsip dengan cara yang sama.',
      ],
      note: 'File baru juga dapat dibuat dari menu yang sama dengan memilih jenis file pada New, misalnya Text Document.',
    },
    {
      id: 'salin', title: 'Menyalin', keys: 'Ctrl + C lalu Ctrl + V',
      intro: 'Menyalin (copy) membuat duplikat file di lokasi lain, sedangkan file asli tetap berada di tempat semula. Cocok untuk membuat cadangan (backup).',
      steps: [
        'Pilih file yang akan disalin. Untuk beberapa file sekaligus, tahan Ctrl sambil mengklik masing-masing file.',
        'Klik kanan, pilih Copy (atau Ctrl + C).',
        'Buka folder tujuan, klik kanan area kosong, pilih Paste (atau Ctrl + V).',
        'Periksa bahwa file muncul di folder tujuan dan masih ada di folder asal.',
      ],
    },
    {
      id: 'pindah', title: 'Memindahkan', keys: 'Ctrl + X lalu Ctrl + V',
      intro: 'Memindahkan (move) memindahkan file dari lokasi asal ke lokasi baru. Setelah selesai, file tidak lagi berada di lokasi asal.',
      steps: [
        'Pilih file yang akan dipindah.',
        'Klik kanan, pilih Cut (atau Ctrl + X).',
        'Buka subfolder tujuan yang sesuai dengan hasil klasifikasi, misalnya foto_kelas.jpg ke folder Foto.',
        'Klik kanan area kosong, pilih Paste (atau Ctrl + V).',
      ],
      note: 'Alternatif lain adalah menyeret file (drag and drop). Menyeret file di dalam satu drive berarti memindahkan, sedangkan menyeret ke drive berbeda berarti menyalin.',
    },
    {
      id: 'ganti', title: 'Mengganti nama', keys: 'F2',
      intro: 'Memberi nama baru yang lebih jelas tanpa mengubah isi file.',
      steps: [
        'Klik file satu kali untuk memilihnya, lalu tekan F2 (atau klik kanan lalu Rename).',
        'Ketik nama baru yang jelas dan sesuai kebiasaan penamaan, lalu tekan Enter.',
        'Jangan ubah atau hapus ekstensi. Pastikan akhiran seperti .docx tetap ada.',
        'Bila muncul peringatan perubahan ekstensi, pilih No kemudian ulangi dengan benar.',
      ],
      example: { from: 'New Document (3).docx', to: 'Tugas_Informatika_Dika.docx', note: 'Hanya bagian nama yang berubah, ekstensi .docx tetap.' },
    },
    {
      id: 'hapus', title: 'Menghapus', keys: 'Delete',
      intro: 'Saat file dihapus dengan tombol Delete, Windows tidak langsung menghilangkannya, melainkan memindahkannya ke Recycle Bin (keranjang sampah) sehingga masih dapat dipulihkan.',
      steps: [
        'Pilih file duplikat yang akan dihapus, lalu tekan Delete. Konfirmasi bila diminta.',
        'Buka Recycle Bin di Desktop dan periksa bahwa file tersebut ada di sana.',
        'Untuk memulihkan, klik kanan file di Recycle Bin, lalu pilih Restore. File kembali ke lokasi asalnya.',
        'Untuk menghapus benar-benar, pilih Delete dari dalam Recycle Bin atau gunakan Empty Recycle Bin. Setelah itu file tidak dapat dikembalikan dengan cara biasa.',
      ],
    },
  ],
  compare: {
    columns: ['Aspek', 'Salin (Copy)', 'Pindah (Move)'],
    rows: [
      ['File asal', 'Tetap ada', 'Hilang dari lokasi asal'],
      ['File tujuan', 'Salinan baru', 'File yang sama pindah tempat'],
      ['Pintasan', 'Ctrl + C, Ctrl + V', 'Ctrl + X, Ctrl + V'],
      ['Kegunaan', 'Cadangan dan berbagi', 'Merapikan dan menata ulang'],
    ],
  },
  conflict: {
    title: 'Jika Muncul Konflik Nama',
    text: 'Bila folder tujuan sudah memuat file dengan nama yang sama, Windows menampilkan pilihan: Replace (timpa file lama), Skip (lewati), atau Compare info for both files (bandingkan dan pilih yang dipertahankan). Baca pilihan dengan teliti sebelum memilih Replace, karena file lama akan tertimpa.',
  },
  warning: {
    title: 'Waspada Hapus Permanen',
    text: 'Shift + Delete menghapus file secara permanen tanpa melewati Recycle Bin. File yang dihapus dari flashdisk atau drive jaringan umumnya juga tidak masuk Recycle Bin. Sebelum menghapus, pastikan kamu sudah memeriksa isi file dan memiliki salinan cadangan bila file itu penting.',
  },
  safe: [
    { title: 'Cadangkan sebelum mengubah', text: 'Salin file penting sebelum memindahkan, menimpa, atau menghapus.', tone: 'blue' },
    { title: 'Periksa sebelum menghapus', text: 'Buka dan pastikan file benar-benar duplikat atau tidak diperlukan.', tone: 'yellow' },
    { title: 'Jangan ubah ekstensi sembarangan', text: 'Ubah ekstensi hanya kalau memahami akibatnya.', tone: 'red' },
    { title: 'Jangan sentuh folder sistem', text: 'Jangan menghapus atau memindahkan folder sistem seperti Windows dan Program Files.', tone: 'red' },
    { title: 'Simpan di lokasi yang jelas', text: 'Hindari menumpuk file di Desktop atau Downloads.', tone: 'green' },
  ],
  // Isi awal mini File Explorer untuk LATIHAN bebas (bukan folder berantakan Dika, itu untuk misi).
  practice: {
    start: 'lat',
    nodes: [
      { id: ROOT_ID, name: 'D:', parent: null, type: 'folder' },
      { id: 'lat', name: 'Latihan', parent: ROOT_ID, type: 'folder' },
      { id: 'cad', name: 'Cadangan', parent: 'lat', type: 'folder' },
      { id: 'arsip', name: 'Arsip', parent: 'lat', type: 'folder' },
      { id: 'p1', name: 'Tugas_Informatika.docx', parent: 'lat', type: 'file' },
      { id: 'p2', name: 'foto_kelas.jpg', parent: 'lat', type: 'file' },
      { id: 'p3', name: 'lagu.mp3', parent: 'lat', type: 'file' },
      { id: 'p4', name: 'laporan.pdf', parent: 'lat', type: 'file' },
    ],
  },
}
