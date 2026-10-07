// src/components/OperationSteps/OperationSteps.jsx  (BARU)
// Pilih salah satu dari lima operasi, lalu tampil langkah-langkahnya (dari Materi Ajar F).
import { useState } from 'react'
import { MATERI_F } from '../../data/materiF'
import './OperationSteps.css'

export default function OperationSteps() {
  const [id, setId] = useState(MATERI_F.operations[0].id)
  const op = MATERI_F.operations.find((o) => o.id === id)
  return (
    <div className="opsteps">
      <div className="opsteps__pick" role="group" aria-label="Pilih operasi">
        {MATERI_F.operations.map((o, i) => (
          <button key={o.id} type="button" className="btn btn--paper" aria-pressed={o.id === id} onClick={() => setId(o.id)}>
            {i + 1}. {o.title}
          </button>
        ))}
      </div>

      {/* key = id: panel tampil dengan animasi setiap ganti operasi */}
      <div key={op.id} className="opsteps__panel">
        <p className="opsteps__intro">{op.intro}</p>
        <p className="opsteps__keys">Pintasan: <kbd>{op.keys}</kbd></p>
        <ol className="opsteps__list">
          {op.steps.map((st, i) => (
            <li key={st} style={{ '--i': i }}>{st}</li>
          ))}
        </ol>
        {op.example && (
          <div className="opsteps__example" aria-label="Contoh ganti nama">
            <span className="opsteps__from">{op.example.from}</span>
            <span aria-hidden="true">&rarr;</span>
            <span className="opsteps__to">{op.example.to}</span>
            <small>{op.example.note}</small>
          </div>
        )}
        {op.note && <p className="opsteps__note">{op.note}</p>}
      </div>
    </div>
  )
}
