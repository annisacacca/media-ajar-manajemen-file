// src/components/Sidebar/Sidebar.jsx
// Daftar bagian di samping untuk loncat cepat (mode guru).
import RetroWindow from '../RetroWindow/RetroWindow'
import * as Icons from '../../icons'
import { SECTIONS } from '../../data/sections'
import './Sidebar.css'

export default function Sidebar({ id, open, current, visited, missionUnlocked, onSelect }) {
  return (
    <nav id={id} className={`sidebar ${open ? '' : 'is-closed'}`} aria-label="Daftar bagian">
      <RetroWindow title="Daftar_Bagian" tone="yellow" icon={<Icons.FolderIcon size={28} />} className="sidebar__win">
        <ol className="sidebar__list">
          {SECTIONS.map((s, i) => {
            const Icon = Icons[s.icon] ?? Icons.FolderIcon
            const locked = s.id === 'misi' && !missionUnlocked
            const done = visited[s.id] && i !== current
            return (
              <li key={s.id}>
                <button
                  type="button"
                  className={`sidebar__item ${locked ? 'is-locked' : ''}`}
                  aria-current={i === current ? 'step' : undefined}
                  onClick={() => onSelect(i)}
                >
                  <span className="sidebar__tile" aria-hidden="true"><Icon size={24} /></span>
                  <span className="sidebar__label">{s.label}</span>
                  {locked && (
                    <span className="sidebar__mark">
                      <Icons.LockIcon size={22} />
                      <span className="sr-only">terkunci</span>
                    </span>
                  )}
                  {done && !locked && (
                    <span className="sidebar__mark">
                      <Icons.CheckIcon size={22} />
                      <span className="sr-only">sudah dibuka</span>
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      </RetroWindow>
    </nav>
  )
}
