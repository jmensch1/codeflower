// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCamera } from 'store/selectors'
import useSize from 'hooks/useSize'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  shutter: {
    border: `1px ${theme.palette.text.primary} dashed`,
    position: 'absolute',
    pointerEvents: 'none',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: ({ flashOn }) =>
        flashOn ? `hsla(0,0%,100%,0.5)` : `hsla(0,0%,100%,0)`,
      transition: 'background-color 0.1s ease-out',
    }
  },
  blocker: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.8,
  }
}))

function getPosition(parentWidth, parentHeight, aspect) {
  const parentAspect = parentWidth / parentHeight

  let width, height
  if (parentAspect > aspect) {
    height = 100
    width = 100 * aspect / parentAspect
  } else {
    width = 100
    height = 100 * parentAspect / aspect
  }

  const top = (100 - height) / 2;
  const left = (100 - width) / 2;

  return {
    width,
    height,
    top,
    left,
  }
}

const Shutter = () => {
  const { flashOn } = useCamera()
  const [shutterPosition, setShutterPosition] = useState(null)
  const classes = useStyles({ flashOn })
  const container = useRef(null)
  const dimensions = useSize(container)

  useEffect(() => {
    if (!dimensions) return

    const { width, height } = dimensions
    const position = getPosition(width, height, 4 / 3)
    setShutterPosition(position)
  }, [dimensions])

  return (
    <div className={classes.root} ref={container}>
      {shutterPosition && (
        <>
          <div
            className={classes.shutter}
            style={{
              left: shutterPosition.left + '%',
              top: shutterPosition.top + '%',
              width: shutterPosition.width + '%',
              height: shutterPosition.height + '%',
            }}
          />
          <div
            className={classes.blocker}
            style={{
              top: 0,
              bottom: 0,
              left: 0,
              width: shutterPosition.left + '%',
            }}
          />
          <div
            className={classes.blocker}
            style={{
              top: 0,
              bottom: 0,
              right: 0,
              width: shutterPosition.left + '%',
            }}
          />
          <div
            className={classes.blocker}
            style={{
              left: 0,
              right: 0,
              top: 0,
              height: shutterPosition.top + '%',
            }}
          />
          <div
            className={classes.blocker}
            style={{
              left: 0,
              right: 0,
              bottom: 0,
              height: shutterPosition.top + '%',
            }}
          />

        </>
      )}
    </div>
  )
}

export default Shutter
