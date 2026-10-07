// src/components/sections/PlaceholderSection/PlaceholderSection.jsx
// Halaman penanda untuk bagian yang belum dibuat. Akan diganti satu per satu di tahap berikutnya.
import Dika from '../../Dika/Dika'
import RetroWindow from '../../RetroWindow/RetroWindow'
import * as Icons from '../../../icons'
import './PlaceholderSection.css'

export default function PlaceholderSection({ section }) {
  const Icon = Icons[section.icon] ?? Icons.FolderIcon
  return (
    <RetroWindow title={section.window} tone={section.tone} icon={<Icon size={28} />}>
      <div className="ph">
        <Dika expression="semangat" size={200} />
        <div>
          <h2>{section.label}</h2>
          <p>{section.topic}</p>
          <p className="ph__badge">Segera hadir di Tahap {section.stage}</p>
        </div>
      </div>
    </RetroWindow>
  )
}
