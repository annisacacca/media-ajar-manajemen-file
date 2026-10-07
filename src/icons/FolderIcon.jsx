// src/icons/FolderIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  '.kkkkk......',
  'kyyyyykkkkkk',
  'kooooooooook',
  'kkkkkkkkkkkk',
  'kyyyyyyyyyyk',
  'kyyyyyyyyyyk',
  'kyyyyyyyyyyk',
  'kyyyyyyyyyyk',
  'kyyyyyyyyyyk',
  'kkkkkkkkkkkk',
  '............',
]

export default function FolderIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
