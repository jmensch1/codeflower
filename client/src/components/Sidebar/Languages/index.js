import React, { useState, useCallback, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from './Table'
import Button from './Button'
import Picker from './Picker'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: ({ showPicker, pickerHeight }) =>
      showPicker ? `calc(100% - ${pickerHeight}px)` : '100%',
    transition: 'height 0.25s ease-out',
  },
  table: {
    flex: 1,
    padding: 8,
    overflow: 'auto',
    overscrollBehavior: 'contain',
  },
  button: {
    backgroundColor: ({ showPicker }) =>
      showPicker ? theme.palette.background.default : 'transparent',
  },
  picker: {
    borderTop: `1px ${theme.palette.divider} solid`,
    backgroundColor: theme.palette.background.default,
  },
}))

const Languages = () => {
  const pickerRef = useRef(null)
  const [pickerHeight, setPickerHeight] = useState(0)
  const [showPicker, setShowPicker] = useState(false)
  const classes = useStyles({ showPicker, pickerHeight })

  useEffect(() => {
    setPickerHeight(pickerRef.current.offsetHeight)
  }, [])

  const toggle = useCallback(() => {
    setShowPicker((showPicker) => !showPicker)
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.table}>
          <Table />
        </div>
        <div className={classes.button}>
          <Button onClick={toggle} open={showPicker} />
        </div>
      </div>
      <div ref={pickerRef} className={classes.picker}>
        <Picker />
      </div>
    </div>
  )
}

export default Languages
