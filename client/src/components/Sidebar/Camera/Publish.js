import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { svgAsPngUri } from 'save-svg-as-png'
import { useRepo } from 'store/selectors'
import TextButton from 'components/core/TextButton'
import { getSvgDimensions } from './utils'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    '& > *': {
      marginBottom: '1.25em',
    }
  },
  instructions: {
    fontSize: '0.875em',
    fontStyle: 'italic',
    marginBottom: '2em',
    textAlign: 'left',
  },
  button: {
    width: '100%',
    marginTop: '2em',
  },
}))

const Publish = ({ flash, transparent, setTransparent }) => {
  const repo = useRepo()
  const theme = useTheme()
  const classes = useStyles()
  const [svg, setSvg] = useState(null)
  const [svgDimensions, setSvgDimensions] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setSvg(document.querySelector('#fdg-container svg'))
    })
  }, [])

  useEffect(() => {
    if (!svg) return

    const observer = new ResizeObserver(() => {
      setSvgDimensions(getSvgDimensions(svg))
    })

    observer.observe(document.querySelector('#fdg-container'))

    return () => observer.disconnect()
  }, [svg])

  const getUri = useCallback(async () => {
    if (!svg || !svgDimensions) return

    const scale = 2
    const { viewBox, ratio } = svgDimensions
    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    return svgAsPngUri(svg, {
      ...viewBox,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
    })
  }, [svg, svgDimensions, theme])

  const upload = useCallback(async () => {
    const dataUri = await getUri()
    console.log('uri:', dataUri)
    console.log('repo:', repo)
  }, [getUri, repo])

  // const publish = useCallback(() => {
  //   flash()
  //   setTimeout(upload, 500)
  // }, [flash, upload])

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Add an image to the gallery.
      </div>
      <TextButton
        className={classes.button}
        onClick={upload}
        label="upload"
      />
    </div>
  )
}

export default Publish
