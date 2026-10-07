// src/components/MateriWindow/MateriWindow.jsx
// Bingkai standar satu bagian materi: jendela retro + kalimat pembuka + tab isi.
// Dipakai ulang oleh materi A sampai G.
import RetroWindow from '../RetroWindow/RetroWindow'
import Tabs from '../Tabs/Tabs'
import * as Icons from '../../icons'
import './MateriWindow.css'

export default function MateriWindow({ section, lead, tabs }) {
  const Icon = Icons[section.icon] ?? Icons.FolderIcon
  return (
    <RetroWindow title={section.window} tone={section.tone} icon={<Icon size={28} />}>
      <h2 className="mw__heading">{section.label}</h2>
      {lead && <p className="mw__lead">{lead}</p>}
      <Tabs label={`Isi ${section.label}`} tabs={tabs} />
    </RetroWindow>
  )
}
