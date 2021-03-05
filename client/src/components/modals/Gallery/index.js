import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { useModal } from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'components/core/Modal'
// import Header from './Header'
// import Sidebar from './Sidebar'
import { listImages, imageUrl } from 'services/gallery'
import Thumbnails from './Thumbnails'

const useStyles = makeStyles((theme) => ({
  root: {},
  modalBackground: {
    opacity: 0.95,
  },
  modalContent: {
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: 400,
    height: '100%',
    overflow: 'auto',
    borderRight: `1px white solid`,
    position: 'relative',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2em',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
  }
}))

const Gallery = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('gallery')
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  const close = useCallback(() => {
    dispatch(closeModal('gallery'))
  }, [dispatch])

  useEffect(() => {
    if (!isOpen) return

    listImages().then((images) => {
      setImages(images)
      setSelectedImage(images[0])
    })
  }, [isOpen])

  return (
    <Modal
      open={isOpen}
      onClose={close}
      classes={{
        background: classes.modalBackground,
        content: classes.modalContent,
      }}
    >

      {/*<Header onClose={close} />*/}
      <div className={classes.content}>
        <div className={classes.sidebar}>
          <Thumbnails
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Thumbnails
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Thumbnails
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          {/*<Sidebar
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />*/}
        </div>
        <div className={classes.main} onClick={close}>
          {selectedImage && (
            <img
              src={imageUrl(selectedImage)}
              className={classes.image}
              alt='main'
            />
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Gallery
