import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    outline: 0,
    border: 0,
    borderBottom: `1px solid ${theme.palette.text.primary}`,
    padding: 0,
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    width: '100%',
    ...theme.typography.body1,
    position: 'relative',
  },
  dropdown: {
    display: ({ isOpen }) => (isOpen ? 'block' : 'none'),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    borderTopLeftRadius: 0,
    border: `1px solid ${theme.palette.divider}`,
    borderLeft: 'none',
    borderTop: 'none',
    overflow: 'auto',
    cursor: 'pointer',
  },
  item: {},
}))

const Dropdown = ({ children, element }) => {
  return createPortal(children, element)
}

const Select = ({
  value = null,
  options = [],
  onChange = () => {},
  onHover = () => {},
  renderOption = () => null,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const classes = useStyles({ isOpen })
  const modalRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    containerRef.current.addEventListener('mousewheel', (e) => {
      e.stopPropagation()
      e.preventDefault()
    })
    const { bottom, left, width } = containerRef.current.getBoundingClientRect()
    modalRef.current = document.createElement('div')
    document.body.appendChild(modalRef.current)
    modalRef.current.style.position = 'absolute'
    modalRef.current.style.top = `${bottom}px`
    modalRef.current.style.left = `${left}px`
    modalRef.current.style.minWidth = `${width}px`
    modalRef.current.style.maxHeight = `calc(100vh - ${bottom + 50}px)`
    modalRef.current.style.overflow = 'auto'
    modalRef.current.style.zIndex = 10000
    setIsReady(true)
  }, [])

  return (
    <div
      ref={containerRef}
      className={classes.root}
      onClick={() => setIsOpen(!isOpen)}
      onMouseLeave={() => {
        setIsOpen(false)
        onHover(null)
      }}
    >
      <div>{value}</div>
      {isReady && (
        <Dropdown element={modalRef.current}>
          <div className={classes.dropdown}>
            {options.map((opt) => (
              <div
                key={opt}
                value={opt}
                className={classes.item}
                onClick={onChange.bind(null, opt)}
                onMouseEnter={onHover.bind(null, opt)}
              >
                {renderOption(opt)}
              </div>
            ))}
          </div>
        </Dropdown>
      )}
    </div>
  )
}

export default Select
