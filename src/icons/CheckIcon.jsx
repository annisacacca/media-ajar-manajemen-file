// src/icons/CheckIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  '..........kk',
  '.........kgk',
  '........kggk',
  '.......kggk.',
  'kk....kggk..',
  'kgk..kggk...',
  '.kgkkggk....',
  '..kggggk....',
  '...kggk.....',
  '....kk......',
  '............',
]

export default function CheckIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
