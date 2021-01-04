import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { openModal, closeModal } from 'store/modals'
import { useModal } from 'store/selectors'
import Content from './Content'

const HEADER_HEIGHT = 36
const SMALL_BODY_WIDTH = 500

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'black',
      opacity: 0.9,
      color: 'white',
      overflow: 'hidden',
      borderTopLeftRadius: 5,
      fontFamily: 'monospace',
      userSelect: 'none',
      transition: 'all 0.35s ease-in-out',
      cursor: 'pointer',
      fontSize: 13,

      // full-screen option
      // width: ({ isOpen }) => isOpen ? '100%' : SMALL_BODY_WIDTH,
      // height: ({ isOpen }) => isOpen ? '100%' : HEADER_HEIGHT - 1,

      // right corner option
      width: SMALL_BODY_WIDTH,
      height: ({ isOpen }) => (isOpen ? 500 : HEADER_HEIGHT - 1),
    },
    header: {
      height: HEADER_HEIGHT,
      padding: '0 15px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    arrow: {
      transform: ({ isOpen }) =>
        isOpen ? 'rotate(180deg) translateY(2px)' : 'translateY(3px)',
    },
    body: {
      position: 'relative',
      height: `calc(100% - ${HEADER_HEIGHT}px)`,
    },
    divider: {
      borderTop: '1px white solid',
    },
  }
})

const Terminal = () => {
  const { isOpen } = useModal('terminal')
  const classes = useStyles({ isOpen })
  const dispatch = useDispatch()

  const toggleTerminal = useCallback(() => {
    const func = isOpen ? closeModal : openModal
    dispatch(func('terminal'))
  }, [isOpen, dispatch])

  return (
    <div onClick={toggleTerminal} className={classes.root}>
      <div className={classes.header}>
        <span className={classes.arrow}>^</span>
        <span>term</span>
      </div>
      <div className={classes.body}>
        <div className={classes.divider} />
        <Content />
      </div>
    </div>
  )
}

export default Terminal
