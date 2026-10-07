// src/data/materi.js
// Isi teks materi A, B, C. Diambil dari Materi Ajar (diringkas, bukan dikarang).
// Dipisah dari tampilan supaya mudah diedit tanpa menyentuh komponen.

export const MATERI_A = {
  lead: 'Perangkat penyimpanan sebenarnya hanya "lahan kosong" yang tersusun dari blok-blok data. Karena itu sistem operasi punya sistem berkas (file system), sehingga pengguna dan aplikasi cukup menyebut nama file tanpa perlu tahu letak fisik datanya.',
  tasks: [
    { title: 'Mencatat identitas file', text: 'Mencatat nama, lokasi, ukuran, tipe, serta tanggal dibuat dan diubah. Informasi inilah yang tampil di File Explorer.' },
    { title: 'Menyusun struktur folder', text: 'Mengatur file dalam hierarki drive, folder, subfolder, dan file sehingga mudah ditelusuri.' },
    { title: 'Mengalokasikan ruang penyimpanan', text: 'Menentukan bagian penyimpanan yang dipakai file baru dan membebaskannya kembali saat file dihapus.' },
    { title: 'Menyediakan operasi dasar', text: 'Membuat, membuka, menyalin, memindahkan, mengganti nama, dan menghapus file atas permintaan pengguna atau aplikasi.' },
    { title: 'Mengatur akses dan perlindungan', text: 'Menentukan siapa yang boleh membaca atau mengubah file, misalnya atribut read-only dan hak akses antarpengguna.' },
    { title: 'Menghubungkan file dengan aplikasi', text: 'Menentukan aplikasi bawaan untuk membuka suatu file berdasarkan ekstensinya (file association).' },
  ],
  explorerNote: 'File Explorer hanyalah aplikasi antarmuka yang menampilkan hasil kerja sistem operasi. Yang benar-benar mencatat dan menyusun file adalah sistem operasi melalui file system.',
  analogy: [
    { thing: 'Buku', icon: 'DocumentIcon', is: 'File' },
    { thing: 'Rak dan lorong', icon: 'FolderIcon', is: 'Folder' },
    { thing: 'Katalog dan pustakawan', icon: 'ComputerIcon', is: 'Sistem operasi' },
    { thing: 'Layar pencarian katalog', icon: 'FullscreenIcon', is: 'File Explorer' },
  ],
  fileSystems: {
    columns: ['File System', 'Penggunaan Umum', 'Catatan'],
    rows: [
      ['NTFS', 'Drive utama Windows (C:) dan hard disk internal', 'Mendukung file berukuran besar, izin akses, dan fitur keamanan.'],
      ['FAT32', 'Flashdisk lama dan kartu memori', 'Sederhana dan kompatibel luas, tetapi satu file maksimal sekitar 4 GB.'],
      ['exFAT', 'Flashdisk dan SSD eksternal modern', 'Mendukung file besar dan kompatibel dengan Windows maupun macOS.'],
    ],
  },
}

export const MATERI_B = {
  lead: 'File adalah isi yang disimpan, folder adalah wadah untuk menatanya. Kenali bedanya.',
  file: {
    title: 'File (Berkas)',
    text: 'Kumpulan data atau informasi yang saling berkaitan, diberi nama, dan disimpan pada perangkat penyimpanan sebagai satu kesatuan. Isinya bisa teks, angka, gambar, suara, video, atau instruksi program.',
    extra: 'Bagi pengguna, file adalah unit terkecil yang dapat disimpan, dibuka, disalin, dan dihapus. Bagi komputer, file tersusun dari deretan bit (0 dan 1) yang ditafsirkan oleh aplikasi tertentu.',
    examples: ['Tugas_Informatika.docx', 'foto_kelas.jpg', 'lagu.mp3'],
  },
  folder: {
    title: 'Folder (Direktori)',
    text: 'Wadah logis untuk mengelompokkan file dan folder lain. Folder tidak menyimpan "isi" seperti dokumen, tetapi menjadi penanda kelompok agar file tersusun rapi.',
    extra: 'Folder di dalam folder disebut subfolder.',
  },
  // Soal tebak untuk game kecil: nama diambil dari contoh di Materi Ajar
  quiz: [
    { name: 'Tugas_Informatika.docx', folder: false, why: 'Punya ekstensi .docx, jadi ini file dokumen.' },
    { name: 'Tugas_Dika', folder: true, why: 'Tidak punya ekstensi, jadi ini folder.' },
    { name: 'foto_kelas.jpg', folder: false, why: 'Punya ekstensi .jpg, jadi ini file gambar.' },
    { name: 'Kelas_X', folder: true, why: 'Tidak punya ekstensi, jadi ini folder.' },
    { name: 'lagu.mp3', folder: false, why: 'Punya ekstensi .mp3, jadi ini file audio.' },
    { name: 'Arsip', folder: true, why: 'Tidak punya ekstensi, jadi ini folder.' },
  ],
  diff: {
    columns: ['Aspek', 'File', 'Folder'],
    rows: [
      ['Isi', 'Data (teks, gambar, suara, program, dll.)', 'Daftar file dan subfolder'],
      ['Ekstensi', 'Umumnya punya ekstensi (.docx, .jpg, dll.)', 'Tidak punya ekstensi'],
      ['Ikon', 'Sesuai jenis file atau aplikasi pembukanya', 'Ikon map/folder'],
      ['Ukuran', 'Punya ukuran sendiri (KB, MB, GB)', 'Jumlah ukuran seluruh isinya'],
      ['Dibuka dengan', 'Aplikasi yang sesuai', 'File Explorer (menampilkan isinya)'],
      ['Fungsi utama', 'Menyimpan data', 'Mengelompokkan dan menata file'],
    ],
  },
}

export const MATERI_C = {
  lead: 'Setiap file dan folder punya fungsi dan ciri yang dicatat oleh sistem operasi.',
  fileFunctions: [
    { title: 'Menyimpan data secara permanen', text: 'Data tetap ada walaupun komputer dimatikan, berbeda dengan data di memori (RAM) yang hilang saat daya padam.' },
    { title: 'Memindahkan dan membagikan data', text: 'File dapat disalin ke flashdisk, dikirim lewat surel, atau diunggah ke layanan awan.' },
    { title: 'Menjadi unit kerja aplikasi', text: 'Aplikasi membuka, mengubah, dan menyimpan pekerjaan dalam bentuk file.' },
    { title: 'Menyimpan program dan konfigurasi', text: 'Aplikasi dan pengaturan sistem juga berupa file.' },
  ],
  folderFunctions: [
    { title: 'Mengelompokkan file', text: 'File yang berkaitan, misalnya semua tugas Informatika dalam satu folder.' },
    { title: 'Mempermudah pencarian', text: 'Lokasi file mengikuti pola yang logis.' },
    { title: 'Memisahkan file', text: 'Dua file bernama sama boleh ada asalkan berada di folder berbeda.' },
    { title: 'Mengurangi risiko salah hapus', text: 'File penting tidak bercampur dengan file sementara.' },
  ],
  // Karakteristik file (tabel di Materi Ajar). Dipakai demo Properties.
  fileTraits: [
    { id: 'nama', title: 'Nama', text: 'Identitas file yang dibuat pengguna, misalnya Tugas_Informatika.' },
    { id: 'ekstensi', title: 'Ekstensi / tipe', text: 'Akhiran setelah titik yang menunjukkan format, misalnya .docx.' },
    { id: 'ukuran', title: 'Ukuran', text: 'Besar data file dalam byte, KB, MB, atau GB.' },
    { id: 'lokasi', title: 'Lokasi', text: 'Letak file dalam struktur folder, misalnya D:\\Informatika\\Kelas_X.' },
    { id: 'tanggal', title: 'Tanggal', text: 'Waktu file dibuat (Created), diubah (Modified), dan terakhir diakses (Accessed).' },
    { id: 'atribut', title: 'Atribut', text: 'Penanda khusus, misalnya Read-only (hanya baca) dan Hidden (tersembunyi).' },
  ],
  folderTraits: [
    'Memiliki nama, tetapi tidak memiliki ekstensi.',
    'Dapat berisi file dan subfolder dalam jumlah banyak (dibatasi kapasitas penyimpanan).',
    'Nama folder harus unik di dalam folder induk yang sama. Dua folder bernama sama boleh ada jika letak induknya berbeda.',
    'Ukuran folder adalah total ukuran seluruh isinya, sehingga folder kosong berukuran 0 byte.',
  ],
}
