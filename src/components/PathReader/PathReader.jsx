// src/components/PathReader/PathReader.jsx  (BARU)
// Membaca path dari kiri ke kanan, langkah demi langkah. Tiap langkah menyalakan satu segmen
// di PathBar sekaligus satu node di pohon, sampai file ketemu.
import { useMemo, useState } from 'react'
import Dika from '../Dika/Dika'
import FolderTree from '../FolderTree/FolderTree'
import PathBar from '../PathBar/PathBar'
import InfoCard from '../InfoCard/InfoCard'
import StarBurst from '../StarBurst/StarBurst'
import { toNodes } from '../../lib/fsModel'
import { chainOf } from '../../lib/treeModel'
import { MATERI_G } from '../../data/materiG'
import './PathReader.css'

// Kalimat tiap langkah, mengikuti Materi Ajar: "Drive D, masuk folder Informatika, masuk subfolder Kelas_X, lalu file Tugas1.docx"
function stepText(node, i, last) {
  if (i === 0) return { title: `Drive ${node.name.replace(':', '')}`, hint: `Titik awal path, ditulis ${node.name}` }
  if (i === last) return { title: `Lalu file ${node.name}`, hint: 'Ujung jalur: file yang dicari.' }
  return { title: i === 1 ? `Masuk folder ${node.name}` : `Masuk subfolder ${node.name}`, hint: 'Tanda garis miring terbalik (\\) memisahkan tiap tingkat.' }
}

export default function PathReader() {
  const { example, path } = MATERI_G
  const nodes = useMemo(() => toNodes(example.nodes), [example])
  const chain = useMemo(() => chainOf(nodes, example.fileId), [nodes, example])
  const last = chain.length - 1
  const [step, setStep] = useState(-1) // -1 = belum mulai
  const done = step === last
  const current = step >= 0 ? stepText(nodes[chain[step]], step, last) : null
  const face = step < 0 ? 'mikir' : done ? 'bangga' : 'semangat'

  return (
    <div className="preader">
      <p className="preader__intro">{path.intro}</p>

      <div className="preader__grid">
        <div className="preader__left">
          <PathBar nodes={nodes} id={example.fileId} reveal={step + 1} />

          <div className="preader__controls">
            {step < 0 && <button type="button" className="btn btn--blue" onClick={() => setStep(0)}>Mulai baca path</button>}
            {step >= 0 && !done && <button type="button" className="btn btn--green" onClick={() => setStep((s) => s + 1)}>Langkah berikutnya</button>}
            {step >= 0 && <button type="button" className="btn btn--paper" onClick={() => setStep(-1)}>Ulangi</button>}
          </div>

          <div className="preader__say" role="status">
            <span className="preader__dika">
              <Dika expression={face} size={96} />
              {done && <StarBurst key="done" />}
            </span>
            <div key={step} className="preader__text">
              {!current && <p>Path dibaca dari kiri ke kanan. Tekan tombol, lalu ikuti jalurnya sampai file ketemu.</p>}
              {current && (
                <>
                  <p className="preader__title">{current.title}</p>
                  <p className="preader__hint">{current.hint}</p>
                </>
              )}
              {done && <p className="preader__hint">Hasilnya: {chain.map((id) => nodes[id].name).join('\\')}</p>}
            </div>
          </div>

          <InfoCard title="Catatan" tone="yellow">{path.next}</InfoCard>
        </div>

        <FolderTree nodes={nodes} showRelations={false} highlightIds={chain.slice(0, step + 1)} label="Pohon yang sedang ditelusuri" />
      </div>
    </div>
  )
}
