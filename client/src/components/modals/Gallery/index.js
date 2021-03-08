// NOTE: this is currently unused

import React, { useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { useModal, useGallery } from 'store/selectors'
import { getImages, selectImage } from 'store/actions/gallery'
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
  const { images, selectedImage } = useGallery()

  const close = useCallback(() => {
    dispatch(closeModal('gallery'))
  }, [dispatch])

  useEffect(() => {
    if (!isOpen) return
    dispatch(getImages())
  }, [dispatch, isOpen])

  const setSelectedImage = useCallback((image) => {
    dispatch(selectImage(image))
  }, [dispatch])

  if (!images || !selectedImage) return null
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
          <Main />
        </div>
      </div>
    </Modal>
  )
}

export default Gallery
