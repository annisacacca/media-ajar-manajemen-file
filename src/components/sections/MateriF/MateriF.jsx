// src/components/sections/MateriF/MateriF.jsx  (BARU)
// Materi F: Operasi Dasar File dan Folder.
// Elemen interaktif utama: MiniExplorer (latihan bebas). Pendukung: OperationSteps dan CopyMoveDemo.
// Misi TIDAK ditampilkan di sini (itu bagian "Lima Misi" supaya tidak jadi spoiler).
import { useState } from 'react'
import MateriWindow from '../../MateriWindow/MateriWindow'
import InfoCard from '../../InfoCard/InfoCard'
import DataTable from '../../DataTable/DataTable'
import OperationSteps from '../../OperationSteps/OperationSteps'
import CopyMoveDemo from '../../CopyMoveDemo/CopyMoveDemo'
import MiniExplorer from '../../MiniExplorer/MiniExplorer'
import { MATERI_F } from '../../../data/materiF'
import './MateriF.css'

export default function MateriF({ section }) {
  const [resetKey, setResetKey] = useState(0) // naik setiap tombol "Mulai ulang latihan" ditekan
  const { table, compare, conflict, warning, safe, practice } = MATERI_F

  const tabs = [
    { id: 'lima', label: 'Lima Operasi', content: <DataTable columns={table.columns} rows={table.rows} /> },
    { id: 'langkah', label: 'Langkah-langkah', content: <OperationSteps /> },
    {
      id: 'beda',
      label: 'Salin vs Pindah',
      content: (
        <div className="materi-f__beda">
          <CopyMoveDemo />
          <DataTable columns={compare.columns} rows={compare.rows} />
          <InfoCard title={conflict.title} tone="yellow">{conflict.text}</InfoCard>
        </div>
      ),
    },
    {
      id: 'explorer',
      label: 'Coba File Explorer',
      content: (
        <>
          <div className="materi-f__tools">
            <p>Ini folder latihan. Coba <strong>klik kanan</strong>, tombol toolbar, pintasan keyboard, atau <strong>seret</strong> file ke folder. Setelah menghapus, buka <strong>Recycle Bin</strong> di panel kiri lalu pulihkan.</p>
            <button type="button" className="btn btn--paper" onClick={() => setResetKey((k) => k + 1)}>Mulai ulang latihan</button>
          </div>
          <MiniExplorer initialNodes={practice.nodes} startFolder={practice.start} resetKey={resetKey} />
          <p className="materi-f__hint">Ctrl + Shift + N bisa dipakai peramban untuk jendela penyamaran. Kalau begitu, pakai tombol Folder Baru atau klik kanan.</p>
        </>
      ),
    },
    {
      id: 'aman',
      label: 'Waspada dan Aman',
      content: (
        <>
          <div className="materi-f__warn" role="note">
            <strong>{warning.title}</strong>
            <p>{warning.text}</p>
          </div>
          <h3 className="materi-f__h">Prinsip Aman dalam Mengelola File</h3>
          <div className="materi-f__safe">
            {safe.map((p) => <InfoCard key={p.title} title={p.title} tone={p.tone}>{p.text}</InfoCard>)}
          </div>
        </>
      ),
    },
  ]
  return <MateriWindow section={section} lead={MATERI_F.lead} tabs={tabs} />
}
