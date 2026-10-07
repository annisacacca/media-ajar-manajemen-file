// src/icons/FullscreenIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Ikon pixel 12x12. Huruf = warna (lihat PixelArt.css), titik = kosong.
const GRID = [
  '............',
  '.kkk....kkk.',
  '.k........k.',
  '.k........k.',
  '............',
  '............',
  '............',
  '............',
  '.k........k.',
  '.k........k.',
  '.kkk....kkk.',
  '............',
]

export default function FullscreenIcon(props) {
  return <PixelArt grid={GRID} {...props} />
}
