// src/data/fileTypes.js  (DIGANTI: menambah ekstensi, aplikasi pembuka, dan fungsi)
// Peta ekstensi -> ikon, jenis, aplikasi, fungsi. Dipakai FileTile, ExtensionLab (materi D),
// dan nanti mini File Explorer. Sumber: Materi Ajar bagian E (tabel jenis file).
//   icon : nama komponen ikon di src/icons
//   kind : jenis (untuk ditampilkan)
//   app  : aplikasi pembuka bawaan (file association)
//   fn   : fungsi singkat file itu
export const FILE_TYPES = {
  docx: { icon: 'DocumentIcon', kind: 'Dokumen', app: 'Microsoft Word', fn: 'Dokumen teks terformat' },
  xlsx: { icon: 'DocumentIcon', kind: 'Dokumen', app: 'Microsoft Excel', fn: 'Lembar kerja berisi tabel, rumus, dan grafik' },
  pptx: { icon: 'DocumentIcon', kind: 'Dokumen', app: 'Microsoft PowerPoint', fn: 'Presentasi berupa slide' },
  pdf: { icon: 'DocumentIcon', kind: 'Dokumen', app: 'Pembaca PDF', fn: 'Dokumen dengan tampilan tetap di semua perangkat' },
  txt: { icon: 'DocumentIcon', kind: 'Dokumen', app: 'Notepad', fn: 'Teks polos tanpa format' },
  jpg: { icon: 'ImageIcon', kind: 'Gambar', app: 'Photos', fn: 'Foto, kompresi tinggi' },
  jpeg: { icon: 'ImageIcon', kind: 'Gambar', app: 'Photos', fn: 'Foto, kompresi tinggi' },
  png: { icon: 'ImageIcon', kind: 'Gambar', app: 'Photos', fn: 'Gambar dengan latar transparan' },
  mp3: { icon: 'AudioIcon', kind: 'Audio', app: 'Media Player', fn: 'Musik dan rekaman suara' },
  wav: { icon: 'AudioIcon', kind: 'Audio', app: 'Media Player', fn: 'Audio tanpa kompresi' },
  mp4: { icon: 'VideoIcon', kind: 'Video', app: 'Media Player', fn: 'Video terkompresi' },
  py: { icon: 'CodeIcon', kind: 'Kode program', app: 'Python / VS Code', fn: 'Kode program Python' },
  html: { icon: 'CodeIcon', kind: 'Kode program', app: 'Peramban', fn: 'Halaman web' },
  js: { icon: 'CodeIcon', kind: 'Kode program', app: 'VS Code', fn: 'Skrip halaman web' },
  css: { icon: 'CodeIcon', kind: 'Kode program', app: 'VS Code', fn: 'Gaya halaman web' },
  java: { icon: 'CodeIcon', kind: 'Kode program', app: 'IDE terkait', fn: 'Kode program Java' },
  c: { icon: 'CodeIcon', kind: 'Kode program', app: 'IDE terkait', fn: 'Kode program C' },
  cpp: { icon: 'CodeIcon', kind: 'Kode program', app: 'IDE terkait', fn: 'Kode program C++' },
  zip: { icon: 'ArchiveIcon', kind: 'Arsip', app: 'File Explorer', fn: 'Mengemas banyak file menjadi satu' },
  rar: { icon: 'ArchiveIcon', kind: 'Arsip', app: '7-Zip / WinRAR', fn: 'Arsip terkompresi' },
  '7z': { icon: 'ArchiveIcon', kind: 'Arsip', app: '7-Zip / WinRAR', fn: 'Arsip terkompresi' },
  exe: { icon: 'ProgramIcon', kind: 'Program', app: 'Dijalankan langsung oleh Windows', fn: 'Program yang dapat dijalankan' },
  msi: { icon: 'ProgramIcon', kind: 'Program', app: 'Dijalankan langsung oleh Windows', fn: 'Pemasang aplikasi' },
}

// Ambil info jenis dari nama file. Tanpa ekstensi atau ekstensi asing => unknown
// (sistem tidak tahu aplikasi pembukanya).
export function typeOf(name) {
  const dot = name.lastIndexOf('.')
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : ''
  const found = FILE_TYPES[ext]
  return found
    ? { ...found, ext, unknown: false }
    : { icon: 'DocumentIcon', kind: 'Tidak dikenal', app: null, fn: '', ext, unknown: true }
}
