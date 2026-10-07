// src/components/MiniExplorer/ExplorerDialog.jsx  (BARU)
// Kotak dialog di tengah jendela: konflik nama (Replace/Skip), peringatan ganti ekstensi (Yes/No),
// konfirmasi hapus permanen, dan konfirmasi kosongkan Recycle Bin.
export default function ExplorerDialog({ dialog, nodes, dispatch }) {
  let title; let body; let actions
  switch (dialog.type) {
    case 'conflict':
      title = 'Replace or Skip Files'
      body = <p>Folder tujuan sudah memuat file bernama <strong>{dialog.name}</strong>. Replace akan menimpa file lama, jadi baca pilihan dengan teliti.</p>
      actions = (
        <>
          <button type="button" className="btn btn--red" onClick={() => dispatch({ type: 'RESOLVE_CONFLICT', choice: 'replace' })}>Replace (timpa)</button>
          <button type="button" className="btn btn--paper" autoFocus onClick={() => dispatch({ type: 'RESOLVE_CONFLICT', choice: 'skip' })}>Skip (lewati)</button>
        </>
      )
      break
    case 'ext':
      title = 'Rename'
      body = <p>Jika kamu mengubah ekstensi dari <strong>{dialog.oldExt}</strong> menjadi <strong>{dialog.newExt || '(kosong)'}</strong>, file bisa menjadi tidak dapat dibuka. Yakin ingin mengubahnya?</p>
      actions = (
        <>
          <button type="button" className="btn btn--paper" autoFocus onClick={() => dispatch({ type: 'EXT_NO' })}>No (tidak)</button>
          <button type="button" className="btn btn--red" onClick={() => dispatch({ type: 'EXT_YES' })}>Yes (ya)</button>
        </>
      )
      break
    case 'permanent':
      title = 'Delete'
      body = <p>Hapus <strong>{dialog.ids.map((i) => nodes[i]?.name).filter(Boolean).join(', ')}</strong> secara permanen? File tidak dapat dikembalikan dengan cara biasa.</p>
      actions = (
        <>
          <button type="button" className="btn btn--paper" autoFocus onClick={() => dispatch({ type: 'DIALOG_CLOSE' })}>Batal</button>
          <button type="button" className="btn btn--red" onClick={() => dispatch({ type: 'PURGE_CONFIRM' })}>Hapus permanen</button>
        </>
      )
      break
    default: // 'empty'
      title = 'Empty Recycle Bin'
      body = <p>Semua isi Recycle Bin akan dihapus permanen dan tidak dapat dikembalikan. Lanjutkan?</p>
      actions = (
        <>
          <button type="button" className="btn btn--paper" autoFocus onClick={() => dispatch({ type: 'DIALOG_CLOSE' })}>Batal</button>
          <button type="button" className="btn btn--red" onClick={() => dispatch({ type: 'EMPTY_CONFIRM' })}>Kosongkan</button>
        </>
      )
  }
  return (
    <div className="mexp__overlay">
      <div className="mexp__dialog" role="alertdialog" aria-label={title}>
        <div className="mexp__dialog-bar">{title}</div>
        <div className="mexp__dialog-body">{body}</div>
        <div className="mexp__dialog-actions">{actions}</div>
      </div>
    </div>
  )
}
