import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { thumbUrl } from 'services/gallery'

const THUMB_WIDTH = 100
const THUMB_HEIGHT = 75 // TODO: tie this to aspect ratio constant
const THUMB_SPACING = 25
const BOTTOM_BAR_HEIGHT = 40
const INDICATOR_SIZE = 10
const LEFT_MARGIN = 20

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: BOTTOM_BAR_HEIGHT,
    marginTop: 130,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    width: '100%',
    bottom: 0,
    height: BOTTOM_BAR_HEIGHT,
    backgroundColor: 'black',
    border: '1px white solid',
    borderRight: 'none',
    borderLeft: 'none',
    zIndex: 1000,
  },
  selectionIndicator: {
    position: 'absolute',
    top: (BOTTOM_BAR_HEIGHT - INDICATOR_SIZE) / 2,
    left: ({ selectedIndex: idx }) =>
      LEFT_MARGIN + idx * THUMB_SPACING + (THUMB_SPACING - INDICATOR_SIZE) / 2,
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'left 0.2s ease-out',
  },
  imageContainer: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
  },
  image: {
    height: '100%',
    width: '100%',
    display: 'block',
    transition: 'all 0.15s ease-out',
    border: `1px white solid`,
    pointerEvents: 'none',
    borderRadius: 5,
  },
  hoveredImage: {
    transform: `translateY(-${THUMB_HEIGHT + 5}px)`,
  },
}))

const Rack = ({ images, selectedImage, onSelect }) => {
  const [hoveredId, setHoveredId] = useState(null)
  const selectedIndex = images.findIndex(image => image === selectedImage)
  const classes = useStyles({ numImages: images.length, selectedIndex })

  const clearHover = useCallback(() => setHoveredId(null), [])

  const selectImage = useCallback((image) => {
    onSelect(image)
    setHoveredId(null)
  }, [onSelect])

  return (
    <div className={classes.root} onMouseLeave={clearHover}>
      <div className={classes.bottomBar} onMouseEnter={clearHover}>
        {selectedIndex !== -1 && (
          <div className={classes.selectionIndicator} />
        )}
      </div>
      {images.map((image, idx) => (
        <div
          key={image.public_id}
          className={classes.imageContainer}
          style={{ left: LEFT_MARGIN + idx * THUMB_SPACING }}
          onClick={selectImage.bind(null, image)}
          onMouseEnter={setHoveredId.bind(null, image.public_id)}
        >
          <img
            className={clsx(classes.image, {
              [classes.hoveredImage]: hoveredId === image.public_id,
            })}
            src={thumbUrl(image)}
            alt={image.public_id}
            style={{ backgroundColor: image.context.custom?.backgroundColor }}
          />
        </div>
      ))}
    </div>
  )
}

export default Rack
