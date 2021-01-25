import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '20%',
    transform: 'translateY(-20%)',
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxHeight: '100%',
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    border: `1px ${theme.palette.divider} solid`,
    borderRight: 'none',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    opacity: 0.9,
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}))

const Bar = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

export default Bar
