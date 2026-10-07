// src/components/sections/SectionView/SectionView.jsx  (DIGANTI: tambah case 'penutup')
// Pemilih tampilan: bagian mana memakai komponen apa.
// Setiap tahap berikutnya cukup menambah satu "case" di sini.
import PemantikSection from '../PemantikSection/PemantikSection'
import CeritaSection from '../CeritaSection/CeritaSection'
import MateriA from '../MateriA/MateriA'
import MateriB from '../MateriB/MateriB'
import MateriC from '../MateriC/MateriC'
import MateriD from '../MateriD/MateriD'
import MateriE from '../MateriE/MateriE'
import MateriF from '../MateriF/MateriF'
import MateriG from '../MateriG/MateriG'
import MisiSection from '../MisiSection/MisiSection'
import KuisSection from '../KuisSection/KuisSection'
import PenutupSection from '../PenutupSection/PenutupSection'
import PlaceholderSection from '../PlaceholderSection/PlaceholderSection'

export default function SectionView({ lesson }) {
  const { section } = lesson
  switch (section.id) {
    case 'pemantik':
      return <PemantikSection lesson={lesson} />
    case 'cerita':
      return <CeritaSection lesson={lesson} />
    case 'a':
      return <MateriA section={section} />
    case 'b':
      return <MateriB section={section} />
    case 'c':
      return <MateriC section={section} />
    case 'd':
      return <MateriD section={section} />
    case 'e':
      return <MateriE section={section} />
    case 'f':
      return <MateriF section={section} />
    case 'g':
      return <MateriG section={section} lesson={lesson} />
    case 'misi':
      return <MisiSection lesson={lesson} />
    case 'kuis':
      return <KuisSection lesson={lesson} />
    case 'penutup':
      return <PenutupSection lesson={lesson} />
    default:
      return <PlaceholderSection section={section} />
  }
}
