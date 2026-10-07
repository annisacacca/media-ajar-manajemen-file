// src/components/MiniExplorer/ExplorerTile.jsx  (BARU)
// Satu ikon file/folder di panel kanan. Bisa dipilih, dibuka (dobel klik), diklik kanan,
// diseret, dan (kalau folder) menerima file yang dilepas di atasnya.
// Memakai <div role="button"> (bukan <button>) karena kolom ganti nama (<input>) tidak boleh berada di dalam <button>.
import * as Icons from '../../icons'
import { typeOf } from '../../data/fileTypes'
import RenameField from './RenameField'

export default function ExplorerTile({
  node, selected, cut, renaming, renameError, subtitle, draggable, dropOver,
  onSelect, onOpen, onContext, onDragStart, onDragEnd, onDropOn, onDragEnter, onDragLeave, onRename, onRenameCancel,
}) {
  const isFolder = node.type === 'folder'
  const Icon = isFolder ? Icons.FolderIcon : Icons[typeOf(node.name).icon]
  const unknown = !isFolder && typeOf(node.name).unknown

  return (
    <div
      role="button"
      tabIndex={0}
      className={`mexp__tile ${selected ? 'is-selected' : ''} ${cut ? 'is-cut' : ''} ${dropOver ? 'is-drop' : ''}`}
      aria-pressed={selected}
      draggable={draggable && !renaming}
      onClick={(e) => { e.stopPropagation(); onSelect(e) }}
      onDoubleClick={() => isFolder && onOpen()}
      onKeyDown={(e) => { if (e.key === ' ' && !renaming) { e.preventDefault(); onSelect(e) } }}
      onContextMenu={onContext}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={isFolder && onDropOn ? (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' } : undefined}
      onDragEnter={isFolder ? onDragEnter : undefined}
      onDragLeave={isFolder ? onDragLeave : undefined}
      onDrop={isFolder && onDropOn ? (e) => { e.preventDefault(); onDropOn(e) } : undefined}
    >
      <span className="mexp__tile-icon">
        <Icon size={48} />
        {unknown && <span className="mexp__q" aria-hidden="true">?</span>}
      </span>
      {renaming
        ? <RenameField name={node.name} error={renameError} onCommit={onRename} onCancel={onRenameCancel} />
        : <span className="mexp__tile-name">{node.name}</span>}
      {subtitle && <span className="mexp__tile-sub">{subtitle}</span>}
    </div>
  )
}
