// src/components/sections/MateriB/MateriB.jsx
// Materi B: Pengertian File dan Folder.
import MateriWindow from '../../MateriWindow/MateriWindow'
import InfoCard from '../../InfoCard/InfoCard'
import DataTable from '../../DataTable/DataTable'
import FileTile from '../../FileTile/FileTile'
import FileOrFolderGame from '../../FileOrFolderGame/FileOrFolderGame'
import { MATERI_B } from '../../../data/materi'
import './MateriB.css'

export default function MateriB({ section }) {
  const { file, folder } = MATERI_B
  const tabs = [
    {
      id: 'definisi',
      label: 'File dan Folder',
      content: (
        <div className="materi-b__defs">
          <InfoCard title={file.title} tone="yellow">
            <p>{file.text}</p>
            <p>{file.extra}</p>
            <div className="materi-b__examples">
              {file.examples.map((n) => <FileTile key={n} name={n} size={40} />)}
            </div>
          </InfoCard>
          <InfoCard title={folder.title} tone="blue">
            <p>{folder.text}</p>
            <p>{folder.extra}</p>
            <div className="materi-b__examples">
              <FileTile name="Tugas_Dika" folder size={40} />
              <FileTile name="Kelas_X" folder size={40} />
            </div>
          </InfoCard>
        </div>
      ),
    },
    { id: 'tebak', label: 'Tebak: File atau Folder?', content: <FileOrFolderGame items={MATERI_B.quiz} /> },
    { id: 'beda', label: 'Perbedaannya', content: <DataTable columns={MATERI_B.diff.columns} rows={MATERI_B.diff.rows} /> },
  ]
  return <MateriWindow section={section} lead={MATERI_B.lead} tabs={tabs} />
}
