// src/components/PathBar/PathBar.jsx  (BARU)
// Menampilkan path lengkap sebuah node, dipecah per segmen: D:\Informatika\Kelas_X\Tugas1.docx
// Props:
//   nodes, id   : file system dan node yang path-nya ditampilkan
//   rootAs      : 'drive' | 'folder' (warna segmen pertama)
//   onPick(id)  : kalau diisi, tiap segmen bisa diklik (loncat ke folder itu)
//   reveal      : jumlah segmen yang sudah "menyala" (dipakai pembaca path); default semua
import { Fragment } from 'react'
import { chainOf } from '../../lib/treeModel'
import './PathBar.css'

export default function PathBar({ nodes, id, rootAs = 'drive', onPick, reveal }) {
  const ids = chainOf(nodes, id)
  const shown = reveal ?? ids.length
  return (
    <div className="pathbar" role="group" aria-label="Path lengkap">
      {ids.map((sid, i) => {
        const n = nodes[sid]
        const kind = i === 0 && rootAs === 'drive' ? 'drive' : n.type
        const cls = `pathbar__seg pathbar__seg--${kind} ${i < shown ? 'is-on' : 'is-off'}`
        return (
          <Fragment key={sid}>
            {i > 0 && <span className={`pathbar__sep ${i < shown ? 'is-on' : 'is-off'}`} aria-hidden="true">\</span>}
            {onPick
              ? <button type="button" className={cls} onClick={() => onPick(sid)}>{n.name}</button>
              : <span className={cls}>{n.name}</span>}
          </Fragment>
        )
      })}
      {ids.length === 1 && <span className="pathbar__sep is-on" aria-hidden="true">\</span>}
    </div>
  )
}
