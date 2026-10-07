// src/icons/ComputerIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  'kkkkkkkkkkkk',
  'kcccccccccck',
  'kckkkkkkkkck',
  'kckbbbbbbkck',
  'kckbwwbbbkck',
  'kckbbbbbbkck',
  'kckbwbwbbkck',
  'kckkkkkkkkck',
  'kccccccccgck',
  'kkkkkkkkkkkk',
  '..kkkkkkkk..',
]

export default function ComputerIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
