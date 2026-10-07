// src/data/kuis.js
// Lima soal formatif pilihan ganda. Isinya diambil dari Materi A sampai G (bukan dikarang).
//   correct : id opsi yang benar
//   why     : penjelasan singkat yang tampil setelah menjawab
//   wrong   : petunjuk khusus untuk tiap opsi yang salah (supaya siswa tahu letak salahnya)
export const KUIS = [
  {
    id: 'q1',
    topic: 'A. Peran Sistem Operasi',
    q: 'Siapa yang sebenarnya mencatat nama, lokasi, dan ukuran file, serta mengatur ruang penyimpanan yang dipakainya?',
    options: [
      { id: 'a', text: 'File Explorer' },
      { id: 'b', text: 'Sistem operasi, melalui file system' },
      { id: 'c', text: 'Aplikasi Microsoft Word' },
      { id: 'd', text: 'Flashdisk tempat file disimpan' },
    ],
    correct: 'b',
    why: 'Sistem operasi lewat file system-lah yang mencatat identitas file dan mengalokasikan ruang penyimpanan. File Explorer hanya menampilkan hasil kerjanya.',
    wrong: {
      a: 'File Explorer hanyalah aplikasi antarmuka yang menampilkan hasil kerja sistem operasi.',
      c: 'Aplikasi hanya membuka dan menyimpan file. Pencatatannya dilakukan sistem operasi.',
      d: 'Perangkat penyimpanan hanya berupa blok-blok data. Yang menatanya adalah file system.',
    },
  },
  {
    id: 'q2',
    topic: 'D. Nama, Format, Ekstensi',
    q: 'Dika mengganti nama foto.png menjadi foto.pdf dengan harapan gambarnya berubah jadi PDF. Apa yang terjadi?',
    options: [
      { id: 'a', text: 'Gambar otomatis berubah menjadi PDF' },
      { id: 'b', text: 'File menjadi lebih kecil ukurannya' },
      { id: 'c', text: 'Isi file tetap gambar, hanya label ekstensinya yang salah' },
      { id: 'd', text: 'File langsung terhapus oleh Windows' },
    ],
    correct: 'c',
    why: 'Mengganti ekstensi hanya mengganti "label". Untuk berpindah format, gunakan Save As atau Export pada aplikasi yang sesuai.',
    wrong: {
      a: 'Ekstensi tidak mengubah isi. Isi file tetap sama seperti semula.',
      b: 'Ukuran file ditentukan oleh isinya, bukan oleh namanya.',
      d: 'Windows tidak menghapus file karena ekstensinya diganti, tetapi file itu bisa gagal dibuka.',
    },
  },
  {
    id: 'q3',
    topic: 'E. Jenis File',
    q: 'Dika ingin mengirim tugas yang tidak perlu diedit lagi, dan tampilannya harus sama di semua perangkat. Format yang paling tepat adalah ...',
    options: [
      { id: 'a', text: '.pdf' },
      { id: 'b', text: '.exe' },
      { id: 'c', text: '.wav' },
      { id: 'd', text: '.txt' },
    ],
    correct: 'a',
    why: '.pdf menjaga tampilan dokumen tetap sama di semua perangkat, jadi cocok untuk tugas yang tidak perlu diedit.',
    wrong: {
      b: '.exe adalah program yang dapat dijalankan, bukan dokumen. Waspadai .exe dari sumber tidak dikenal.',
      c: '.wav adalah format audio tanpa kompresi, bukan dokumen.',
      d: '.txt hanya berisi teks polos tanpa format, jadi tampilan tugas tidak terjaga.',
    },
  },
  {
    id: 'q4',
    topic: 'F. Operasi Dasar',
    q: 'Dika ingin membuat cadangan (backup) file penting, dan file aslinya harus tetap ada di tempat semula. Pintasan yang dipakai adalah ...',
    options: [
      { id: 'a', text: 'Ctrl + X lalu Ctrl + V' },
      { id: 'b', text: 'F2' },
      { id: 'c', text: 'Shift + Delete' },
      { id: 'd', text: 'Ctrl + C lalu Ctrl + V' },
    ],
    correct: 'd',
    why: 'Copy (Ctrl + C) lalu Paste (Ctrl + V) membuat duplikat, sedangkan file asli tetap berada di tempat semula.',
    wrong: {
      a: 'Cut dan Paste memindahkan file, sehingga file asli hilang dari lokasi awal.',
      b: 'F2 dipakai untuk mengganti nama, bukan menyalin.',
      c: 'Shift + Delete menghapus file secara permanen tanpa lewat Recycle Bin. Ini kebalikan dari membuat cadangan.',
    },
  },
  {
    id: 'q5',
    topic: 'G. Direktori & Struktur',
    q: 'Perhatikan path D:\\Informatika\\Kelas_X\\Tugas1.docx. Manakah folder induk (parent) langsung dari file Tugas1.docx?',
    options: [
      { id: 'a', text: 'D:' },
      { id: 'b', text: 'Informatika' },
      { id: 'c', text: 'Tugas1.docx' },
      { id: 'd', text: 'Kelas_X' },
    ],
    correct: 'd',
    why: 'Folder induk langsung adalah folder yang memuat file itu secara langsung, yaitu Kelas_X. Informatika adalah induk dari Kelas_X, dan D: adalah akarnya.',
    wrong: {
      a: 'D: adalah drive (akar), bukan folder yang langsung memuat file ini.',
      b: 'Informatika memang berada di atasnya, tetapi ia induk dari Kelas_X, bukan dari file.',
      c: 'Tugas1.docx adalah file itu sendiri. File berada di ujung cabang dan tidak dapat memuat apa pun.',
    },
  },
]
