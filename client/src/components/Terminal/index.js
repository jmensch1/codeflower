import React from 'react'
import { useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import Content from './Content'
import { toggleTerminal } from 'store/terminal'
import { useTerminal } from 'store/selectors'

const HEADER_HEIGHT = 36
const SMALL_BODY_WIDTH = 400

const useStyles = createUseStyles(theme => {
  return {
    root: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: ({ isOpen }) => isOpen ? '100%' : SMALL_BODY_WIDTH,
      height: ({ isOpen }) => isOpen ? '100%' : HEADER_HEIGHT - 1,
      zIndex: 1,
      backgroundColor: 'black',
      opacity: 0.9,
      color: 'white',
      overflow: 'hidden',
      borderTopLeftRadius: 5,
      fontFamily: 'Roboto',
      fontSize: 16,
      userSelect: 'none',
      transition: 'all 0.35s ease-in-out',
      cursor: 'pointer',
      lineHeight: '20px',

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
      transform: ({ isOpen }) => isOpen
        ? 'rotate(180deg) translateY(2px)'
        : 'translateY(3px)',
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
  const { isOpen } = useTerminal()
  const classes = useStyles({ isOpen })
  const dispatch = useDispatch()

  return (
    <div onClick={()=> dispatch(toggleTerminal())} className={classes.root}>
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
