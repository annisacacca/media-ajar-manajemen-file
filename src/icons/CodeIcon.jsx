// src/icons/CodeIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  'kkkkkkkkkkkk',
  'kbbbbbbbbbbk',
  'kbbwbbybwbbk',
  'kbwbbbybbwbk',
  'kwbbbbybbbwk',
  'kwbbbybbbbwk',
  'kbwbbybbbwbk',
  'kbbwbybbwbbk',
  'kbbbbbbbbbbk',
  'kkkkkkkkkkkk',
  '............',
]

export default function CodeIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
