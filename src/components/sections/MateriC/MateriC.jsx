// src/components/sections/MateriC/MateriC.jsx
// Materi C: Fungsi dan Karakteristik File dan Folder.
import MateriWindow from '../../MateriWindow/MateriWindow'
import InfoCard from '../../InfoCard/InfoCard'
import PropertiesDemo from '../../PropertiesDemo/PropertiesDemo'
import { MATERI_C } from '../../../data/materi'
import './MateriC.css'

export default function MateriC({ section }) {
  const tabs = [
    {
      id: 'fungsi',
      label: 'Fungsi',
      content: (
        <div className="materi-c__cols">
          <div>
            <h3>Fungsi File</h3>
            <div className="materi-c__stack">
              {MATERI_C.fileFunctions.map((f) => <InfoCard key={f.title} title={f.title} tone="yellow">{f.text}</InfoCard>)}
            </div>
          </div>
          <div>
            <h3>Fungsi Folder</h3>
            <div className="materi-c__stack">
              {MATERI_C.folderFunctions.map((f) => <InfoCard key={f.title} title={f.title} tone="blue">{f.text}</InfoCard>)}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ciri-file',
      label: 'Ciri File (Properties)',
      content: (
        <>
          <p className="materi-c__note">Klik kanan pada file, pilih <strong>Properties</strong>. Klik sebuah ciri untuk melihat letaknya.</p>
          <PropertiesDemo />
        </>
      ),
    },
    {
      id: 'ciri-folder',
      label: 'Ciri Folder',
      content: (
        <ul className="materi-c__traits">
          {MATERI_C.folderTraits.map((t) => <li key={t}>{t}</li>)}
        </ul>
      ),
    },
  ]
  return <MateriWindow section={section} lead={MATERI_C.lead} tabs={tabs} />
}
