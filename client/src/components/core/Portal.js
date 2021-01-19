import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ domElementId, children }) => {
  const [element, setElement] = useState(null)

  useEffect(() => {
    const el = document.getElementById(domElementId)
    if (el) return setElement(el)

    new MutationObserver((_, observer) => {
      const el = document.getElementById(domElementId)
      if (el) {
        setElement(el)
        observer.disconnect()
      }
    }).observe(document, { childList: true, subtree: true })
  }, [domElementId])

  return element ? createPortal(children, element) : null
}

export default Portal
