// src/components/MiniExplorer/ExplorerMenu.jsx  (BARU)
// Menu klik kanan. Isinya berbeda: area kosong (New > Folder, Paste), file/folder (Copy, Cut, Rename, Delete),
// atau di dalam Recycle Bin (Restore, Delete).
export default function ExplorerMenu({ menu, view, canPaste, isFolder, dispatch }) {
  const item = (label, action, { disabled = false, hint = '' } = {}) => (
    <button key={label} type="button" role="menuitem" className="mexp__menu-item" disabled={disabled} onClick={() => dispatch(action)}>
      <span>{label}</span><small>{hint}</small>
    </button>
  )

  let items
  if (view === 'trash') {
    items = menu.target
      ? [item('Restore', { type: 'RESTORE' }), item('Delete', { type: 'PURGE_SELECTED' }, { hint: 'Del' })]
      : [item('Empty Recycle Bin', { type: 'EMPTY_TRASH' })]
  } else if (menu.target) {
    items = [
      ...(isFolder ? [item('Open', { type: 'OPEN', id: menu.target })] : []),
      item('Copy', { type: 'COPY' }, { hint: 'Ctrl+C' }),
      item('Cut', { type: 'CUT' }, { hint: 'Ctrl+X' }),
      item('Rename', { type: 'RENAME_START' }, { hint: 'F2' }),
      item('Delete', { type: 'DELETE' }, { hint: 'Del' }),
    ]
  } else {
    items = [
      item('New > Folder', { type: 'NEW_FOLDER' }, { hint: 'Ctrl+Shift+N' }),
      item('Paste', { type: 'PASTE' }, { disabled: !canPaste, hint: 'Ctrl+V' }),
    ]
  }

  return (
    <div className="mexp__menu" role="menu" style={{ left: menu.x, top: menu.y }} onContextMenu={(e) => e.preventDefault()}>
      {items}
    </div>
  )
}
