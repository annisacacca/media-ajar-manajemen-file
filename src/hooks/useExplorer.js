// src/hooks/useExplorer.js  (BARU)
// Penghubung reducer mini File Explorer ke React.
// Pakai: const [state, dispatch] = useExplorer(daftarNode, idFolderAwal)
import { useReducer } from 'react'
import { init, reducer } from '../lib/explorerReducer'

export default function useExplorer(initialNodes, startFolder) {
  return useReducer(reducer, { initialNodes, startFolder }, init)
}
