// src/data/penutup.js
// Isi bagian Penutup. Kesimpulan dan kebiasaan diambil dari Materi A sampai G (diringkas, bukan dikarang).
// Data pembuat ada di PEMBUAT: ganti di sini kalau ada yang berubah.

export const PEMBUAT = {
  nama: 'Annisa Fitriani Lestari',
  github: 'annisacacca',
  instagram: 'annisacacca',
}

export const PENUTUP_LEAD = 'Tugas Dika sudah terselamatkan. Sekarang saatnya mengingat kembali apa yang sudah kamu pelajari, merenungkannya, lalu membawanya ke komputermu sendiri.'

// Tab 1: kesimpulan, satu butir per materi
export const KESIMPULAN = [
  { kode: 'A', title: 'Peran sistem operasi', text: 'Sistem operasi, melalui file system, yang mencatat identitas file, menyusun folder, dan mengatur ruang penyimpanan. File Explorer hanya menampilkan hasilnya.', tone: 'blue' },
  { kode: 'B', title: 'File dan folder', text: 'File adalah isi yang disimpan. Folder adalah wadah untuk mengelompokkan dan menata file.', tone: 'green' },
  { kode: 'C', title: 'Fungsi dan karakteristik', text: 'File menyimpan data secara permanen dan menjadi unit kerja aplikasi. Folder mengelompokkan, mempermudah pencarian, dan mengurangi risiko salah hapus.', tone: 'yellow' },
  { kode: 'D', title: 'Nama, format, ekstensi', text: 'Nama memberi tahu isi file kepada manusia. Ekstensi memberi tahu jenisnya kepada sistem operasi, jadi jangan diganti sembarangan.', tone: 'red' },
  { kode: 'E', title: 'Jenis file', text: 'Ekstensi adalah petunjuk utama jenis file: .pdf untuk tugas yang tidak perlu diedit, .png dan .jpg untuk gambar, .zip untuk banyak file sekaligus. Waspadai .exe dari sumber tidak dikenal.', tone: 'blue' },
  { kode: 'F', title: 'Lima operasi dasar', text: 'Buat, salin, pindah, ganti nama, dan hapus. Salin file penting sebelum mengubahnya, dan periksa dulu sebelum menghapus.', tone: 'green' },
  { kode: 'G', title: 'Direktori dan struktur', text: 'File tersusun dalam hierarki pohon dari akar (drive). Kelompokkan menurut fungsi atau jenis, buat konsisten, dan jangan terlalu dalam.', tone: 'yellow' },
]

// Tab 2: pertanyaan refleksi diri (tidak ada jawaban tunggal), plus petunjuk dari materi
export const REFLEKSI = [
  { q: 'Seberapa rapi Desktop atau folder Downloads-mu sekarang? Kebiasaan apa yang paling ingin kamu ubah?', hint: 'Ingat, file yang menumpuk di satu tempat membuat pencarian lama dan menambah risiko salah hapus.' },
  { q: 'Dari lima operasi dasar, mana yang paling sering kamu pakai, dan mana yang paling berisiko jika salah?', hint: 'Pikirkan perbedaan Delete dan Shift + Delete, serta perbedaan menyalin dan memindahkan.' },
  { q: 'Jika temanmu mengirim file tanpa ekstensi, apa langkahmu supaya file itu bisa dibuka?', hint: 'Selidiki dulu jenis isinya, lalu tambahkan ekstensi yang benar pada namanya.' },
]

// Tab 3: kebiasaan baik yang bisa dicentang siswa
export const KEBIASAAN = [
  { id: 'nama', text: 'Beri nama file yang jelas, bukan "Document1" atau "tugas baru banget final (2)".' },
  { id: 'folder', text: 'Kelompokkan file ke folder menurut fungsi atau jenisnya, dengan pola nama yang konsisten.' },
  { id: 'cadangan', text: 'Salin file penting sebagai cadangan sebelum memindahkan, menimpa, atau menghapus.' },
  { id: 'ekstensi', text: 'Jangan ubah ekstensi file kecuali memahami akibatnya.' },
  { id: 'arsip', text: 'Pindahkan file yang sudah selesai ke folder Arsip agar folder kerja tetap ringan.' },
]
