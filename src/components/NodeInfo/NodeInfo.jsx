// src/components/NodeInfo/NodeInfo.jsx  (BARU)
// Panel penjelasan untuk satu node di pohon: path lengkap, kalimat hubungan (induk, subfolder, isi), dan kedalaman.
// Kalau belum ada node terpilih, tampil ajakan untuk mengklik pohon.
import Dika from '../Dika/Dika'
import PathBar from '../PathBar/PathBar'
import { explainNode } from '../../lib/treeModel'
import './NodeInfo.css'

export default function NodeInfo({ nodes, id, rootAs = 'drive', onPick }) {
  if (!id || !nodes[id]) {
    return (
      <div className="ninfo ninfo--empty">
        <Dika expression="mikir" size={72} />
        <p>Klik salah satu folder atau file di pohon untuk membaca hubungannya dan melihat path-nya.</p>
      </div>
    )
  }
  const info = explainNode(nodes, id, { rootAs })
  const face = info.kind === 'file' ? 'senang' : info.kind === 'root' ? 'semangat' : 'mikir'
  return (
    <div className="ninfo" role="status">
      <PathBar nodes={nodes} id={id} rootAs={rootAs} onPick={onPick} />
      <div className="ninfo__row">
        <Dika expression={face} size={72} />
        {/* key = id: teks tampil dengan animasi setiap pindah node */}
        <div key={id} className="ninfo__text">
          {info.lines.map((l) => <p key={l}>{l}</p>)}
          {info.kind !== 'root' && <p className="ninfo__meta">Letaknya {info.depth} tingkat di bawah akar.</p>}
        </div>
      </div>
    </div>
  )
}
