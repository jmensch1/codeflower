import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { checkerGradient } from 'services/utils'
import { useCamera } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: ({ visible }) => (visible ? 'block' : 'none'),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    background: checkerGradient({
      alpha: 0.04,
      backgroundColor: theme.palette.background.default,
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

const CheckerBackground = () => {
  const { transparent: visible } = useCamera()
  const classes = useStyles({ visible })
  return <div className={classes.root} />
}

export default CheckerBackground
