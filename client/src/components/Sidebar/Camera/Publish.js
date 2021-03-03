import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { svgAsPngUri } from 'save-svg-as-png'
import { useRepo } from 'store/selectors'
import TextButton from 'components/core/TextButton'
import { getSvgDimensions } from './utils'
import axios from 'axios'

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

    const scale = 4
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

    const formData = new FormData()
    formData.append('file', dataUri)
    formData.append('public_id', repo.name + Date.now())
    formData.append('upload_preset', 'tahdwqyy')
    formData.append('tags', 'myphotoalbum')

    const repoInfo = encodeURIComponent(`${repo.name}/${repo.owner}`)
    formData.append('context', `repo=${repoInfo}`)

    const url = `https://api.cloudinary.com/v1_1/dt2rs6yf1/upload`

    axios
      .post(url, formData)
      .then((result) => {
        console.log('res:', result)
      })
      .catch((err) => {
        console.log('err:', err)
      })
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
