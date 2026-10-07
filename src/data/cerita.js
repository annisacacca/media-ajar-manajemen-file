// src/data/cerita.js
// Cerita Pembuka "Misi Menyelamatkan Tugas Dika", dipecah jadi 4 babak.
// Kalimatnya diambil dari Materi Ajar (kotak Cerita Pembuka).
export const CERITA_BEATS = [
  { dika: 'kaget', text: 'Dika punya tugas Informatika yang harus dikumpulkan besok pagi.' },
  { dika: 'bingung', text: 'Namun laptopnya berantakan: ratusan file menumpuk di Desktop, dan Dika tidak yakin file mana yang tugas, mana yang foto, mana yang file cadangan.' },
  { dika: 'sedih', text: 'Ada juga file kiriman temannya yang tidak bisa dibuka.' },
  { dika: 'semangat', text: 'Dika butuh bantuanmu untuk memahami apa itu file dan folder, bagaimana mengenali jenisnya, dan bagaimana menatanya agar tugasnya cepat ditemukan dan tidak terhapus tanpa sengaja.' },
]

// Contoh file berantakan di Desktop Dika (nama-nama dari contoh di Materi Ajar). x,y = posisi %, r = miring (derajat)
export const DESKTOP_FILES = [
  { name: 'tugas baru banget final (2).docx', x: 3, y: 5, r: -6 },
  { name: 'New Document (3).docx', x: 34, y: 9, r: 5 },
  { name: 'foto_kelas.jpg', x: 64, y: 4, r: -4 },
  { name: 'Cadangan_Tugas.zip', x: 8, y: 36, r: 7 },
  { name: 'lagu.mp3', x: 38, y: 40, r: -8 },
  { name: 'Data_Nilai_KelasX.xlsx', x: 62, y: 34, r: 4 },
  { name: 'Presentasi_Kelompok.pptx', x: 2, y: 64, r: -3 },
  { name: 'New Document (2).docx', x: 30, y: 66, r: 6 },
  { name: 'Laporan_Praktikum_SO.pdf', x: 56, y: 62, r: -5 },
]

// File kiriman teman Dika: ekstensinya hilang
export const FRIEND_FILE = { name: 'laporan_praktikum', x: 80, y: 62, r: 3 }
