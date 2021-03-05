import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { thumbUrl } from 'services/gallery'

const THUMB_WIDTH = 100
const ENLARGED_WIDTH = 100
const SPACING = 25
const BOTTOM_BAR_HEIGHT = 40

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: BOTTOM_BAR_HEIGHT,
    marginTop: 130,
  },
  middleBar: {
    position: 'absolute',
    left: 0,
    width: '100%',
    bottom: 20,
    height: THUMB_WIDTH / 4,
    backgroundColor: 'black',
    border: '1px white solid',
    borderRight: 'none',
    borderLeft: 'none',
    zIndex: 1000,
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
  imageContainer: {
    width: THUMB_WIDTH,
    height: THUMB_WIDTH * 0.75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    // '&:hover': {
    //   '& img': {
    //     transform: `translateY(-${THUMB_WIDTH * 0.75 + 5}px)`,
    //   }
    // }
  },
  selected: {
    // outline: '1px white solid',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
    transition: 'all 0.15s ease-out',
    border: `1px white solid`,
    pointerEvents: 'none',
    borderRadius: 5,
  },
  hoveredImage: {
    transform: `translateY(-${THUMB_WIDTH * 0.75 + 5}px)`,
  },
  bigImage: {
    width: ENLARGED_WIDTH,
    height: ENLARGED_WIDTH * 0.75,
    position: 'absolute',
    bottom: THUMB_WIDTH * 0.75 + 5,
    left: 0,
    //transform: 'translateX(-50%)',
    outline: `1px ${theme.palette.divider} solid`,
  },
}))

const Rack = ({ images, selectedImage, onSelect }) => {
  const classes = useStyles({ numImages: images.length })
  const [hoveredId, setHoveredId] = useState(null)

  const selectedIndex = images.findIndex(image => image === selectedImage)

  return (
    <div className={classes.root} onMouseLeave={() => setHoveredId(null)}>
      <div className={classes.bottomBar} onMouseEnter={() => setHoveredId(null)}>
        {selectedIndex !== -1 && (
          <div
            style={{
              position: 'absolute',
              top: (BOTTOM_BAR_HEIGHT - 10) / 2,
              left: 20 + ((SPACING - 10) / 2) + selectedIndex * SPACING,
              height: 10,
              width: 10,
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 0.2s ease-out',
            }}
          />
        )}
      </div>
      {/*<div className={classes.middleBar} />*/}
      {images.map((image, idx) => (
        <div
          key={image.public_id}
          className={clsx(classes.imageContainer, {
            [classes.selected]: selectedImage && selectedImage.public_id === image.public_id,
          })}
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            left: 20 + idx * SPACING,
          }}
          onClick={() => {
            onSelect(image)
            setHoveredId(null)
          }}
          onMouseEnter={() => setHoveredId(image.public_id)}
        >
          <img
            className={clsx(classes.image, {
              [classes.hoveredImage]: hoveredId === image.public_id,
            })}
            src={thumbUrl(image)}
            alt={image.public_id}
          />
          {false && hoveredId === image.public_id && (
            <div className={classes.bigImage}>
              <img
                className={classes.image}
                src={thumbUrl(image)}
                alt={image.public_id}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Rack
