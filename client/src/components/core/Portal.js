import { useRef } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ domElementId, children }) => {
  const el = useRef(document.getElementById(domElementId))
  return el.current
    ? createPortal(children, el.current)
    : null
}

export default Portal
