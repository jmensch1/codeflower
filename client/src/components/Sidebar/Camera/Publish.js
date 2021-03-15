import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useRepo, useCamera, useGallery } from 'store/selectors'
import { openModal } from 'store/actions/modals'
import { publishImage, publishReset } from 'store/actions/gallery'
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
}))

const Publish = () => {
  const repo = useRepo()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { flash, getSvgUri } = useCamera()
  const [dataUri, setDataUri] = useState(null)
  const { isPublishing, publishedImage, publishError } = useGallery()

  const preview = useCallback(async () => {
    await flash()
    const dataUri = await getSvgUri()
    setDataUri(dataUri)
  }, [flash, getSvgUri])

  const publish = useCallback(() => {
    dispatch(publishImage(dataUri))
  }, [dispatch, dataUri])

  const openGallery = useCallback(() => {
    dispatch(openModal('gallery'))
  }, [dispatch])

  const reset = useCallback(() => {
    setDataUri(null)
    dispatch(publishReset())
  }, [dispatch])

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
      <img src={dataUri} className={classes.image} alt="thumbnail" />
      {isPublishing && (
        <>
          <div className={classes.loadingMask} />
          <div className={classes.loaderContainer}>
            <CircularProgress size={24} color="inherit" />
          </div>
        </>
      )}
    </div>
  )

  const message = (text) => <div className={classes.message}>{text}</div>

  const prePublishButtons = (
    <div className={classes.buttons}>
      <TextButton className={classes.button} onClick={reset} label="cancel" />
      <TextButton
        className={classes.button}
        onClick={publish}
        label="publish"
      />
    </div>
  )

  const postPublishButtons = (
    <div className={classes.buttons}>
      <TextButton
        className={classes.button}
        onClick={openGallery}
        label="view"
      />
      <TextButton className={classes.button} onClick={reset} label="done" />
    </div>
  )

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Add an image to the{' '}
        <span onClick={openGallery} className={classes.link}>
          gallery
        </span>
        .
      </div>
      {!dataUri && previewButton}
      {dataUri && previewImage}
      {dataUri &&
        !isPublishing &&
        !publishedImage &&
        !publishError &&
        message(`${repo.owner}/${repo.name}`)}
      {dataUri &&
        !isPublishing &&
        publishError &&
        message('error publishing. maybe try again?')}
      {dataUri && !isPublishing && !publishedImage && prePublishButtons}
      {dataUri && isPublishing && message('publishing')}
      {dataUri && publishedImage && message('published')}
      {dataUri && publishedImage && postPublishButtons}
    </div>
  )
}

export default Publish
