import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useGallery } from 'store/selectors'
import { getImages, selectImage } from 'store/actions/gallery'
import Shelves from './Shelves'
import Header from './Header'
import { Interval } from 'hooks/useInterval'

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
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!images) dispatch(getImages())
  }, [dispatch, images])

  const setSelectedImage = useCallback(
    (image) => {
      dispatch(selectImage(image))
    },
    [dispatch]
  )

  const next = useCallback(() => {
    const index = images.findIndex((i) => i.public_id === selectedImage.public_id)
    const nextIndex = (index + 1) % images.length
    setSelectedImage(images[nextIndex])
  }, [images, selectedImage, setSelectedImage])

  const toggleIsPlaying = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  if (!images || !selectedImage) return null
  return (
    <div className={classes.root}>
      <Header />
      <div
        style={{ height: 50, backgroundColor: isPlaying ? 'red' : 'blue'}}
        onClick={toggleIsPlaying}
      >
        { isPlaying && <Interval next={next} delay={1000} /> }
      </div>
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
