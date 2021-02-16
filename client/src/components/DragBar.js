import React, { useRef, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useMainTheme } from 'store/selectors'
import { updateMainTheme } from 'store/actions/settings'
import * as d3 from 'd3'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '0.25em',
    backgroundColor: theme.palette.divider,
    cursor: 'ew-resize',
  },
}))

const DragBar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const barRef = useRef(null)

  const updateSidebarWidth = useCallback((width) => {
    dispatch(updateMainTheme('layout.sidebarWidth', width))
  }, [dispatch])

  const updateCursor = useCallback((cursor) => {
    dispatch(updateMainTheme('app.cursor', cursor))
  }, [dispatch])

  useEffect(() => {
    const bar = d3.select(barRef.current)

    const onDrag = ({ x }) => updateSidebarWidth(x)

    bar.call(
      d3.drag()
        .on('start', () => updateCursor('ew-resize'))
        .on('drag', onDrag)
        .on('end', () => updateCursor('default'))
    )

    return () => {
      bar.on('mousedown.drag', null)
    }
  }, [updateSidebarWidth, updateCursor])

  return <div className={classes.root} ref={barRef} />
}

export default DragBar
