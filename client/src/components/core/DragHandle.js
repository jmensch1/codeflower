import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      // override other cursors while dragging
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        cursor: 'ew-resize',
        display: ({ dragging }) => (dragging ? 'block' : 'none'),
      },
    },
  },
  root: {
    height: '100%',
    width: ({ width }) => width,
    backgroundColor: theme.palette.divider,
    cursor: 'ew-resize',
  },
}))

const DragHandle = ({ onDrag, width }) => {
  const [dragging, setDragging] = useState(false)
  const classes = useStyles({ dragging, width })
  const barRef = useRef(null)

  useEffect(() => {
    const bar = d3.select(barRef.current)

    bar.call(
      d3
        .drag()
        .on('start', () => setDragging(true))
        .on('drag', ({ x }) => onDrag(x))
        .on('end', () => setDragging(false))
    )

    return () => {
      bar.on('mousedown.drag', null)
    }
  }, [onDrag])

  return <div className={classes.root} ref={barRef} />
}

export default DragHandle
