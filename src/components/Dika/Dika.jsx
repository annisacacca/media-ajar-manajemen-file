// src/components/Dika/Dika.jsx
// Maskot Dika. Cara pakai: <Dika expression="bingung" size={200} />
// Ekspresi: senang, bingung, mikir, kaget, semangat, sedih, bangga
import { useMemo } from 'react'
import PixelArt from '../PixelArt/PixelArt'
import { BASE, WIDTH, FACE_POS, FACES, ARMS, EXTRAS } from '../../data/dikaPixels'
import './Dika.css'

// Tempel tambalan (patch) ke kisi. Titik '.' = transparan, jadi tidak menimpa apa pun.
function stamp(grid, { x, y, rows }) {
  rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i += 1) {
      if (row[i] !== '.' && grid[y + j] && x + i < WIDTH) grid[y + j][x + i] = row[i]
    }
  })
}

// Cerminkan tambalan ke sisi kanan (dipakai untuk lengan)
function mirror({ x, y, rows }) {
  return { x: WIDTH - x - rows[0].length, y, rows: rows.map((r) => [...r].reverse().join('')) }
}

function buildGrid(expression) {
  const face = FACES[expression]
  const grid = BASE.map((row) => [...row])
  stamp(grid, { ...FACE_POS, rows: face.rows })
  const arms = ARMS[face.arms]
  stamp(grid, arms.left)
  stamp(grid, arms.right ?? mirror(arms.left))
  EXTRAS[expression].forEach((e) => stamp(grid, e))
  return grid.map((row) => row.join(''))
}

export default function Dika({ expression = 'senang', size = 160, idle = true, className = '' }) {
  const face = FACES[expression] ?? FACES.senang
  const grid = useMemo(() => buildGrid(expression in FACES ? expression : 'senang'), [expression])

  return (
    <span className={`dika ${idle ? '' : 'dika--still'} ${className}`}>
      {/* key = ekspresi: setiap ganti ekspresi, animasi "pop" diputar ulang */}
      <PixelArt key={expression} grid={grid} size={size} className="dika__art" title={`Dika, ekspresi ${expression}`}>
        {/* Kelopak mata: muncul sebentar untuk berkedip (mata di kolom 7-8 dan 11-12, baris 7-8) */}
        {face.blink && (
          <g className="dika__lid">
            <rect x="7" y="7" width="2" height="2" className="px-s" />
            <rect x="11" y="7" width="2" height="2" className="px-s" />
            <rect x="7" y="8" width="2" height="1" className="px-k" />
            <rect x="11" y="8" width="2" height="1" className="px-k" />
          </g>
        )}
      </PixelArt>
    </span>
  )
}
