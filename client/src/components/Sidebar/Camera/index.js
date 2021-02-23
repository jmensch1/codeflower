import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  saveSvgAsPng,
  svgAsDataUri,
} from 'save-svg-as-png'
import TextButton from 'components/core/TextButton'
import Slider from 'components/core/Slider'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    textAlign: 'center',
  },
  preview: {
    display: 'inline-block',
    maxWidth: '100%',
    maxHeight: 300,
  },
  dimensions: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  slider: {
    marginTop: 20,
    width: 200,
    display: 'inline-block',
  },
  buttons: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}))

// returns the bounding box of the svg -- in the viewbox coordinate system
function getViewboxBoundingRect(svg) {
  const { width, height } = svg.getBoundingClientRect()
  const matrix = svg.getCTM().inverse()

  // top-left corner of svg
  const pt0 = svg.createSVGPoint()
  pt0.x = 0
  pt0.y = 0
  const svgPt0 = pt0.matrixTransform(matrix)

  // bottom-right corner
  const pt1 = svg.createSVGPoint()
  pt1.x = width
  pt1.y = height
  const svgPt1 = pt1.matrixTransform(matrix)

  return {
    left: svgPt0.x,
    width: svgPt1.x - svgPt0.x,
    top: svgPt0.y,
    height: svgPt1.y - svgPt0.y,
  }
}

const Camera = () => {
  const theme = useTheme()
  const classes = useStyles()
  const [svg, setSvg] = useState(null)
  const [dataUri, setDataUri] = useState(null)
  const [svgDimensions, setSvgDimensions] = useState(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      const svg = document.querySelector('#fdg-container svg')
      setSvg(svg)
      setSvgDimensions(svg.getBoundingClientRect())
    })
  }, [])

  useEffect(() => {
    if (!svg) return

    const observer = new ResizeObserver(() => {
      setSvgDimensions(svg.getBoundingClientRect())
    })

    observer.observe(document.querySelector('#fdg-container'))

    return () => observer.disconnect()
  }, [svg])

  const snap = useCallback(() => {
    if (!svg) return

    svgAsDataUri(svg, {
      ...getViewboxBoundingRect(svg),
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
      scale: 1,
    }).then(setDataUri)
  }, [svg, theme])

  const saveImage = useCallback(() => {
    if (!svg) return

    saveSvgAsPng(svg, 'image.png', {
      ...getViewboxBoundingRect(svg),
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
      scale,
    })
  }, [svg, scale, theme])

  useEffect(() => {
    snap()
  }, [snap])

  if (!svgDimensions) return null
  return (
    <div className={classes.root}>
      <img alt='preview' className={classes.preview} src={dataUri} />
      <div className={classes.dimensions}>
        <span>width: {(svgDimensions.width * scale).toFixed(0)}</span>
        <span>height: {(svgDimensions.height * scale).toFixed(0)}</span>
      </div>
      <div className={classes.slider}>
        <Slider
          value={scale}
          onChange={setScale}
          range={[0.2, 5, 0.2]}
          label='scale'
          renderValue={x => x.toFixed(2)}
        />
      </div>
      <div className={classes.buttons}>
        <TextButton label='preview' onClick={snap} />
        <TextButton label='save' onClick={saveImage} />
      </div>
    </div>
  )
}

export default Camera
