// src/components/PixelArt/PixelArt.jsx
// Mesin penggambar pixel art: mengubah baris-baris teks menjadi <rect> SVG.
// Dipakai oleh semua ikon dan oleh Dika.
import { useMemo } from 'react'
import './PixelArt.css'

// Satu huruf = satu kotak. Kotak sewarna yang berurutan digabung jadi satu <rect>
// supaya SVG ringan.
function toRects(grid) {
  const rects = []
  grid.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const c = row[x]
      if (c === '.') {
        x += 1
        continue
      }
      let end = x
      while (end + 1 < row.length && row[end + 1] === c) end += 1
      rects.push({ x, y, w: end - x + 1, c })
      x = end + 1
    }
  })
  return rects
}

export default function PixelArt({
  grid,
  size = 48, // lebar dalam px (atau teks CSS seperti '100%')
  title, // kalau diisi, gambar dibacakan pembaca layar; kalau tidak, disembunyikan
  className = '',
  children, // elemen SVG tambahan yang digambar di atas kotak-kotak
  ...rest
}) {
  const cols = grid[0].length
  const rows = grid.length
  const rects = useMemo(() => toRects(grid), [grid])
  const height = typeof size === 'number' ? (size * rows) / cols : undefined

  return (
    <svg
      className={`pixel-art ${className}`}
      viewBox={`0 0 ${cols} ${rows}`}
      width={size}
      height={height}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} className={`px-${r.c}`} />
      ))}
      {children}
    </svg>
  )
}
