import React, { useCallback } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { saveSvgAsPng } from 'save-svg-as-png'
import TextButton from 'components/core/TextButton'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
  },
}))

const Camera = () => {
  const classes = useStyles()
  const theme = useTheme()

  const saveImage = useCallback(() => {
    const svg = document.querySelector('#fdg-container svg')
    const { width, height } = svg.getBoundingClientRect()
    saveSvgAsPng(svg, 'image.png', {
      width,
      height,
      left: -width / 2,
      top: -height / 2,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
      scale: 2,
    })
  }, [theme])

  return (
    <div className={classes.root}>
      <TextButton label='click' onClick={saveImage} />
    </div>
  )
}

export default Camera
