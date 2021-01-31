import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient, lightnessGradient } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}))

const DoubleHuePicker = () => {
  const classes = useStyles()

  const hue = hueGradient({
    hueMin: 0,
    hueMax: 360,
    saturation: 100,
    lightness: 50,
    alpha: 1,
  })

  // const lightness = lightnessGradient(20, 'top')

  // const background = 'linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))'
  // const background = 'linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(360,0%,0%,0))'

  return (
    <div className={classes.root}>
      <div style={{
        height: 100,
        backgroundImage: `linear-gradient(0deg, hsla(0,0%,100%,1) 0%, hsla(0,0%,100%,0) 50%, hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,1) 100%), ${hue}`,
      }} />
      <div style={{
        height: 100,
        backgroundImage: `linear-gradient(0deg,hsla(0,0%,0%,0),hsla(0,0%,0%,1)), ${hue}`,
      }} />
      <div style={{
        height: 100,
        backgroundImage: `linear-gradient(0deg,hsla(0,0%,100%,1),hsla(0,0%,100%,0)), ${hue}`,
      }} />
    </div>
  )
}

export default DoubleHuePicker
