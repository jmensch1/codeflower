import React, { useState, useCallback, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from './Table'
import GradientButton from './GradientButton'
import Gradient from './Gradient'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  table: {
    padding: 10,
    flex: 1,
    position: 'relative',
  },
  gradient: {
    backgroundColor: ({ showGradient }) => showGradient
      ? theme.palette.background.default
      : 'transparent',
  },
  gradientInner: {
    transition: ({ measured }) => measured ? 'all 0.25s ease-out' : undefined,
    borderTop: ({ showGradient }) =>
      showGradient ? `1px ${theme.palette.divider} solid` : undefined,
    height: ({ showGradient, height, measured }) =>
      measured ? (showGradient ? height : 0) : undefined
  },
}))

const Languages = () => {
  const [showGradient, setShowGradient] = useState(false)
  const [dimensions, setDimensions] = useState(null)
  const [measured, setMeasured] = useState(false)
  const gradientRef = useRef(null)

  const classes = useStyles({
    showGradient,
    measured,
    height: dimensions?.height,
  })

  useEffect(() => {
    setDimensions(gradientRef.current.getBoundingClientRect())
    setTimeout(() => setMeasured(true), 0) // prevents flicker
  }, [])

  const toggle = useCallback(() => {
    setShowGradient((showGradient) => !showGradient)
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.table}>
        <Table />
      </div>
      <div style={{ opacity: measured ? undefined : 0 }} className={classes.gradient}>
        <GradientButton
          onClick={toggle}
          showGradient={showGradient}
        />
        <div
          ref={gradientRef}
          className={classes.gradientInner}
        >
          <Gradient />
        </div>
      </div>
    </div>
  )
}

export default Languages
