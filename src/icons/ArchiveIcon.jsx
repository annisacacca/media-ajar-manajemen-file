// src/icons/ArchiveIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  'kkkkkkkkkkkk',
  'koooorrooook',
  'koooowkooook',
  'kooookwooook',
  'koooowkooook',
  'kooookwooook',
  'koooowkooook',
  'kooookwooook',
  'koooowkooook',
  'kkkkkkkkkkkk',
  '............',
]

export default function ArchiveIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
