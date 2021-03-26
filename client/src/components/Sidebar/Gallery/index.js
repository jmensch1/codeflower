import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useGallery } from 'store/selectors'
import { getImages, selectImage } from 'store/actions/gallery'
import Shelves from './Shelves'
import Header from './Header'
import Buttons from './Buttons'
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

  const toggleIsPlaying = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const stopAndDo = useCallback((func) => {
    setIsPlaying(false)
    func()
  }, [])

  const move = useCallback(
    (step) => {
      const index = images.findIndex(
        (i) => i.id === selectedImage.id
      )
      const nextIndex = (index + step + images.length) % images.length
      setSelectedImage(images[nextIndex])
    },
    [images, selectedImage, setSelectedImage]
  )

  const prev = useMemo(() => move.bind(null, -1), [move])
  const next = useMemo(() => move.bind(null, 1), [move])

  const backward = useMemo(() => stopAndDo.bind(null, prev), [stopAndDo, prev])
  const forward = useMemo(() => stopAndDo.bind(null, next), [stopAndDo, next])

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      switch (key) {
        case 'ArrowLeft':
          return backward()
        case 'ArrowRight':
          return forward()
        default:
          return
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [backward, forward])

  if (!images) return null
  return (
    <div className={classes.root}>
      <Header image={selectedImage} />
      {selectedImage && (
        <>
          <Buttons
            prev={backward}
            next={forward}
            isPlaying={isPlaying}
            toggleIsPlaying={toggleIsPlaying}
          />
          <div className={classes.shelves}>
            <Shelves
              images={images}
              onSelect={setSelectedImage}
              selectedImage={selectedImage}
            />
          </div>
          {isPlaying && <Interval next={next} delay={2500} />}
        </>
      )}
    </div>
  )
}

export default Gallery
