// src/components/InfoCard/InfoCard.jsx
// Kartu kecil berjudul. tone: 'blue' | 'yellow' | 'green' | 'red' (warna garis atas)
import './InfoCard.css'

export default function InfoCard({ title, tone = 'blue', children, className = '' }) {
  return (
    <article className={`icard icard--${tone} ${className}`}>
      <h3 className="icard__title">{title}</h3>
      <div className="icard__body">{children}</div>
    </article>
  )
}
