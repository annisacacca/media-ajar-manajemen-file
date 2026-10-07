// src/components/StarBurst/StarBurst.jsx  (BARU)
// Efek bintang menyebar saat berhasil. Letakkan di dalam elemen yang position: relative,
// lalu ganti `key` setiap kali efek harus diputar ulang: <StarBurst key={n} />
// Dipakai ulang di misi (Tahap 7) dan kuis (Tahap 8).
import { StarIcon } from '../../icons'
import './StarBurst.css'

const COUNT = 8

export default function StarBurst({ size = 26 }) {
  return (
    <span className="burst" aria-hidden="true">
      {Array.from({ length: COUNT }, (_, i) => (
        // Tiap bintang diberi sudut berbeda lewat variabel CSS --a
        <span key={i} className="burst__star" style={{ '--a': `${(360 / COUNT) * i}deg`, '--d': `${(i % 2) * 14}px` }}>
          <StarIcon size={size} />
        </span>
      ))}
    </span>
  )
}
