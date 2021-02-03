import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from './Table'
import Gradient from './Gradient'
import PaletteIcon from '@material-ui/icons/Palette'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import UpIcon from '@material-ui/icons/ArrowDropUp'

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
    flex: 0,
    backgroundColor: ({ showGradient }) => showGradient
      ? theme.palette.background.default
      : 'transparent',
  },
  gradientButton: {
    borderTop: `1px ${theme.palette.divider} solid`,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  icon: {
    color: theme.palette.text.primary,
    opacity: 0.38,
    display: 'block',
  },
  gradientContainer: {
    height: ({ showGradient }) => showGradient ? 340 : 0,
    transition: 'all 0.25s ease-out',
    borderTop: `1px ${theme.palette.divider} solid`,
  },
}))

const Languages = () => {
  const [showGradient, setShowGradient] = useState(false)
  const classes = useStyles({ showGradient })

  return (
    <div className={classes.root}>
      <div className={classes.table}>
        <Table />
      </div>
      <div className={classes.gradient}>
        <div
          className={classes.gradientButton}
          onClick={() => setShowGradient(!showGradient)}
        >
          <PaletteIcon className={classes.icon} />
          {showGradient
            ? <DownIcon className={classes.icon} />
            : <UpIcon className={classes.icon} />
          }
        </div>
        <div className={classes.gradientContainer}>
          <Gradient />
        </div>
      </div>
    </div>
  )
}

export default Languages
