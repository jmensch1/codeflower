import React from 'react'
import { useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import Content from './Content'
import { toggleTerminal } from 'store/terminal'
import { useTerminal } from 'store/selectors'

const useStyles = createUseStyles(theme => {
  return {
    root: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 400,
      zIndex: 1,
      backgroundColor: 'black',
      opacity: 0.8,
      color: 'white',
      overflow: 'hidden',
      borderTopLeftRadius: 5,
      fontFamily: 'Arial',
      fontSize: 12,
      userSelect: 'none',
    },
    header: {
      textAlign: 'right',
      padding: '5px 10px 5px 12px',
      paddingRight: 15,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
    },
    arrow: {
      transform: ({ isOpen }) => isOpen
        ? 'rotate(180deg) translateY(2px)'
        : 'translateY(3px)',
    },
    divider: {
      borderTop: '1px white solid',
    },
    body: {
      position: 'relative',
      lineHeight: '18px',
      transition: 'height 0.5s ease-in-out',
      height: ({ isOpen }) => isOpen ? 400 : 0,
    }
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
