// src/icons/VideoIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  'kkkkkkkkkkkk',
  'krrrrrrrrrrk',
  'krwwrrrrrrrk',
  'krwwwwrrrrrk',
  'krwwwwwwrrrk',
  'krwwwwwwrrrk',
  'krwwwwrrrrrk',
  'krwwrrrrrrrk',
  'krrrrrrrrrrk',
  'kkkkkkkkkkkk',
  '............',
]

export default function VideoIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
