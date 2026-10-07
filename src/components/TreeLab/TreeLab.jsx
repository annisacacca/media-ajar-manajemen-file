// src/components/TreeLab/TreeLab.jsx  (BARU)
// Elemen interaktif utama materi G: mini File Explorer di kiri, diagram pohon di kanan.
// Setiap operasi di Explorer (buat, pindah, salin, ganti nama, hapus, pulihkan) langsung mengubah pohon,
// dan cabang yang baru berubah berkedip lengkap dengan path-nya (sebelum dan sesudah).
//
// Cara kerja: MiniExplorer melaporkan isi file system lewat onChange dan setiap operasi lewat onEvent.
// Urutan kedua laporan itu tidak dijamin, jadi catatan event dihitung ulang setiap render dari
// event terakhir + isi file system terbaru (describeEvent).
import { useCallback, useEffect, useMemo, useState } from 'react'
import MiniExplorer from '../MiniExplorer/MiniExplorer'
import FolderTree from '../FolderTree/FolderTree'
import NodeInfo from '../NodeInfo/NodeInfo'
import { toNodes } from '../../lib/fsModel'
import { describeEvent, treeStats } from '../../lib/treeModel'
import './TreeLab.css'

export default function TreeLab({ initialNodes, startFolder, tries = [] }) {
  const [resetKey, setResetKey] = useState(0)
  const [nodes, setNodes] = useState(() => toNodes(initialNodes))
  const [ev, setEv] = useState(null) // event terakhir dari Explorer
  const [picked, setPicked] = useState(null) // node yang dipilih di pohon
  const [flash, setFlash] = useState({ id: null, n: 0 })

  const onEvent = useCallback((e) => setEv(e), [])
  const info = useMemo(() => describeEvent(ev, nodes), [ev, nodes])

  // Setiap ada operasi baru: pilih cabang yang berubah dan kedipkan
  const evN = ev?.n
  const pick = info?.pick ?? null
  useEffect(() => {
    if (pick) {
      setPicked(pick)
      setFlash((f) => ({ id: pick, n: f.n + 1 }))
    }
  }, [evN, pick])

  const reset = () => {
    setResetKey((k) => k + 1)
    setEv(null)
    setPicked(null)
    setFlash({ id: null, n: 0 })
  }

  // Kalau node terpilih sudah tidak ada di pohon (dihapus), anggap belum ada yang dipilih
  const validPick = picked && nodes[picked] && !nodes[picked].deleted ? picked : null
  const stats = treeStats(nodes)

  return (
    <div className="treelab">
      <div className="treelab__top">
        <ol className="treelab__try">
          {tries.map((t) => <li key={t}>{t}</li>)}
        </ol>
        <button type="button" className="btn btn--paper" onClick={reset}>Mulai ulang latihan</button>
      </div>

      <div className="treelab__grid">
        <MiniExplorer initialNodes={initialNodes} startFolder={startFolder} resetKey={resetKey} onEvent={onEvent} onChange={setNodes} />

        <aside className="treelab__side" aria-label="Diagram pohon dan penjelasan">
          <div className="treelab__box">
            <div className="treelab__bar">Pohon Folder</div>
            <FolderTree nodes={nodes} selectedId={validPick} onSelect={setPicked} flash={flash} maxHeight={300} />
            <p className="treelab__stats">{stats.folders} folder, {stats.files} file, {stats.deepest} tingkat folder</p>
            {stats.deepest > 5 && (
              <p className="treelab__warn" role="note">Sudah lebih dari 5 tingkat folder. Menurut materi, struktur yang lebih dari 4 sampai 5 tingkat menyulitkan penelusuran.</p>
            )}
          </div>

          {info && (
            <div key={ev.n} className="treelab__event" role="status">
              <strong>{info.title}</strong>
              {info.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
          )}

          <NodeInfo nodes={nodes} id={validPick} onPick={setPicked} />
        </aside>
      </div>
    </div>
  )
}
