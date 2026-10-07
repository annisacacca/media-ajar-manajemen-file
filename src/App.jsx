// src/App.jsx
// Tahap 2: loading screen -> kerangka pelajaran (Shell).
// DesignPreview (halaman cek desain Tahap 1) sudah tidak dipakai dan boleh dihapus.
import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import Shell from './components/Shell/Shell'

export default function App() {
  const [phase, setPhase] = useState('loading') // 'loading' | 'lesson'

  if (phase === 'loading') {
    return <LoadingScreen onStart={() => setPhase('lesson')} />
  }
  return <Shell />
}
