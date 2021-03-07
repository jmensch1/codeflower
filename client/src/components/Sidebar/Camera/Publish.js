import React, { useCallback, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { svgAsPngUri } from 'save-svg-as-png'
import { useRepo } from 'store/selectors'
import TextButton from 'components/core/TextButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import { uploadImage, deleteImage } from 'services/gallery'
import { useCamera } from 'store/selectors'
import { openModal } from 'store/actions/modals'
import { delay } from 'services/utils/general'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
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
  button: {},
  imageBox: {
    width: 300,
    height: 225,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px white solid',
    margin: '0 auto',
  },
  message: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '0.875em',
    marginTop: '0.25em',
    marginBottom: '1.5em',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const TARGET_WIDTH = 3000

const Publish = ({ flash, transparent, setTransparent }) => {
  const repo = useRepo()
  const theme = useTheme()
  const classes = useStyles()
  const { svg, aperture } = useCamera()
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [error, setError] = useState(null)

  // eslint-disable-next-line
  const getPngUri = useCallback(async () => {
    if (!svg || !aperture) return

    const { viewBox } = aperture
    const scale = TARGET_WIDTH / (viewBox.width * window.devicePixelRatio)

    return svgAsPngUri(svg, {
      ...viewBox,
      scale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
    })
  }, [svg, aperture, theme])

  const getSvgUri = useCallback(async () => {
    const origBackground = svg.style.backgroundColor
    svg.style.backgroundColor = theme.palette.background.default

    const svgAsXML = (new XMLSerializer()).serializeToString(svg)
    const dataUri = 'data:image/svg+xml;base64,' + btoa(svgAsXML)

    setTimeout(() => {
      svg.style.backgroundColor = origBackground
    })

    return dataUri
  }, [svg, theme])

  const publish = useCallback(async () => {
    flash()
    setIsUploading(true)

    await delay()
    const dataUri = await getSvgUri()
    const imageId = `${repo.name}-${Date.now()}`
    uploadImage(dataUri, imageId, {
      owner: repo.owner,
      name: repo.name,
      backgroundColor: theme.palette.background.default,
    })
      .then((image) => {
        console.log(image)
        setUploadedImage(image)
        setIsUploading(false)
      })
      .catch((error) => {
        console.log('error:', error)
        setIsUploading(false)
        setError('Upload failed.')
      })
  }, [flash, repo, getSvgUri, theme])

  const openGallery = useCallback(() => {
    dispatch(openModal('gallery'))
  }, [dispatch])

  const deleteAfterUpload = useCallback(() => {
    deleteImage(uploadedImage.delete_token)
      .then(() => setUploadedImage(null))
  }, [uploadedImage])

  const publishButton = (
    <TextButton
      className={classes.button}
      onClick={publish}
      label="publish"
      style={{ width: '100%' }}
    />
  )

  const uploadIndicator = (
    <div className={classes.imageBox}>
      <CircularProgress size={18} color="inherit" />
    </div>
  )

  const image = uploadedImage ? (
    <div className={classes.imageBox}>
      <img
        src={uploadedImage.eager[0].secure_url}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: uploadedImage.context.backgroundColor,
        }}
        alt='thumbnail'
      />
    </div>
  ) : null

  const errorImage = <div className={classes.imageBox} />

  const message = (text) => (
    <div className={classes.message}>{ text }</div>
  )

  const buttons = (
    <div className={classes.buttons}>
      <TextButton
        className={classes.button}
        onClick={() => setUploadedImage(null)}
        label='ok'
      />
      <TextButton
        className={classes.button}
        onClick={deleteAfterUpload}
        label='delete'
      />
    </div>
  )

  const errorButton = (
    <div className={classes.buttons}>
      <TextButton
        className={classes.button}
        onClick={() => setError(null)}
        label='ok'
      />
    </div>
  )

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Add an image to the{' '}
        <span onClick={openGallery} className={classes.link}>gallery</span>.
      </div>
      {(() => {
        if (!isUploading && !uploadedImage && !error)
          return publishButton

        if (isUploading)
          return (
            <>
              { uploadIndicator }
              { message('uploading') }
            </>
          )

        if (uploadedImage)
          return (
            <>
              { image }
              { message('uploaded successful') }
              { buttons }
            </>
          )

        if (error)
          return (
            <>
              { errorImage }
              { message('upload failed') }
              { errorButton }
            </>
          )
      })()}
    </div>
  )
}

export default Publish
