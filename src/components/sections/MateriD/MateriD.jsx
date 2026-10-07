// src/components/sections/MateriD/MateriD.jsx  (BARU)
// Materi D: Nama, Format, dan Ekstensi File.
// Elemen interaktif utama: ExtensionLab (ubah ekstensi). Pendukung: NameChecker dan ShowExtensionDemo.
import MateriWindow from '../../MateriWindow/MateriWindow'
import InfoCard from '../../InfoCard/InfoCard'
import DataTable from '../../DataTable/DataTable'
import FileTile from '../../FileTile/FileTile'
import NameChecker from '../../NameChecker/NameChecker'
import ExtensionLab from '../../ExtensionLab/ExtensionLab'
import ShowExtensionDemo from '../../ShowExtensionDemo/ShowExtensionDemo'
import { MATERI_D } from '../../../data/materiDE'
import './MateriD.css'

export default function MateriD({ section }) {
  const { anatomy, goodNames, habits, formats, extension } = MATERI_D
  const tabs = [
    {
      id: 'aturan',
      label: 'Aturan Penamaan',
      content: (
        <>
          <div className="materi-d__anatomy">
            {anatomy.map((a, i) => (
              <InfoCard key={a.id} title={a.title} tone={i === 0 ? 'yellow' : 'blue'}>{a.text}</InfoCard>
            ))}
          </div>
          <NameChecker />
        </>
      ),
    },
    {
      id: 'baik',
      label: 'Kebiasaan Baik',
      content: (
        <div className="materi-d__good">
          <DataTable columns={goodNames.columns} rows={goodNames.rows} />
          <ul className="materi-d__habits">
            {habits.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      ),
    },
    {
      id: 'format',
      label: 'Format File',
      content: (
        <>
          <p className="materi-d__intro">{formats.intro}</p>
          <div className="materi-d__formats">
            <InfoCard title={formats.text.title} tone="green">
              <p>{formats.text.text}</p>
              <div className="materi-d__examples">{formats.text.examples.map((n) => <FileTile key={n} name={n} size={36} />)}</div>
            </InfoCard>
            <InfoCard title={formats.binary.title} tone="red">
              <p>{formats.binary.text}</p>
              <div className="materi-d__examples">{formats.binary.examples.map((n) => <FileTile key={n} name={n} size={36} />)}</div>
            </InfoCard>
          </div>
          <p className="materi-d__note">{formats.note}</p>
        </>
      ),
    },
    {
      id: 'ekstensi',
      label: 'Ekstensi dan Aplikasi',
      content: (
        <>
          <p className="materi-d__intro">{extension.def}</p>
          <ExtensionLab />
        </>
      ),
    },
    {
      id: 'sebab',
      label: 'File Tidak Terbuka?',
      content: (
        <>
          <p className="materi-d__intro">Ada empat penyebab umum sebuah file tidak dapat dibuka.</p>
          <ol className="materi-d__causes">
            {extension.causes.map((c) => (
              <li key={c.title}><InfoCard title={c.title} tone={c.tone}>{c.text}</InfoCard></li>
            ))}
          </ol>
        </>
      ),
    },
    { id: 'tampil', label: 'Tampilkan Ekstensi', content: <ShowExtensionDemo /> },
  ]
  return <MateriWindow section={section} lead={MATERI_D.lead} tabs={tabs} />
}
