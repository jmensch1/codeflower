import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { svgAsDataUri } from 'save-svg-as-png'
import { getSvgDimensions } from './utils'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  inner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2em',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
  },
}))

const Export = () => {
  const classes = useStyles()
  const [dataUri, setDataUri] = useState(null)
  const theme = useTheme()

  useEffect(() => {
    const svg = document.querySelector('#fdg-container svg')
    const scale = 2

    const { viewBox, ratio } = getSvgDimensions(svg)
    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    svgAsDataUri(svg, {
      ...viewBox,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
    }).then(setDataUri)
  }, [theme])

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <img className={classes.image} alt='export' src={dataUri} />
      </div>
    </div>
  )
}

export default Export
