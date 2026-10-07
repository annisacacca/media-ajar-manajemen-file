// src/components/sections/MisiSection/MisiSection.jsx  (DIGANTI)
// Tahap 7: lima misi dikerjakan LANGSUNG di mini File Explorer (simulasi) dan diperiksa otomatis.
// Mode belajar mandiri: tanpa guru, tanpa bintang, tanpa database (semua di memori selama halaman terbuka).
// Peran kelompok di LKPD: kamu = operator; pencatat = "Catatan Langkah" otomatis.
import { useState } from 'react'
import Dika from '../../Dika/Dika'
import RetroWindow from '../../RetroWindow/RetroWindow'
import MissionCard from '../../MissionCard/MissionCard'
import MiniExplorer from '../../MiniExplorer/MiniExplorer'
import { CheckIcon, FolderIcon, StarIcon, DocumentIcon } from '../../../icons'
import { MISI, DIKA_NODES, DIKA_ID } from '../../../data/misi'
import { evaluate } from '../../../lib/misiCheck'
import { toNodes } from '../../../lib/fsModel'
import './MisiSection.css'

// Saat kembali ke halaman ini, file system dipulihkan. Id bawaan explorer (n1000, ...) diberi awalan "r"
// supaya tidak bentrok dengan id baru yang dibuat setelah explorer dimulai ulang.
const restore = (nodes) => Object.values(nodes).map((n) => ({ ...n, id: n.id.startsWith('n') ? `r${n.id}` : n.id, parent: n.parent && n.parent.startsWith('n') ? `r${n.parent}` : n.parent }))

export default function MisiSection({ lesson }) {
  if (!lesson.state.missionUnlocked) {
    return (
      <RetroWindow title="Misi.exe" tone="red" icon={<StarIcon size={28} />}>
        <div className="misi">
          <Dika expression="mikir" size={200} />
          <div>
            <h2>Siap menyelamatkan tugas Dika?</h2>
            <p>Ada lima misi di File Explorer simulasi. Pastikan kamu sudah membaca Materi A sampai G.</p>
            <button type="button" className="btn btn--red" onClick={lesson.unlockMission}>Mulai Misi</button>
          </div>
        </div>
      </RetroWindow>
    )
  }
  return <MisiLab lesson={lesson} />
}

function MisiLab({ lesson }) {
  const { misi } = lesson.state
  const [active, setActive] = useState(0)
  const [base, setBase] = useState(() => (misi.nodes ? restore(misi.nodes) : DIKA_NODES)) // dihitung sekali saat masuk
  const [resetKey, setResetKey] = useState(0)

  const ev = evaluate(misi.nodes ?? toNodes(DIKA_NODES), misi)
  const doneOf = (i) => MISI[i].items.every((_, j) => misi.ticks[`m${i}-${j}`])
  const total = MISI.filter((_, i) => doneOf(i)).length

  const startOver = () => { lesson.misiReset(); setBase(DIKA_NODES); setActive(0); setResetKey((k) => k + 1) }

  return (
    <div className="misi-grid">
      <RetroWindow title="Kemajuan_Misi.exe" tone="yellow" icon={<StarIcon size={28} />}>
        <div className="misi__board">
          <Dika expression={total === 5 ? 'senang' : 'semangat'} size={110} />
          <div className="misi__tabs" role="tablist" aria-label="Pilih misi">
            {MISI.map((m, i) => (
              <button key={m.id} type="button" role="tab" aria-selected={i === active} className={`misi__tab ${i === active ? 'is-on' : ''}`} onClick={() => setActive(i)}>
                {doneOf(i) ? <CheckIcon size={32} /> : <StarIcon lit={false} size={32} />}
                <span>{m.nomor}. {m.kunci}</span>
              </button>
            ))}
          </div>
          <p className="misi__total"><strong>{total}</strong> dari 5 misi selesai</p>
        </div>
        {total === 5 && <p className="misi__done">Tugas Dika berhasil diselamatkan! Lanjut ke Kuis di bagian berikutnya.</p>}
      </RetroWindow>

      <MissionCard key={MISI[active].id} misi={MISI[active]} ticks={misi.ticks} tip={ev.tips[active]} isLast={active === 4} onNext={() => setActive((a) => Math.min(4, a + 1))} />

      <RetroWindow title={`Explorer - ${DIKA_ID}`} tone="blue" icon={<FolderIcon size={28} />}>
        <MiniExplorer initialNodes={base} startFolder={DIKA_ID} resetKey={resetKey} onEvent={lesson.misiEvent} onChange={lesson.misiSync} />
      </RetroWindow>

      <RetroWindow title="Catatan_Langkah.txt" tone="green" icon={<DocumentIcon size={28} />}>
        <p className="misi__note">Dicatat otomatis, seperti tugas pencatat di LKPD. Salin ke LKPD atau catatan belajarmu kalau perlu.</p>
        {misi.log.length === 0 ? <p>Belum ada langkah.</p> : <ol className="misi__log">{misi.log.map((l, i) => <li key={i}>{l}</li>)}</ol>}
        <button type="button" className="btn btn--paper" onClick={startOver}>Mulai ulang semua misi</button>
      </RetroWindow>
    </div>
  )
}
