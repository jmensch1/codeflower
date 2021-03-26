import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  THUMB_WIDTH,
  THUMB_HEIGHT,
  THUMB_SPACING,
  SHELF_HEIGHT,
  INDICATOR_SIZE,
  LEFT_MARGIN,
} from './config'
import { checkerGradient } from 'services/utils'

function indicatorX(idx) {
  return (
    LEFT_MARGIN +
    idx * THUMB_SPACING +
    0.5 * (THUMB_SPACING - INDICATOR_SIZE) -
    1
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: THUMB_HEIGHT * 2 + 20,
    '&:last-of-type': {
      marginBottom: '3em',
    },
  },
  shelf: {
    position: 'absolute',
    left: 0,
    width: '100%',
    bottom: 0,
    height: SHELF_HEIGHT,
    backgroundColor: theme.palette.background.paper,
    border: `1px hsla(0, 0%, 100%, 0.5) solid`,
    borderRight: 'none',
    borderLeft: 'none',
    zIndex: 2,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: checkerGradient({
      alpha: 0.2,
      size: 4,
    }),
    '& > circle': {
      display: ({ selectedIndex }) => (selectedIndex === -1 ? 'none' : 'block'),
      fill: theme.palette.text.primary,
      transform: ({ selectedIndex: idx }) => `translateX(${indicatorX(idx)}px)`,
      transition: 'all 0.2s ease-in-out',
    },
  },
  imageContainer: {
    width: THUMB_WIDTH,
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
  },
  image: {
    height: THUMB_HEIGHT,
    width: '100%',
    display: 'block',
    transition: 'all 0.15s ease-out',
    border: `1px white solid`,
    pointerEvents: 'none',
    borderRadius: 10,
  },
  hoveredImage: {
    transform: `translateY(-${THUMB_HEIGHT + 5}px)`,
  },
}))

const Shelf = ({ images, selectedImage, onSelect }) => {
  const [hoveredId, setHoveredId] = useState(null)
  const selectedIndex = images.findIndex((image) => image === selectedImage)
  const classes = useStyles({ numImages: images.length, selectedIndex })

  const clearHover = useCallback(() => setHoveredId(null), [])

  const selectImage = useCallback(
    (image) => {
      onSelect(image)
      setHoveredId(null)
    },
    [onSelect]
  )

  return (
    <div className={classes.root} onMouseLeave={clearHover}>
      <div className={classes.shelf} onMouseEnter={clearHover}>
        <svg className={classes.selectionIndicator}>
          <circle
            cx={INDICATOR_SIZE}
            cy={SHELF_HEIGHT / 2 - 1}
            r={INDICATOR_SIZE}
          />
        </svg>
      </div>
      {images.map((image, idx) => (
        <div
          key={image.id}
          className={classes.imageContainer}
          style={{ left: LEFT_MARGIN + idx * THUMB_SPACING }}
          onClick={selectImage.bind(null, image)}
          onMouseEnter={setHoveredId.bind(null, image.id)}
        >
          <img
            className={clsx(classes.image, {
              [classes.hoveredImage]: hoveredId === image.id,
            })}
            src={image.thumbUrl}
            alt={image.id}
            style={{ backgroundColor: image.metadata.backgroundColor }}
          />
        </div>
      ))}
    </div>
  )
}

export default Shelf
