// src/icons/ImageIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  'kkkkkkkkkkkk',
  'kllllllllllk',
  'kllllllyyllk',
  'kllllllyyllk',
  'klllgllllllk',
  'kllgggllgllk',
  'klgggggggglk',
  'kggggggggggk',
  'kdddddddddgk',
  'kkkkkkkkkkkk',
  '............',
]

export default function ImageIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
