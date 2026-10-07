// src/hooks/useLesson.js  (DIGANTI: sistem bintang dihapus, diganti kemajuan misi otomatis)
// state.misi = { nodes, ticks, trashed, restored, log }
//   nodes   : isi file system simulasi terakhir (supaya tidak hilang saat pindah halaman)
//   ticks   : centang yang sudah terpenuhi, kunci "m{misi}-{butir}" (sekali terpenuhi, tetap terpenuhi)
//   trashed : id file yang pernah masuk Recycle Bin; restored: pernah memulihkan file
//   log     : catatan langkah otomatis
import { useCallback, useMemo, useReducer } from 'react'
import { SECTIONS } from '../data/sections'
import { evaluate, logLine } from '../lib/misiCheck'

const LAST = SECTIONS.length - 1
const clamp = (n) => Math.max(0, Math.min(LAST, n))

const freshMisi = () => ({ nodes: null, ticks: {}, trashed: [], restored: false, log: [] })

const initialState = {
  index: 0,
  dir: 1,
  visited: { [SECTIONS[0].id]: true },
  missionUnlocked: false,
  pemantikShown: 0,
  misi: freshMisi(),
  kuis: {}, // jawaban kuis: { idSoal: idOpsi }, disimpan supaya tidak hilang saat pindah halaman
}

function goTo(state, rawIndex) {
  const index = clamp(rawIndex)
  if (index === state.index) return state
  return {
    ...state,
    index,
    dir: index > state.index ? 1 : -1,
    visited: { ...state.visited, [SECTIONS[index].id]: true },
  }
}

// Hitung ulang centang dari isi file system; centang yang sudah menyala tidak dimatikan lagi
function withTicks(m) {
  if (!m.nodes) return m
  const ticks = { ...m.ticks }
  evaluate(m.nodes, m).items.forEach((row, i) => row.forEach((ok, j) => { if (ok) ticks[`m${i}-${j}`] = true }))
  return { ...m, ticks }
}

function reducer(state, action) {
  switch (action.type) {
    case 'GO':
      return goTo(state, action.index)
    case 'STEP':
      return goTo(state, state.index + action.delta)
    case 'UNLOCK_MISSION':
      return state.missionUnlocked ? state : { ...state, missionUnlocked: true }
    case 'REVEAL_PEMANTIK':
      return { ...state, pemantikShown: Math.min(action.max, state.pemantikShown + 1) }
    case 'RESET_PEMANTIK':
      return { ...state, pemantikShown: 0 }
    case 'MISI_SYNC': // isi file system berubah
      return { ...state, misi: withTicks({ ...state.misi, nodes: action.nodes }) }
    case 'MISI_EVENT': { // satu operasi file selesai
      const m = state.misi
      const ev = action.event
      const trashed = ev.type === 'delete' ? [...new Set([...m.trashed, ...(ev.detail.ids ?? [])])] : m.trashed
      const restored = m.restored || (ev.type === 'restore' && trashed.length > 0)
      const line = logLine(ev, m.nodes)
      return { ...state, misi: withTicks({ ...m, trashed, restored, log: line ? [...m.log, line].slice(-60) : m.log }) }
    }
    case 'KUIS_PICK':
      return state.kuis[action.id] ? state : { ...state, kuis: { ...state.kuis, [action.id]: action.option } }
    case 'KUIS_RESET':
      return { ...state, kuis: {} }
    case 'MISI_RESET':
      return { ...state, misi: freshMisi() }
    default:
      return state
  }
}

export default function useLesson() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // useCallback: identitas tetap, WAJIB stabil karena dipakai sebagai dependensi useEffect di MiniExplorer
  const go = useCallback((index) => dispatch({ type: 'GO', index }), [])
  const next = useCallback(() => dispatch({ type: 'STEP', delta: 1 }), [])
  const prev = useCallback(() => dispatch({ type: 'STEP', delta: -1 }), [])
  const unlockMission = useCallback(() => dispatch({ type: 'UNLOCK_MISSION' }), [])
  const revealPemantik = useCallback((max) => dispatch({ type: 'REVEAL_PEMANTIK', max }), [])
  const resetPemantik = useCallback(() => dispatch({ type: 'RESET_PEMANTIK' }), [])
  const misiSync = useCallback((nodes) => dispatch({ type: 'MISI_SYNC', nodes }), [])
  const misiEvent = useCallback((event) => dispatch({ type: 'MISI_EVENT', event }), [])
  const misiReset = useCallback(() => dispatch({ type: 'MISI_RESET' }), [])
  const kuisPick = useCallback((id, option) => dispatch({ type: 'KUIS_PICK', id, option }), [])
  const kuisReset = useCallback(() => dispatch({ type: 'KUIS_RESET' }), [])

  return useMemo(
    () => ({
      state,
      section: SECTIONS[state.index],
      total: SECTIONS.length,
      go, next, prev, unlockMission, revealPemantik, resetPemantik, misiSync, misiEvent, misiReset, kuisPick, kuisReset,
    }),
    [state, go, next, prev, unlockMission, revealPemantik, resetPemantik, misiSync, misiEvent, misiReset, kuisPick, kuisReset],
  )
}
