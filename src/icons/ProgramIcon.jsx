// src/icons/ProgramIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  'kkkkkkkkkkkk',
  'kbbbbbbbrbbk',
  'kkkkkkkkkkkk',
  'kwwwwwwwwwwk',
  'kwwkkkkkkwwk',
  'kwwkggggkwwk',
  'kwwkggggkwwk',
  'kwwkkkkkkwwk',
  'kwwwwwwwwwwk',
  'kkkkkkkkkkkk',
  '............',
]

export default function ProgramIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
