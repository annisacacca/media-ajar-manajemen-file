// src/components/MiniExplorer/MiniExplorer.jsx  (BARU)
// Mini File Explorer simulasi. Mendukung: buat folder, salin, pindah (termasuk seret-lepas),
// ganti nama, hapus ke Recycle Bin, pulihkan, hapus permanen. Bisa lewat toolbar, klik kanan, atau keyboard.
//
// Props:
//   initialNodes : daftar node awal (lihat lib/fsModel.js) - wajib punya node dengan id 'root'
//   startFolder  : id folder yang terbuka pertama kali
//   onEvent(ev)  : dipanggil setiap ada operasi { type, detail }  (dipakai misi di Tahap 7)
//   onChange(nodes): dipanggil setiap isi file system berubah     (dipakai misi di Tahap 7)
//   resetKey     : ganti nilainya untuk mengembalikan ke kondisi awal
import { useEffect, useRef, useState } from 'react'
import Dika from '../Dika/Dika'
import useExplorer from '../../hooks/useExplorer'
import { ROOT_ID, listIn, trashList, pathOf } from '../../lib/fsModel'
import ExplorerTile from './ExplorerTile'
import ExplorerTree from './ExplorerTree'
import ExplorerMenu from './ExplorerMenu'
import ExplorerDialog from './ExplorerDialog'
import './MiniExplorer.css'

// Tombol toolbar: label + pintasan kecil di bawahnya
function Tool({ label, hint, disabled, onClick, tone }) {
  return (
    <button type="button" className={`mexp__tool ${tone ? `mexp__tool--${tone}` : ''}`} disabled={disabled} onClick={onClick}>
      <span>{label}</span>{hint && <small>{hint}</small>}
    </button>
  )
}

export default function MiniExplorer({ initialNodes, startFolder = ROOT_ID, onEvent, onChange, resetKey = 0 }) {
  const [s, dispatch] = useExplorer(initialNodes, startFolder)
  const [over, setOver] = useState(null) // folder yang sedang disorot saat file diseret
  const boxRef = useRef(null)

  // Reset ke kondisi awal kalau resetKey berganti (kecuali saat pertama tampil)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    dispatch({ type: 'RESET', initialNodes, startFolder })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  // Laporkan event dan perubahan ke komponen induk (misi)
  const reported = useRef(0)
  useEffect(() => {
    if (s.event.n !== reported.current) { reported.current = s.event.n; onEvent?.(s.event) }
  }, [s.event, onEvent])
  useEffect(() => { onChange?.(s.nodes) }, [s.nodes, onChange])

  // Tutup menu klik kanan kalau klik di luar menu
  useEffect(() => {
    if (!s.menu) return undefined
    const close = (e) => { if (!e.target.closest?.('.mexp__menu')) dispatch({ type: 'MENU_CLOSE' }) }
    window.addEventListener('mousedown', close)
    return () => window.removeEventListener('mousedown', close)
  }, [s.menu, dispatch])

  const inTrash = s.view === 'trash'
  const items = inTrash ? trashList(s.nodes) : listIn(s.nodes, s.cwd)
  const trashCount = trashList(s.nodes).length
  const hasSel = s.selected.length > 0
  const oneFolderSel = s.selected.length === 1 && s.nodes[s.selected[0]]?.type === 'folder'
  const cutIds = s.clipboard?.mode === 'cut' ? s.clipboard.ids : []

  // Pintasan papan ketik. Catatan: beberapa peramban memakai Ctrl+Shift+N untuk jendela penyamaran,
  // jadi tombol "Folder Baru" di toolbar adalah cadangannya.
  const onKeyDown = (e) => {
    if (s.dialog || (e.target instanceof HTMLElement && e.target.tagName === 'INPUT')) return
    const k = e.key.toLowerCase()
    const ctrl = e.ctrlKey || e.metaKey
    if (e.key === 'Escape') dispatch({ type: 'MENU_CLOSE' })
    else if (ctrl && e.shiftKey && k === 'n') dispatch({ type: 'NEW_FOLDER' })
    else if (ctrl && k === 'c') dispatch({ type: 'COPY' })
    else if (ctrl && k === 'x') dispatch({ type: 'CUT' })
    else if (ctrl && k === 'v') dispatch({ type: 'PASTE' })
    else if (e.key === 'F2') dispatch({ type: 'RENAME_START' })
    else if (e.key === 'Delete') dispatch(inTrash ? { type: 'PURGE_SELECTED' } : { type: 'DELETE', permanent: e.shiftKey })
    else if (e.key === 'Enter' && oneFolderSel) dispatch({ type: 'OPEN', id: s.selected[0] })
    else return
    e.preventDefault()
    e.stopPropagation()
  }

  const openMenu = (e, target) => {
    e.preventDefault()
    e.stopPropagation()
    const r = boxRef.current.getBoundingClientRect()
    dispatch({ type: 'MENU_OPEN', x: Math.min(e.clientX - r.left, r.width - 230), y: Math.min(e.clientY - r.top, r.height - 200), target })
  }

  const idsFromDrop = (e) => {
    try { return JSON.parse(e.dataTransfer.getData('text/plain')) } catch { return [] }
  }

  const where = inTrash ? 'Recycle Bin' : pathOf(s.nodes, s.cwd)

  return (
    <div className="mexp" ref={boxRef} tabIndex={-1} onKeyDown={onKeyDown}>
      <div className="mexp__bar" aria-hidden="true">File Explorer</div>

      <div className="mexp__toolbar" role="toolbar" aria-label="Perintah File Explorer">
        {inTrash ? (
          <>
            <Tool label="Restore" disabled={!hasSel} tone="green" onClick={() => dispatch({ type: 'RESTORE' })} />
            <Tool label="Delete" hint="Del" disabled={!hasSel} onClick={() => dispatch({ type: 'PURGE_SELECTED' })} />
            <Tool label="Empty Recycle Bin" disabled={trashCount === 0} tone="red" onClick={() => dispatch({ type: 'EMPTY_TRASH' })} />
          </>
        ) : (
          <>
            <Tool label="Folder Baru" hint="Ctrl+Shift+N" onClick={() => dispatch({ type: 'NEW_FOLDER' })} />
            <Tool label="Copy" hint="Ctrl+C" disabled={!hasSel} onClick={() => dispatch({ type: 'COPY' })} />
            <Tool label="Cut" hint="Ctrl+X" disabled={!hasSel} onClick={() => dispatch({ type: 'CUT' })} />
            <Tool label="Paste" hint="Ctrl+V" disabled={!s.clipboard} onClick={() => dispatch({ type: 'PASTE' })} />
            <Tool label="Rename" hint="F2" disabled={s.selected.length !== 1} onClick={() => dispatch({ type: 'RENAME_START' })} />
            <Tool label="Delete" hint="Del" disabled={!hasSel} tone="red" onClick={() => dispatch({ type: 'DELETE' })} />
          </>
        )}
      </div>

      <div className="mexp__address">
        <button type="button" className="mexp__up" disabled={inTrash || !s.nodes[s.cwd]?.parent} onClick={() => dispatch({ type: 'UP' })} aria-label="Naik satu folder">Up</button>
        <span className="mexp__path" aria-label="Lokasi saat ini">{where}</span>
      </div>

      <div className="mexp__body">
        <ExplorerTree
          nodes={s.nodes}
          cwd={s.cwd}
          view={s.view}
          trashCount={trashCount}
          over={over}
          setOver={setOver}
          onOpen={(id) => dispatch({ type: 'OPEN', id })}
          onShowTrash={() => dispatch({ type: 'SHOW_TRASH' })}
          onMoveTo={(ids, dest) => ids.length && dispatch({ type: 'MOVE_TO', ids, dest })}
          onTrashDrop={(ids) => ids.length && dispatch({ type: 'TRASH_DROP', ids })}
        />

        {/* Panel isi folder. Klik area kosong = batal pilih; klik kanan area kosong = menu New/Paste */}
        <div
          className="mexp__grid"
          role="group"
          aria-label={`Isi ${where}`}
          onClick={() => dispatch({ type: 'CLEAR_SELECT' })}
          onContextMenu={(e) => openMenu(e, null)}
        >
          {items.length === 0 && <p className="mexp__empty">{inTrash ? 'Recycle Bin kosong.' : 'Folder ini kosong.'}</p>}
          {items.map((n) => (
            <ExplorerTile
              key={n.id}
              node={n}
              selected={s.selected.includes(n.id)}
              cut={cutIds.includes(n.id)}
              renaming={s.renaming === n.id}
              renameError={s.renaming === n.id ? s.renameError : ''}
              subtitle={inTrash ? `dari ${pathOf(s.nodes, n.parent)}` : ''}
              draggable={!inTrash}
              dropOver={over === n.id}
              onSelect={(e) => dispatch({ type: 'SELECT', id: n.id, additive: e.ctrlKey || e.metaKey })}
              onOpen={() => dispatch({ type: 'OPEN', id: n.id })}
              onContext={(e) => openMenu(e, n.id)}
              onDragStart={(e) => {
                const ids = s.selected.includes(n.id) ? s.selected : [n.id]
                if (!s.selected.includes(n.id)) dispatch({ type: 'SELECT', id: n.id })
                e.dataTransfer.setData('text/plain', JSON.stringify(ids))
                e.dataTransfer.effectAllowed = 'move'
              }}
              onDragEnd={() => setOver(null)}
              onDragEnter={() => setOver(n.id)}
              onDragLeave={() => setOver((o) => (o === n.id ? null : o))}
              onDropOn={inTrash ? undefined : (e) => { setOver(null); const ids = idsFromDrop(e).filter((i) => i !== n.id); if (ids.length) dispatch({ type: 'MOVE_TO', ids, dest: n.id }) }}
              onRename={(name) => dispatch({ type: 'RENAME_COMMIT', id: n.id, name })}
              onRenameCancel={() => dispatch({ type: 'RENAME_CANCEL' })}
            />
          ))}
        </div>
      </div>

      <div className="mexp__status" role="status">
        <Dika expression={s.face} size={56} />
        <p>{s.msg}</p>
        <span className="mexp__count">{hasSel ? `${s.selected.length} dipilih` : `${items.length} item`}</span>
      </div>

      {s.menu && <ExplorerMenu menu={s.menu} view={s.view} canPaste={!!s.clipboard} isFolder={s.menu.target && s.nodes[s.menu.target]?.type === 'folder'} dispatch={dispatch} />}
      {s.dialog && <ExplorerDialog dialog={s.dialog} nodes={s.nodes} dispatch={dispatch} />}
    </div>
  )
}
