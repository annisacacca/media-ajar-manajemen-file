// src/components/sections/PenutupSection/PenutupSection.jsx
// Bagian Penutup: kesimpulan, refleksi, tindak lanjut (kebiasaan baik), dan identitas pembuat.
// Memakai kerangka Tabs seperti materi lain. Centang kebiasaan hanya disimpan di komponen ini.
import { useState } from 'react'
import Dika from '../../Dika/Dika'
import RetroWindow from '../../RetroWindow/RetroWindow'
import Tabs from '../../Tabs/Tabs'
import InfoCard from '../../InfoCard/InfoCard'
import StarBurst from '../../StarBurst/StarBurst'
import { ArchiveIcon, CheckIcon } from '../../../icons'
import { PEMBUAT, PENUTUP_LEAD, KESIMPULAN, REFLEKSI, KEBIASAAN } from '../../../data/penutup'
import './PenutupSection.css'

function Kesimpulan() {
  return (
    <div className="penutup__cards">
      {KESIMPULAN.map((k) => (
        <InfoCard key={k.kode} title={`${k.kode}. ${k.title}`} tone={k.tone}>{k.text}</InfoCard>
      ))}
    </div>
  )
}

function Refleksi() {
  const [open, setOpen] = useState({})
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }))
  return (
    <div className="penutup__reflect">
      <p className="penutup__note">Renungkan dulu, lalu diskusikan dengan teman sebelahmu. Tekan tombol petunjuk kalau butuh pancingan.</p>
      <ol className="penutup__qs">
        {REFLEKSI.map((r, i) => (
          <li key={r.q} className="penutup__q">
            <p className="penutup__q-text">{r.q}</p>
            <button type="button" className="btn btn--paper penutup__q-btn" aria-expanded={Boolean(open[i])} onClick={() => toggle(i)}>
              {open[i] ? 'Sembunyikan petunjuk' : 'Lihat petunjuk'}
            </button>
            {open[i] && <p className="penutup__hint" role="status">{r.hint}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

function TindakLanjut() {
  const [done, setDone] = useState({})
  const count = KEBIASAAN.filter((k) => done[k.id]).length
  const all = count === KEBIASAAN.length
  const toggle = (id) => setDone((d) => ({ ...d, [id]: !d[id] }))

  return (
    <div className="penutup__follow">
      <p className="penutup__note">Centang kebiasaan yang berani kamu mulai hari ini. Tidak harus semuanya sekaligus.</p>
      <ul className="penutup__habits">
        {KEBIASAAN.map((k) => (
          <li key={k.id}>
            <button type="button" className="penutup__habit" data-on={Boolean(done[k.id])} aria-pressed={Boolean(done[k.id])} onClick={() => toggle(k.id)}>
              <span className="penutup__box" aria-hidden="true">{done[k.id] && <CheckIcon size={26} />}</span>
              <span>{k.text}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="penutup__meter" role="status">
        <span className="penutup__count">{count} / {KEBIASAAN.length} kebiasaan</span>
        <div className="penutup__mascot">
          <Dika expression={all ? 'bangga' : count > 0 ? 'senang' : 'semangat'} size={120} />
          {all && <StarBurst />}
        </div>
      </div>
    </div>
  )
}

function Pembuat() {
  return (
    <div className="penutup__maker">
      <div className="penutup__maker-card">
        <p className="penutup__maker-label">Media ajar ini dibuat oleh</p>
        <h3 className="penutup__maker-name">{PEMBUAT.nama}</h3>
        <ul className="penutup__links">
          <li>
            <a className="btn btn--paper" href={`https://github.com/${PEMBUAT.github}`} target="_blank" rel="noopener noreferrer">
              GitHub: {PEMBUAT.github}
            </a>
          </li>
          <li>
            <a className="btn btn--red" href={`https://www.instagram.com/${PEMBUAT.instagram}`} target="_blank" rel="noopener noreferrer">
              Instagram: @{PEMBUAT.instagram}
            </a>
          </li>
        </ul>
      </div>
      <Dika expression="bangga" size={180} />
    </div>
  )
}

export default function PenutupSection({ lesson }) {
  const tabs = [
    { id: 'kesimpulan', label: 'Kesimpulan', content: <Kesimpulan /> },
    { id: 'refleksi', label: 'Refleksi', content: <Refleksi /> },
    { id: 'tindak', label: 'Tindak Lanjut', content: <TindakLanjut /> },
    { id: 'pembuat', label: 'Pembuat', content: <Pembuat /> },
  ]

  return (
    <RetroWindow title="Penutup.txt" tone="green" icon={<ArchiveIcon size={28} />}>
      <div className="penutup__head">
        <Dika expression="bangga" size={140} />
        <div>
          <h2 className="penutup__title">Penutup</h2>
          <p className="penutup__lead">{PENUTUP_LEAD}</p>
        </div>
      </div>
      <Tabs label="Isi penutup" tabs={tabs} />
      <div className="penutup__end">
        <button type="button" className="btn btn--paper" onClick={() => lesson.go(0)}>Ulangi dari awal</button>
      </div>
    </RetroWindow>
  )
}
