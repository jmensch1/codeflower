import React, { useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { useModal, useGallery } from 'store/selectors'
import { getImages, selectImage } from 'store/actions/gallery'
import Shelves from './Shelves'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    height: 50,
    backgroundColor: 'blue',
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
    <div className={classes.root}>
      <div className={classes.header} onClick={close} />
      <Shelves
        images={images}
        onSelect={setSelectedImage}
        selectedImage={selectedImage}
      />
    </div>
  )
}

export default Gallery
