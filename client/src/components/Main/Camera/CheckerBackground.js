import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { checkerGradient } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: ({ visible }) => visible ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: checkerGradient({
      alpha: 0.04,
      backgroundColor: theme.palette.background.default
    }),
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      backgroundColor: theme.palette.background.default,
    },
  },
}))

const CheckerBackground = ({ visible }) => {
  const classes = useStyles({ visible })
  return <div className={classes.root} />
}

export default CheckerBackground
