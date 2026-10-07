// src/components/FolderTree/FolderTree.jsx  (BARU)
// Diagram pohon folder: akar di atas, cabang folder, dan file di ujung cabang.
// Setiap kali `nodes` berubah (folder dibuat, dipindah, diganti nama), pohon langsung ikut berubah.
//
// Props:
//   nodes        : { id: node } dari lib/fsModel.js
//   rootId       : id akar (default 'root')
//   rootAs       : 'drive' (akar = drive, ikon komputer) | 'folder' (akar = folder biasa)
//   selectedId   : node yang dipilih. Rantai induknya ikut menyala, dan node di sekitarnya diberi label hubungan.
//   onSelect(id) : kalau diisi, node bisa diklik
//   highlightIds : daftar id yang disorot hijau (dipakai pembaca path, langkah demi langkah)
//   flash        : { id, n } node yang berkedip; naikkan n untuk memutar ulang kedipan
//   showRelations: tampilkan label induk / subfolder / isi relatif terhadap node terpilih
//   maxHeight    : tinggi maksimum (px) sebelum menggulir
import * as Icons from '../../icons'
import { typeOf } from '../../data/fileTypes'
import { ROOT_ID, listIn } from '../../lib/fsModel'
import { chainOf, relationOf } from '../../lib/treeModel'
import './FolderTree.css'

export default function FolderTree({
  nodes, rootId = ROOT_ID, rootAs = 'drive', selectedId = null, onSelect, highlightIds = [],
  flash = { id: null, n: 0 }, showRelations = true, maxHeight, label = 'Diagram pohon folder',
}) {
  const onPath = new Set(selectedId && nodes[selectedId] ? chainOf(nodes, selectedId) : [])
  const steps = new Set(highlightIds)

  const renderNode = (id, depth) => {
    const node = nodes[id]
    if (!node) return null
    const isRoot = id === rootId
    const kids = listIn(nodes, id)
    const rel = showRelations ? relationOf(nodes, selectedId, id) : 'other'

    // Label kecil di samping nama
    const tags = []
    if (isRoot && rootAs === 'drive') tags.push({ text: 'drive / root', tone: 'blue' })
    if (rel === 'parent') tags.push({ text: 'folder induk', tone: 'yellow' })
    if (rel === 'child') tags.push({ text: node.type === 'folder' ? 'subfolder' : 'isi', tone: 'green' })

    const Icon = isRoot && rootAs === 'drive'
      ? Icons.ComputerIcon
      : node.type === 'folder' ? Icons.FolderIcon : Icons[typeOf(node.name).icon] ?? Icons.DocumentIcon

    const classes = [
      'ftree__chip',
      isRoot && rootAs === 'drive' ? 'ftree__chip--drive' : `ftree__chip--${node.type}`,
      onPath.has(id) ? 'is-path' : '',
      id === selectedId ? 'is-self' : '',
      steps.has(id) ? 'is-step' : '',
      flash.id === id ? 'is-flash' : '',
    ].join(' ')

    const inner = (
      <>
        <Icon size={30} />
        <span className="ftree__name">{node.name}</span>
        {tags.map((t) => <span key={t.text} className={`ftree__tag ftree__tag--${t.tone}`}>{t.text}</span>)}
      </>
    )
    // key berisi nomor kedipan: kalau berubah, elemen dibuat ulang sehingga animasi kedip diputar lagi
    const chipKey = `${id}:${flash.id === id ? flash.n : 0}`

    return (
      <li key={id} className="ftree__item" style={{ '--depth': depth }}>
        {onSelect ? (
          <button key={chipKey} type="button" className={classes} aria-pressed={id === selectedId} onClick={() => onSelect(id)}>{inner}</button>
        ) : (
          <span key={chipKey} className={classes}>{inner}</span>
        )}
        {kids.length > 0 && <ul className="ftree__children">{kids.map((k) => renderNode(k.id, depth + 1))}</ul>}
      </li>
    )
  }

  return (
    <div className="ftree" role="group" aria-label={label} style={maxHeight ? { maxHeight } : undefined}>
      <ul className="ftree__root">{renderNode(rootId, 0)}</ul>
    </div>
  )
}
