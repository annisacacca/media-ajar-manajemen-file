// src/icons/DocumentIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '.kkkkkkk....',
  '.kwwwwwkk...',
  '.kwwwwwkwk..',
  '.kwwwwwkkkk.',
  '.kwwwwwwwwk.',
  '.kwbbbbbbwk.',
  '.kwwwwwwwwk.',
  '.kwbbbbbbwk.',
  '.kwwwwwwwwk.',
  '.kwbbbbwwwk.',
  '.kwwwwwwwwk.',
  '.kkkkkkkkkk.',
]

export default function DocumentIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
