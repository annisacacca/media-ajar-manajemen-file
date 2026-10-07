// src/components/ExampleTree/ExampleTree.jsx  (BARU)
// Pohon contoh (tidak bisa diubah) yang node-nya bisa diklik. Klik node -> label hubungan di pohon
// berubah, rantai induknya menyala, dan NodeInfo menjelaskan hubungan serta path-nya.
// Dipakai untuk contoh soal formatif (materi G.2) dan rancangan struktur Tugas Dika (materi G.4).
import { useMemo, useState } from 'react'
import FolderTree from '../FolderTree/FolderTree'
import NodeInfo from '../NodeInfo/NodeInfo'
import { toNodes } from '../../lib/fsModel'
import './ExampleTree.css'

export default function ExampleTree({ list, startId, rootAs = 'drive', label }) {
  const nodes = useMemo(() => toNodes(list), [list])
  const [picked, setPicked] = useState(startId)
  return (
    <div className="extree">
      <FolderTree nodes={nodes} rootAs={rootAs} selectedId={picked} onSelect={setPicked} label={label} />
      <NodeInfo nodes={nodes} id={picked} rootAs={rootAs} onPick={setPicked} />
    </div>
  )
}
