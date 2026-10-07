// src/icons/TrashIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '....kkkk....',
  '.kkkkkkkkkk.',
  '.keeeeeeeek.',
  '.kkkkkkkkkk.',
  '..kekeekek..',
  '..kekeekek..',
  '..kekeekek..',
  '..kekeekek..',
  '..kekeekek..',
  '..kekeekek..',
  '..kkkkkkkk..',
  '............',
]

export default function TrashIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
