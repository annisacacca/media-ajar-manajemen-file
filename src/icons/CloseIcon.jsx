// src/icons/CloseIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  '.kk......kk.',
  '..kk....kk..',
  '...kk..kk...',
  '....kkkk....',
  '.....kk.....',
  '.....kk.....',
  '....kkkk....',
  '...kk..kk...',
  '..kk....kk..',
  '.kk......kk.',
  '............',
]

export default function CloseIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
