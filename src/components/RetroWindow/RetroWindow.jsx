// src/components/RetroWindow/RetroWindow.jsx
// "Jendela aplikasi" retro: title bar + tiga tombol kecil + bayangan keras.
// tone: 'blue' | 'yellow' | 'red' | 'green' (warna title bar)
import './RetroWindow.css'

export default function RetroWindow({
  title,
  icon, // elemen ikon kecil di kiri judul, misalnya <FolderIcon size={28} />
  tone = 'blue',
  as: Tag = 'section',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag className={`win win--${tone} ${className}`} {...rest}>
      <header className="win__bar">
        {icon && <span className="win__icon" aria-hidden="true">{icon}</span>}
        <h2 className="win__title">{title}</h2>
        {/* Tombol hiasan, bukan tombol sungguhan */}
        <span className="win__btns" aria-hidden="true">
          <i /><i /><i />
        </span>
      </header>
      <div className="win__body">{children}</div>
    </Tag>
  )
}
