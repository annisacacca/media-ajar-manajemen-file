// src/data/materiDE.js  (BARU)
// Isi teks materi D dan E. Diambil dari Materi Ajar bagian D dan E (diringkas, bukan dikarang).
// Dipisah dari materi.js supaya file Tahap 3 tidak perlu disentuh.

export const MATERI_D = {
  lead: 'Nama file memberi tahu isinya ke manusia, sedangkan ekstensi memberi tahu jenisnya ke sistem operasi.',
  anatomy: [
    { id: 'nama', title: 'Nama file', text: 'Menjelaskan isi atau tujuan file dan dipilih oleh pengguna.' },
    { id: 'ekstensi', title: 'Ekstensi', text: 'Menunjukkan format file dan dipakai sistem operasi untuk memilih aplikasi pembuka.' },
  ],
  // Aturan penamaan di Windows (Materi Ajar D.2)
  forbiddenChars: ['\\', '/', ':', '*', '?', '"', '<', '>', '|'],
  reserved: ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'LPT1'],
  existingFiles: ['Tugas.docx'], // contoh isi folder untuk menguji aturan huruf besar/kecil
  rulesExtra: 'Panjang path lengkap (drive sampai nama file) pada banyak aplikasi dibatasi sekitar 260 karakter.',
  nameExamples: ['Tugas_Informatika.docx', 'data???.xlsx', 'CON.docx', 'tugas.docx', 'laporan.', 'tugas baru banget final (2).docx'],
  // Kebiasaan baik (Materi Ajar D.3)
  goodNames: {
    columns: ['Kurang baik', 'Lebih baik'],
    rows: [
      ['tugas baru banget final (2).docx', 'Tugas_Informatika_Dika_2026-10-07.docx'],
      ['foto1.jpg', 'Foto_Kegiatan_Praktikum_Jaringan.jpg'],
      ['New Document.docx', 'Laporan_Praktikum_SO.docx'],
      ['data???.xlsx (karakter terlarang)', 'Data_Nilai_KelasX.xlsx'],
    ],
  },
  habits: [
    'Gunakan nama yang deskriptif (isi, mata pelajaran, tanggal).',
    'Gunakan garis bawah (_) atau tanda hubung (-) sebagai pengganti spasi agar rapi dan aman untuk program.',
    'Gunakan format tanggal TTTT-BB-HH (misal 2026-10-07) supaya urutan nama sama dengan urutan waktu.',
    'Hindari kata ambigu seperti "baru", "final", atau "revisi terakhir" tanpa penanda versi (v1, v2).',
  ],
  // Format file (Materi Ajar D.4)
  formats: {
    intro: 'Format file adalah aturan penyusunan data di dalam file sehingga dapat dibaca aplikasi yang tepat. Berdasarkan cara datanya disimpan, format file dibagi dua.',
    text: {
      title: 'Format teks (plain text)',
      text: 'Isinya berupa karakter yang bisa dibaca manusia. File jenis ini dapat dibuka dengan Notepad.',
      examples: ['catatan.txt', 'data.csv', 'index.html', 'program.py'],
    },
    binary: {
      title: 'Format biner',
      text: 'Isinya berupa kode yang hanya dipahami aplikasi tertentu. Jika dibuka dengan Notepad, tampilannya berupa karakter acak.',
      examples: ['foto_kelas.jpg', 'lagu.mp3', 'video.mp4', 'aplikasi.exe'],
    },
    note: 'Banyak format modern sebenarnya adalah arsip terkompresi. File .docx, .xlsx, dan .pptx tersusun dari kumpulan file XML yang dikemas dalam format ZIP.',
  },
  // Ekstensi dan aplikasi (Materi Ajar D.5)
  extension: {
    def: 'Ekstensi adalah akhiran nama file setelah titik terakhir, biasanya 2 sampai 5 karakter. Windows menyimpan daftar yang memasangkan setiap ekstensi dengan aplikasi bawaannya (file association).',
    important: 'Mengubah nama foto.png menjadi foto.pdf tidak membuat gambar menjadi PDF. Isi file tetap gambar, hanya "label"-nya yang salah. Untuk berpindah format, gunakan fitur Save As atau Export pada aplikasi yang sesuai.',
    causes: [
      { title: 'Ekstensi hilang atau terhapus', text: 'Seperti file "laporan_praktikum" milik teman Dika. Sistem tidak tahu aplikasi pembukanya.', tone: 'red' },
      { title: 'Ekstensi diganti sembarangan', text: 'Misalnya .docx menjadi .jpg. Aplikasi akan gagal menafsirkan isinya.', tone: 'yellow' },
      { title: 'Aplikasi pembuka belum terpasang', text: 'Komputer tidak punya aplikasi yang cocok dengan format file itu.', tone: 'blue' },
      { title: 'File rusak', text: 'Terjadi karena gagal unduh atau penyimpanan terputus.', tone: 'green' },
    ],
  },
  // Menampilkan ekstensi (Materi Ajar D, langkah-langkah)
  showSteps: [
    'Buka File Explorer (tekan tombol Windows + E).',
    'Klik tab/menu View.',
    'Pada kelompok Show (Windows 10: tab View, kelompok Show/hide; Windows 11: menu View lalu Show), centang File name extensions.',
    'Periksa bahwa nama file kini tampil lengkap, misalnya Tugas_Informatika.docx.',
  ],
  showTip: 'Tampilan ekstensi sebaiknya selalu diaktifkan. Selain memudahkan mengenali jenis file, hal ini membantu menemukan file berbahaya yang menyamar dengan ekstensi ganda seperti tugas.pdf.exe, yang tampak seperti dokumen tetapi sebenarnya program.',
  // Isi mini File Explorer pada demo "tampilkan ekstensi"
  showFiles: ['Tugas_Informatika.docx', 'foto_kelas.jpg', 'lagu.mp3', 'tugas.pdf.exe'],
}

export const MATERI_E = {
  lead: 'File dapat dikelompokkan berdasarkan jenis isi dan fungsinya. Ekstensi adalah petunjuk utamanya.',
  // Tabel jenis file (Materi Ajar E). tone = warna kategori
  table: [
    { category: 'Dokumen', tone: 'blue', rows: [
      { ext: '.docx', fn: 'Dokumen teks terformat (laporan, makalah, tugas)', app: 'Microsoft Word, LibreOffice Writer' },
      { ext: '.xlsx', fn: 'Lembar kerja berisi tabel, rumus, dan grafik', app: 'Microsoft Excel, LibreOffice Calc' },
      { ext: '.pptx', fn: 'Presentasi berupa slide', app: 'Microsoft PowerPoint, LibreOffice Impress' },
      { ext: '.pdf', fn: 'Dokumen dengan tampilan tetap di semua perangkat', app: 'Peramban, Adobe Acrobat' },
      { ext: '.txt', fn: 'Teks polos tanpa format', app: 'Notepad' },
    ] },
    { category: 'Gambar', tone: 'green', rows: [
      { ext: '.jpg / .jpeg', fn: 'Foto, kompresi tinggi dengan sedikit kehilangan kualitas', app: 'Photos, peramban, aplikasi editor foto' },
      { ext: '.png', fn: 'Gambar dengan latar transparan, cocok untuk logo dan tangkapan layar', app: 'Photos, peramban, aplikasi editor gambar' },
    ] },
    { category: 'Audio', tone: 'yellow', rows: [
      { ext: '.mp3', fn: 'Musik dan rekaman suara terkompresi', app: 'Media Player, VLC' },
      { ext: '.wav', fn: 'Audio tanpa kompresi, berkualitas tinggi tetapi berukuran besar', app: 'Media Player, VLC' },
    ] },
    { category: 'Video', tone: 'yellow', rows: [
      { ext: '.mp4', fn: 'Video terkompresi yang paling umum', app: 'Media Player, VLC' },
    ] },
    { category: 'Kode program', tone: 'red', rows: [
      { ext: '.py', fn: 'Kode program bahasa Python', app: 'Python, VS Code, IDLE' },
      { ext: '.html', fn: 'Halaman web', app: 'Peramban, VS Code' },
      { ext: '.js / .css', fn: 'Skrip dan gaya halaman web', app: 'VS Code' },
      { ext: '.java / .c / .cpp', fn: 'Kode program Java, C, dan C++', app: 'IDE terkait, VS Code' },
    ] },
    { category: 'Arsip', tone: 'blue', rows: [
      { ext: '.zip', fn: 'Mengemas dan memampatkan banyak file menjadi satu', app: 'File Explorer, 7-Zip, WinRAR' },
      { ext: '.rar / .7z', fn: 'Arsip terkompresi dengan rasio mampat lebih tinggi', app: '7-Zip, WinRAR' },
    ] },
    { category: 'Program', tone: 'green', rows: [
      { ext: '.exe / .msi', fn: 'Program atau pemasang aplikasi yang dapat dijalankan', app: 'Dijalankan langsung oleh Windows' },
    ] },
  ],
  // Tips memilih format (Materi Ajar E)
  tips: [
    { title: 'Tugas yang tidak perlu diedit', text: 'Kirim dalam bentuk .pdf agar tampilan tidak berubah di perangkat lain.', tone: 'blue', files: ['laporan.pdf'] },
    { title: 'Gambar', text: 'Gunakan .png untuk tangkapan layar dan logo, .jpg untuk foto.', tone: 'green', files: ['logo.png', 'foto_kelas.jpg'] },
    { title: 'Banyak file sekaligus', text: 'Gunakan .zip untuk mengirim banyak file sekaligus atau menyatukan satu folder proyek.', tone: 'yellow', files: ['proyek.zip'] },
    { title: 'Waspada', text: 'Waspadai file .exe dari sumber tidak dikenal, sebab dapat berisi program berbahaya.', tone: 'red', files: ['aplikasi.exe'] },
  ],
  // Kegiatan klasifikasi: sepuluh ekstensi dari Materi Ajar (urutan sengaja diacak)
  categories: [
    { id: 'dokumen', label: 'Dokumen', icon: 'DocumentIcon', tone: 'blue' },
    { id: 'gambar', label: 'Gambar', icon: 'ImageIcon', tone: 'green' },
    { id: 'av', label: 'Audio / Video', icon: 'VideoIcon', tone: 'yellow' },
    { id: 'kode', label: 'Kode Program', icon: 'CodeIcon', tone: 'red' },
    { id: 'arsip', label: 'Arsip', icon: 'ArchiveIcon', tone: 'blue' },
  ],
  classify: [
    { name: 'foto_kelas.jpg', cat: 'gambar' },
    { name: 'Tugas_Informatika.docx', cat: 'dokumen' },
    { name: 'lagu.mp3', cat: 'av' },
    { name: 'proyek.zip', cat: 'arsip' },
    { name: 'program.py', cat: 'kode' },
    { name: 'presentasi.pptx', cat: 'dokumen' },
    { name: 'logo.png', cat: 'gambar' },
    { name: 'video.mp4', cat: 'av' },
    { name: 'Data_Nilai_KelasX.xlsx', cat: 'dokumen' },
    { name: 'laporan.pdf', cat: 'dokumen' },
  ],
}
