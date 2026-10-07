// src/components/sections/MateriG/MateriG.jsx  (BARU)
// Materi G: Direktori dan Struktur Folder.
// Elemen interaktif utama: TreeLab (Explorer + diagram pohon). Pendukung: pohon contoh, pembaca path.
// Tab "Rancangan Dika" terkunci sampai guru menekan "Mulai Misi", karena isinya sama dengan hasil akhir misi.
import Dika from '../../Dika/Dika'
import MateriWindow from '../../MateriWindow/MateriWindow'
import InfoCard from '../../InfoCard/InfoCard'
import DataTable from '../../DataTable/DataTable'
import ExampleTree from '../../ExampleTree/ExampleTree'
import PathReader from '../../PathReader/PathReader'
import TreeLab from '../../TreeLab/TreeLab'
import { LockIcon } from '../../../icons'
import { MATERI_G } from '../../../data/materiG'
import './MateriG.css'

export default function MateriG({ section, lesson }) {
  const unlocked = lesson.state.missionUnlocked
  const { terms, branchNote, example, principles, dika, lab } = MATERI_G

  const tabs = [
    {
      id: 'pohon',
      label: 'Struktur Pohon',
      content: (
        <div className="materi-g__split">
          <ExampleTree list={example.nodes} startId={example.startId} label="Contoh struktur: D:, Informatika, Kelas_X, Tugas1.docx" />
          <div className="materi-g__side">
            <DataTable columns={terms.columns} rows={terms.rows} />
            <InfoCard title="Cara membaca pohon" tone="blue">{branchNote} Klik tiap kotak di pohon untuk melihat hubungannya.</InfoCard>
          </div>
        </div>
      ),
    },
    { id: 'path', label: 'Path (Alamat)', content: <PathReader /> },
    {
      id: 'coba',
      label: 'Coba Sendiri',
      content: <TreeLab initialNodes={lab.nodes} startFolder={lab.start} tries={lab.tries} />,
    },
    {
      id: 'prinsip',
      label: 'Prinsip Menata',
      content: (
        <div className="materi-g__principles">
          {principles.map((p) => <InfoCard key={p.title} title={p.title} tone={p.tone}>{p.text}</InfoCard>)}
        </div>
      ),
    },
    {
      id: 'rancangan',
      label: (
        <span className="materi-g__tablabel">
          {!unlocked && <LockIcon size={22} />} Rancangan Dika
        </span>
      ),
      content: unlocked ? (
        <>
          <p className="materi-g__intro">{dika.intro}</p>
          <ExampleTree list={dika.nodes} startId={dika.startId} rootAs="folder" label="Rancangan struktur Tugas_Dika" />
        </>
      ) : (
        <div className="materi-g__locked">
          <Dika expression="mikir" size={150} />
          <div>
            <h3>Bagian ini masih terkunci</h3>
            <p>Isinya membahas hasil akhir penataan folder Dika, jadi baru terbuka setelah guru menekan &ldquo;Mulai Misi&rdquo;.</p>
            <LockIcon size={56} />
          </div>
        </div>
      ),
    },
  ]

  return <MateriWindow section={section} lead={MATERI_G.lead} tabs={tabs} />
}
