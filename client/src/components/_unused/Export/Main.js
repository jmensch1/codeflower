import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { checkerGradient } from 'services/utils/color'
import { getSvgDimensions } from './utils'
import PngCropper from './PngCropper'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2em',
    backgroundColor: theme.palette.background.paper,
    '& svg': {
      maxHeight: '100%',
      maxWidth: '100%',
      display: 'block',
    },
  },
}))

const Main = ({ settings }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [svg, setSvg] = useState(null)

  useEffect(() => {
    const svg = document.querySelector('#fdg-container svg')

    const svgClone = svg.cloneNode(true)
    const { left, top, width, height } = getSvgDimensions(svg).viewBox
    svgClone.setAttribute('viewBox', `${left} ${top} ${width} ${height}`)

    setSvg(svgClone)
  }, [])

  useEffect(() => {
    if (!svg) return

    svg.style.background = settings.transparent
      ? checkerGradient({ alpha: 0.05 })
      : theme.palette.background.default
  }, [svg, theme, settings])

  return (
    <div className={classes.root}>
      {svg && settings.format === 'svg' && (
        <div
          className={classes.svgContainer}
          ref={(node => node && node.appendChild(svg))}
        />
      )}
      {svg && settings.format === 'png' && (
        <div className={classes.svgContainer}>
          <PngCropper
            svg={svg}
          />
        </div>
      )}
      {/*<div
        className={classes.inner}
        id="export-container"
      />*/}
    </div>
  )
}

export default Main
