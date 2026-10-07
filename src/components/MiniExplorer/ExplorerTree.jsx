// src/components/MiniExplorer/ExplorerTree.jsx  (BARU)
// Panel kiri: pohon folder + Recycle Bin. Folder bisa diklik (buka) dan menerima file yang diseret.
import { FolderIcon, TrashIcon } from '../../icons'
import { ROOT_ID, listIn } from '../../lib/fsModel'

export default function ExplorerTree({ nodes, cwd, view, trashCount, over, setOver, onOpen, onShowTrash, onMoveTo, onTrashDrop }) {
  const parseIds = (e) => {
    try { return JSON.parse(e.dataTransfer.getData('text/plain')) } catch { return [] }
  }

  const branch = (id, depth) => {
    const node = nodes[id]
    const kids = listIn(nodes, id).filter((n) => n.type === 'folder')
    const active = view === 'folder' && cwd === id
    return (
      <li key={id}>
        <button
          type="button"
          className={`mexp__node ${active ? 'is-active' : ''} ${over === id ? 'is-drop' : ''}`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => onOpen(id)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setOver(id)}
          onDragLeave={() => setOver((o) => (o === id ? null : o))}
          onDrop={(e) => { e.preventDefault(); setOver(null); onMoveTo(parseIds(e), id) }}
        >
          <FolderIcon size={22} />
          <span>{node.name}</span>
        </button>
        {kids.length > 0 && <ul>{kids.map((k) => branch(k.id, depth + 1))}</ul>}
      </li>
    )
  }

  return (
    <nav className="mexp__tree" aria-label="Daftar folder">
      <ul>{branch(ROOT_ID, 0)}</ul>
      <button
        type="button"
        className={`mexp__node mexp__node--trash ${view === 'trash' ? 'is-active' : ''} ${over === 'trash' ? 'is-drop' : ''}`}
        onClick={onShowTrash}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setOver('trash')}
        onDragLeave={() => setOver((o) => (o === 'trash' ? null : o))}
        onDrop={(e) => { e.preventDefault(); setOver(null); onTrashDrop(parseIds(e)) }}
      >
        <TrashIcon size={22} />
        <span>Recycle Bin{trashCount > 0 ? ` (${trashCount})` : ''}</span>
      </button>
    </nav>
  )
}
