import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: 6,
    backgroundColor: theme.palette.divider,
    cursor: 'ew-resize',
  },
}))

const DragBar = ({ onDragStart, onDrag, onDragEnd }) => {
  const classes = useStyles()
  const barRef = useRef(null)

  useEffect(() => {
    const bar = d3.select(barRef.current)

    bar.call(
      d3
        .drag()
        .on('start', onDragStart)
        .on('drag', ({ x }) => onDrag(x))
        .on('end', onDragEnd)
    )

    return () => {
      bar.on('mousedown.drag', null)
    }
  }, [onDragStart, onDrag, onDragEnd])

  return <div className={classes.root} ref={barRef} />
}

export default DragBar
