// src/data/dikaPixels.js
// Data pixel art Dika. Satu huruf = satu kotak (warna ada di PixelArt.css):
//   k = hitam kebiruan, s = kulit, w = putih, r = merah, b = biru,
//   y = kuning, p = pipi merona, '.' = kosong (transparan).
// Dipisah dari komponen supaya gampang diubah tanpa menyentuh logika.

export const WIDTH = 20

// Badan Dika tanpa ekspresi: 20 kolom x 23 baris
export const BASE = [
  '......kkkkkkkk......',
  '.....kkkkkkkkkk.....',
  '....kkkkkkkkkkkk....',
  '....kkkkkkkkkkkk....',
  '....kkkkksskkkkk....',
  '....kksssssssskk....',
  '....kksssssssskk....',
  '....kssssssssssk....',
  '....kssssssssssk....',
  '....kssssssssssk....',
  '....kssssssssssk....',
  '....kssssssssssk....',
  '.....kkkkkkkkkk.....',
  '........kssk........',
  '.....kwwwrrwwwk.....',
  '.....kwwwrrwwwk.....',
  '.....kwwwrrwwwk.....',
  '.....kwwwrrwwwk.....',
  '.....kkkkkkkkkk.....',
  '.....kbbbbbbbbk.....',
  '.....kbbbkkbbbk.....',
  '.....kbbb..bbbk.....',
  '....rrrrr..rrrrr....',
]

// Wajah ditempel di atas BASE mulai kolom 5, baris 5 (tambalan 10 x 7 kotak)
export const FACE_POS = { x: 5, y: 5 }

// Lengan kiri dibuat sekali, lengan kanan otomatis dicerminkan.
// Pose 'chin' (mikir) punya lengan kanan khusus.
export const ARMS = {
  down: { left: { x: 3, y: 14, rows: ['kw', 'kw', 'ks', 'ks'] } },
  up: { left: { x: 0, y: 9, rows: ['ksk..', 'ksk..', 'kwk..', 'kwk..', 'kwk..', 'kwwwk'] } },
  hip: { left: { x: 2, y: 14, rows: ['.kw', 'kw.', 'kw.', '.kw'] } },
  chin: { left: { x: 3, y: 14, rows: ['kw', 'kw', 'ks', 'ks'] }, right: { x: 11, y: 13, rows: ['.kssk.', '.kssk.', '.kwwk.', '.kwwk.', '.kwwk.', '.kkkk.'] } },
}

// Hiasan di luar badan: tanda tanya, tanda seru, kilau, titik-titik mikir
export const SPARK = ['.k.', 'kyk', '.k.']
export const EXTRAS = {
  senang: [],
  bingung: [{ x: 16, y: 1, rows: ['kkk', '..k', '.k.', '...', '.k.'] }],
  mikir: [{ x: 14, y: 0, rows: ['k.k.k'] }],
  kaget: [{ x: 17, y: 0, rows: ['rr', 'rr', 'rr', '..', 'rr'] }],
  semangat: [{ x: 0, y: 1, rows: SPARK }, { x: 17, y: 0, rows: SPARK }],
  sedih: [],
  bangga: [{ x: 0, y: 2, rows: SPARK }, { x: 17, y: 1, rows: SPARK }],
}

// Tujuh ekspresi. rows = wajah, arms = pose lengan, blink = boleh berkedip
export const FACES = {
  senang: {
    arms: 'down',
    blink: true,
    rows: [
      '..........',
      '..........',
      '..wk..wk..',
      '..kk..kk..',
      'p..k..k..p',
      '....kk....',
      '..........',
    ],
  },
  bingung: {
    arms: 'down',
    blink: true,
    rows: [
      '..kk......',
      '......kk..',
      '..wk..wk..',
      '..kk..kk..',
      '.......k..',
      '...kkkk...',
      '..........',
    ],
  },
  mikir: {
    arms: 'chin',
    blink: true,
    rows: [
      '..........',
      '......kk..',
      '..kw..kw..',
      '..kk..kk..',
      '..........',
      '....kk....',
      '..........',
    ],
  },
  kaget: {
    arms: 'down',
    blink: false,
    rows: [
      '..........',
      '.kkk..kkk.',
      '.kwk..kwk.',
      '.kkk..kkk.',
      '....kk....',
      '....kk....',
      '..........',
    ],
  },
  semangat: {
    arms: 'up',
    blink: false,
    rows: [
      '..........',
      '..........',
      '..kk..kk..',
      '.k..kk..k.',
      '..kkkkkk..',
      '...krrk...',
      '..........',
    ],
  },
  sedih: {
    arms: 'down',
    blink: true,
    rows: [
      '...k..k...',
      '..k....k..',
      '..wk..wk..',
      '..kk..kk..',
      '..b.kk....',
      '..bk..k...',
      '..........',
    ],
  },
  bangga: {
    arms: 'hip',
    blink: true,
    rows: [
      '..........',
      '..kk..kk..',
      '..wk..wk..',
      '..kk..kk..',
      'p.k....k.p',
      '...kkkk...',
      '..........',
    ],
  },
}

// Daftar nama ekspresi (dipakai tombol pilihan di halaman cek desain)
export const EXPRESSIONS = Object.keys(FACES)
