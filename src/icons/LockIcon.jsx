// src/icons/LockIcon.jsx
import PixelArt from '../components/PixelArt/PixelArt'

const CLOSED = [
  '............',
  '...kkkkkk...',
  '..kk....kk..',
  '..k......k..',
  '..k......k..',
  '.kkkkkkkkkk.',
  '.kyyyyyyyyk.',
  '.kyyykkyyyk.',
  '.kyyykkyyyk.',
  '.kyyyyyyyyk.',
  '.kkkkkkkkkk.',
  '............',
]

const OPEN = [
  '............',
  '...kkkkkk...',
  '..kk....kk..',
  '..k......k..',
  '..k.........',
  '.kkkkkkkkkk.',
  '.kyyyyyyyyk.',
  '.kyyykkyyyk.',
  '.kyyykkyyyk.',
  '.kyyyyyyyyk.',
  '.kkkkkkkkkk.',
  '............',
]

// open=true -> gembok terbuka (misi terbuka), open=false -> terkunci
export default function LockIcon({ open = false, ...props }) {
  return <PixelArt grid={open ? OPEN : CLOSED} {...props} />
}
