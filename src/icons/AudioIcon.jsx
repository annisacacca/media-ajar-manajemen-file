// src/icons/AudioIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  '....kkkkkkk.',
  '....kgggggk.',
  '....kgggggk.',
  '....kkkkkgk.',
  '....k...kgk.',
  '....k...kgk.',
  '..kkk.kkkgk.',
  '.kgggkkgggk.',
  '.kgggkkgggk.',
  '..kkk..kkk..',
  '............',
]

export default function AudioIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
