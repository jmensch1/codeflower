import React, { useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useGallery } from 'store/selectors'
import { getImages, selectImage } from 'store/actions/gallery'
import Shelves from './Shelves'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  shelves: {
    flex: 1,
    overflow: 'auto',
  },
}))

const Gallery = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { images, selectedImage } = useGallery()

  useEffect(() => {
    if (!images) dispatch(getImages())
  }, [dispatch, images])

  const setSelectedImage = useCallback(
    (image) => {
      dispatch(selectImage(image))
    },
    [dispatch]
  )

  if (!images || !selectedImage) return null
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.shelves}>
        <Shelves
          images={images}
          onSelect={setSelectedImage}
          selectedImage={selectedImage}
        />
      </div>
    </div>
  )
}

export default Gallery
