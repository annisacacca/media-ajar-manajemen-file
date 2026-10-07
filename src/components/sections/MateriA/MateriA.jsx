// src/components/sections/MateriA/MateriA.jsx
// Materi A: Peran Sistem Operasi dalam Manajemen File.
import MateriWindow from '../../MateriWindow/MateriWindow'
import OsSimulator from '../../OsSimulator/OsSimulator'
import InfoCard from '../../InfoCard/InfoCard'
import DataTable from '../../DataTable/DataTable'
import * as Icons from '../../../icons'
import { MATERI_A } from '../../../data/materi'
import './MateriA.css'

const TONES = ['blue', 'yellow', 'green', 'red', 'blue', 'yellow']

export default function MateriA({ section }) {
  const tabs = [
    {
      id: 'sim',
      label: 'Simulasi',
      content: (
        <>
          <p className="materi-a__note">{MATERI_A.explorerNote}</p>
          <OsSimulator />
        </>
      ),
    },
    {
      id: 'tugas',
      label: '6 Tugas OS',
      content: (
        <div className="materi-a__cards">
          {MATERI_A.tasks.map((t, i) => (
            <InfoCard key={t.title} title={t.title} tone={TONES[i]}>{t.text}</InfoCard>
          ))}
        </div>
      ),
    },
    {
      id: 'analogi',
      label: 'Analogi Perpustakaan',
      content: (
        <>
          <p className="materi-a__note">Perpustakaan menyimpan ribuan buku. Samakan dengan komputer:</p>
          <ul className="materi-a__analogy">
            {MATERI_A.analogy.map((a) => {
              const Icon = Icons[a.icon]
              return (
                <li key={a.is}>
                  <span className="materi-a__thing"><Icon size={36} />{a.thing}</span>
                  <span className="materi-a__arrow" aria-label="adalah">=</span>
                  <strong className="materi-a__is">{a.is}</strong>
                </li>
              )
            })}
          </ul>
        </>
      ),
    },
    {
      id: 'fs',
      label: 'Jenis File System',
      content: (
        <>
          <p className="materi-a__note">Windows mendukung beberapa file system. Cukup kenali tiga yang paling umum.</p>
          <DataTable columns={MATERI_A.fileSystems.columns} rows={MATERI_A.fileSystems.rows} />
        </>
      ),
    },
  ]
  return <MateriWindow section={section} lead={MATERI_A.lead} tabs={tabs} />
}
