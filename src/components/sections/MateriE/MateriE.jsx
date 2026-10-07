// src/components/sections/MateriE/MateriE.jsx  (BARU)
// Materi E: Jenis dan Fungsi File Berdasarkan Ekstensi.
// Elemen interaktif utama: ClassifyGame (drag and drop ke kategori).
import MateriWindow from '../../MateriWindow/MateriWindow'
import InfoCard from '../../InfoCard/InfoCard'
import FileTile from '../../FileTile/FileTile'
import ClassifyGame from '../../ClassifyGame/ClassifyGame'
import { MATERI_E } from '../../../data/materiDE'
import './MateriE.css'

// Tabel jenis file: sel kategori digabung (rowSpan) untuk semua ekstensi di kategori itu
function TypeTable() {
  return (
    <div className="materi-e__tablewrap">
      <table className="materi-e__table">
        <thead>
          <tr><th scope="col">Kategori</th><th scope="col">Ekstensi</th><th scope="col">Fungsi</th><th scope="col">Aplikasi Umum</th></tr>
        </thead>
        <tbody>
          {MATERI_E.table.map((group) =>
            group.rows.map((r, i) => (
              <tr key={r.ext} className={i === 0 ? 'is-first' : ''}>
                {i === 0 && <th scope="rowgroup" rowSpan={group.rows.length} className={`materi-e__cat materi-e__cat--${group.tone}`}>{group.category}</th>}
                <td className="materi-e__ext">{r.ext}</td>
                <td>{r.fn}</td>
                <td>{r.app}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function MateriE({ section }) {
  const tabs = [
    { id: 'tabel', label: 'Tabel Jenis File', content: <TypeTable /> },
    {
      id: 'klasifikasi',
      label: 'Klasifikasi: Seret ke Kategori',
      content: <ClassifyGame />,
    },
    {
      id: 'tips',
      label: 'Tips Memilih Format',
      content: (
        <div className="materi-e__tips">
          {MATERI_E.tips.map((t) => (
            <InfoCard key={t.title} title={t.title} tone={t.tone}>
              <p>{t.text}</p>
              <div className="materi-e__files">{t.files.map((n) => <FileTile key={n} name={n} size={36} />)}</div>
            </InfoCard>
          ))}
        </div>
      ),
    },
  ]
  return <MateriWindow section={section} lead={MATERI_E.lead} tabs={tabs} />
}
