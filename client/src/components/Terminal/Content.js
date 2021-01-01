import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { subscribe, unsubscribe } from 'store/repo'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles((theme) => {
  return {
    root: {
      position: 'absolute',
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
      paddingRight: 8,
      overflowY: 'auto',
      wordBreak: 'break-all',
      '&::-webkit-scrollbar': {
        width: 6,
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.0)',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 105, 180, 1.0)',
        borderRadius: '4px',
      },
    },
  }
})

const Terminal = () => {
  const dispatch = useDispatch()
  const container = useRef(null)
  const classes = useStyles()
  const scrollDown = useRef(true)
  const timer = useRef(null)

  const onUpdate = useCallback((text) => {
    if (text) {
      const newEl = document.createElement('div')
      newEl.innerText = text
      container.current.append(newEl)
    } else {
      container.current.append(document.createElement('br'))
    }
    if (scrollDown.current)
      container.current.scrollTop = container.current.scrollHeight
  }, [])

  useEffect(() => {
    dispatch(subscribe(onUpdate))
    return () => dispatch(unsubscribe(onUpdate))
  }, [dispatch, onUpdate])

  useEffect(() => {
    container.current.onmousewheel = () => {
      scrollDown.current = false
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        scrollDown.current = true
      }, 4000)
    }
  }, [])

  return <div ref={container} className={classes.root} />
}

export default Terminal
