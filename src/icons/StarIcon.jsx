// src/icons/StarIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

const LIT = [
  '.....kk.....',
  '.....kk.....',
  '....kyyk....',
  '....kyyk....',
  'kkkkkyyykkkk',
  'kyyyyyyyyyyk',
  '.kyyyyyyyyk.',
  '..kyyyyyyk..',
  '..kyyyyyyk..',
  '.kyyykkyyyk.',
  '.kyyk..kyyk.',
  '.kkk....kkk.',
]

// Bintang kosong = bagian kuning diganti abu-abu
const OFF = LIT.map((row) => row.replaceAll('y', 'e'))

// lit=true -> bintang menyala (misi berhasil), lit=false -> belum dapat
export default function StarIcon({ lit = true, ...props }) {
  return <PixelArt grid={lit ? LIT : OFF} {...props} />
}
