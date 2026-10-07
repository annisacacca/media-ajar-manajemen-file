// src/components/FileTile/FileTile.jsx
// Ikon + nama file/folder. Ikon dipilih otomatis dari ekstensi (lihat data/fileTypes.js).
// File tanpa ekstensi dikenali sebagai "tidak dikenal" dan diberi tanda tanya.
import * as Icons from '../../icons'
import { typeOf } from '../../data/fileTypes'
import './FileTile.css'

export default function FileTile({ name, folder = false, size = 48, className = '' }) {
  const info = folder ? null : typeOf(name)
  const Icon = folder ? Icons.FolderIcon : Icons[info.icon]
  return (
    <span className={`ftile ${info?.unknown ? 'ftile--unknown' : ''} ${className}`}>
      <span className="ftile__icon">
        <Icon size={size} />
        {info?.unknown && <span className="ftile__q" aria-hidden="true">?</span>}
      </span>
      <span className="ftile__name">{name}</span>
    </span>
  )
}
