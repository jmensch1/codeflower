import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PaletteIcon from '@material-ui/icons/Palette'
import DownIcon from '@material-ui/icons/ArrowDropDown'
import UpIcon from '@material-ui/icons/ArrowDropUp'

const useStyles = makeStyles((theme) => ({
  root: {
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
}))

const Button = ({ open, onClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.root} onClick={onClick}>
      <PaletteIcon className={classes.icon} />
      {open ? (
        <DownIcon className={classes.icon} />
      ) : (
        <UpIcon className={classes.icon} />
      )}
    </div>
  )
}

export default Button
