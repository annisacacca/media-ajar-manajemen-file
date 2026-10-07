// src/components/CopyMoveDemo/CopyMoveDemo.jsx  (BARU)
// Animasi perbandingan Salin vs Pindah: file "terbang" dari folder asal ke folder tujuan.
//   Salin  -> file asal TETAP ada, di tujuan muncul salinan baru.
//   Pindah -> file asal HILANG, file yang sama pindah ke tujuan.
import { useEffect, useState } from 'react'
import Dika from '../Dika/Dika'
import FileTile from '../FileTile/FileTile'
import { FolderIcon } from '../../icons'
import './CopyMoveDemo.css'

const NAME = 'foto_kelas.jpg'
const FLY_MS = 1000

export default function CopyMoveDemo() {
  const [run, setRun] = useState({ mode: null, phase: 'idle' }) // phase: idle | fly | done

  // Setelah animasi terbang selesai, tandai selesai
  useEffect(() => {
    if (run.phase !== 'fly') return undefined
    const t = setTimeout(() => setRun((r) => ({ ...r, phase: 'done' })), FLY_MS)
    return () => clearTimeout(t)
  }, [run.phase, run.mode])

  const start = (mode) => setRun({ mode, phase: 'fly' })
  const reset = () => setRun({ mode: null, phase: 'idle' })

  const { mode, phase } = run
  const inOrigin = mode !== 'move' || phase === 'idle' // asal masih berisi file kecuali saat/ setelah pindah
  const inDest = phase === 'done'
  const face = phase === 'idle' ? 'mikir' : mode === 'copy' ? 'senang' : 'semangat'

  return (
    <div className="cmd">
      <div className="cmd__controls">
        <button type="button" className="btn btn--blue" onClick={() => start('copy')} disabled={phase === 'fly'}>Salin (Copy)</button>
        <button type="button" className="btn btn--red" onClick={() => start('move')} disabled={phase === 'fly'}>Pindah (Move)</button>
        <button type="button" className="btn btn--paper" onClick={reset} disabled={phase === 'idle'}>Ulangi</button>
      </div>

      <div className="cmd__arena">
        <div className="cmd__box">
          <span className="cmd__label"><FolderIcon size={26} /> Folder asal</span>
          <div className="cmd__slot">
            {inOrigin && <FileTile name={NAME} size={52} />}
            {!inOrigin && <span className="cmd__gone">kosong</span>}
          </div>
        </div>
        <span className="cmd__arrow" aria-hidden="true">&rarr;</span>
        <div className="cmd__box">
          <span className="cmd__label"><FolderIcon size={26} /> Folder tujuan</span>
          <div className="cmd__slot">
            {inDest ? <FileTile name={NAME} size={52} className="cmd__arrive" /> : <span className="cmd__gone">kosong</span>}
          </div>
        </div>
        {/* File yang terbang. key = mode+phase agar animasi diputar ulang setiap dijalankan */}
        {phase === 'fly' && (
          <span key={mode} className="cmd__ghost"><FileTile name={NAME} size={52} /></span>
        )}
      </div>

      <div className="cmd__result" role="status">
        <Dika expression={face} size={90} />
        <p>
          {phase === 'idle' && 'Pilih salah satu: salin atau pindahkan foto_kelas.jpg ke folder tujuan.'}
          {phase === 'fly' && 'File sedang dikirim...'}
          {phase === 'done' && mode === 'copy' && 'Disalin: file asal tetap ada, di tujuan ada salinan baru. Cocok untuk cadangan dan berbagi.'}
          {phase === 'done' && mode === 'move' && 'Dipindah: file asal hilang, file yang sama berpindah tempat. Cocok untuk merapikan dan menata ulang.'}
        </p>
      </div>
    </div>
  )
}
