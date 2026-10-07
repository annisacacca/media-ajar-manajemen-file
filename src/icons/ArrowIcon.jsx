// src/icons/ArrowIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

// Panah menghadap kanan; arah lain didapat dengan memutarnya
const GRID = [
  '............',
  '......k.....',
  '......kk....',
  '......kkk...',
  'kkkkkkkkkk..',
  'kkkkkkkkkkk.',
  'kkkkkkkkkkk.',
  'kkkkkkkkkk..',
  '......kkk...',
  '......kk....',
  '......k.....',
  '............',
]

const DEG = { right: 0, down: 90, left: 180, up: 270 }

export default function ArrowIcon({ dir = 'right', style, ...props }) {
  return (
    <PixelArt
      grid={GRID}
      style={{ transform: `rotate(${DEG[dir]}deg)`, ...style }}
      {...props}
    />
  )
}
