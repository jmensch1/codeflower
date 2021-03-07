import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { useModal } from 'store/selectors'
import { listImages } from 'services/gallery'
import Modal from 'components/core/Modal'
import Shelves from './Shelves'
import Main from './Main'

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
  },
  main: {
    flex: 1,
    height: '100%',
  },
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
      <div className={classes.content}>
        <div className={classes.sidebar}>
          <Shelves
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
        </div>
        <div className={classes.main} onClick={close}>
          <Main image={selectedImage} />
        </div>
      </div>
    </Modal>
  )
}

export default Gallery
