import { useRef } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ domElementId, children }) => {
  const el = useRef(document.getElementById(domElementId))
  return createPortal(children, el.current)
}

export default Portal
