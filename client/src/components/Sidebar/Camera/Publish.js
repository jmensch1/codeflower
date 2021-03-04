import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { svgAsPngUri } from 'save-svg-as-png'
import { useRepo } from 'store/selectors'
import TextButton from 'components/core/TextButton'
import { uploadImage } from 'services/gallery'
import { useCamera } from 'store/selectors'
import { openModal } from 'store/actions/modals'

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
  link: {
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
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
  const { svgDimensions } = useCamera()
  const dispatch = useDispatch()

  useEffect(() => {
    setSvg(document.querySelector('#fdg-container svg'))
  }, [])

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

  const publish = useCallback(async () => {
    flash()
    const dataUri = await getUri()
    uploadImage(dataUri, repo)
  }, [flash, repo, getUri])

  const openGallery = useCallback(() => {
    dispatch(openModal('gallery'))
  }, [dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Add an image to the{' '}
        <span onClick={openGallery} className={classes.link}>gallery</span>.
      </div>
      <TextButton
        className={classes.button}
        onClick={publish}
        label="publish"
      />
    </div>
  )
}

export default Publish
