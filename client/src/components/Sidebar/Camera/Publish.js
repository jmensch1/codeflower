import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useRepo, useCamera } from 'store/selectors'
import { openModal } from 'store/actions/modals'
import { getImages } from 'store/actions/gallery'
import { updateCamera } from 'store/actions/camera'
import { uploadImage } from 'services/gallery'
import { svgToDataUri } from './utils'
import Checkbox from 'components/core/Checkbox'
import TextButton from 'components/core/TextButton'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  imageBox: {
    border: `1px ${theme.palette.text.primary} solid`,
    position: 'relative',
  },
  image: {
    width: '100%',
    display: 'block',
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  loadingMask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.type === 'light' ? '#fff' : '#000',
    opacity: 0.7,
  },
  message: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '0.875em',
    marginTop: '0.5em',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
  },
  button: {
    textTransform: 'lowercase',
    padding: '0.25em 1em',
    fontWeight: 'normal',
  },
  apertureToggle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: '2em',
  },
}))

const Publish = () => {
  const repo = useRepo()
  const classes = useStyles()
  const { aperture, showAperture, flash } = useCamera()
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [error, setError] = useState(false)
  const [dataUri, setDataUri] = useState(null)
  const svg = document.querySelector('#vis-container')

  const preview = useCallback(async () => {
    await flash()
    const dataUri = await svgToDataUri(
      svg,
      undefined,  // TODO: switch param order so this isn't necessary
      aperture.viewBox,
    )
    setDataUri(dataUri)
  }, [flash, svg, aperture])

  const publish = useCallback(async () => {
    setIsUploading(true)

    const imageId = `${repo.name}-${Date.now()}`
    uploadImage(dataUri, imageId, {
      owner: repo.owner,
      name: repo.name,
      backgroundColor: svg.style.backgroundColor,
    })
      .then((image) => {
        setUploadedImage(image)
        setIsUploading(false)
        dispatch(getImages())
      })
      .catch((error) => {
        setIsUploading(false)
        setError(true)
      })
  }, [svg, dataUri, repo, dispatch])

  const openGallery = useCallback(() => {
    dispatch(openModal('gallery'))
  }, [dispatch])

  const toggleAperture = useCallback(() => {
    dispatch(updateCamera({ showAperture: !showAperture }))
  }, [dispatch, showAperture])

  const reset = useCallback(() => {
    setDataUri(null)
    setError(false)
    setUploadedImage(null)
  }, [])

  const previewButton = (
    <TextButton
      label="preview"
      onClick={preview}
      className={classes.button}
      style={{ width: '100%' }}
    />
  )

  const previewImage = (
    <div className={classes.imageBox}>
      <img
        src={dataUri}
        className={classes.image}
        alt='thumbnail'
      />
      {isUploading && (
        <>
          <div className={classes.loadingMask} />
          <div className={classes.loaderContainer}>
            <CircularProgress size={24} color="inherit" />
          </div>
        </>
      )}
    </div>
  )

  const message = (text) => (
    <div className={classes.message}>{ text }</div>
  )

  const buttons = (
    <div className={classes.buttons}>
      <TextButton
        className={classes.button}
        onClick={reset}
        label='cancel'
      />
      <TextButton
        className={classes.button}
        onClick={publish}
        label='publish'
      />
    </div>
  )

  const postUploadButtons = (
    <div className={classes.buttons}>
      <TextButton
        className={classes.button}
        onClick={openGallery}
        label='view'
      />
      <TextButton
        className={classes.button}
        onClick={reset}
        label='done'
      />
    </div>
  )

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Add an image to the{' '}
        <span onClick={openGallery} className={classes.link}>gallery</span>.
      </div>
      {!dataUri && previewButton}
      {dataUri && previewImage}
      {dataUri && !isUploading && !uploadedImage && !error && message(`${repo.owner}/${repo.name}`)}
      {dataUri && !isUploading && error && message('error publishing. maybe try again?')}
      {dataUri && !isUploading && !uploadedImage && buttons}
      {dataUri && isUploading && message('publishing')}
      {dataUri && uploadedImage && message('published')}
      {dataUri && uploadedImage && postUploadButtons}
      <div className={classes.apertureToggle}>
        <Checkbox
          checked={showAperture}
          onChange={toggleAperture}
          label='show aperture'
        />
      </div>
    </div>
  )
}

export default Publish
