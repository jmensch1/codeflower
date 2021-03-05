import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { thumbUrl } from 'services/gallery'

const THUMB_WIDTH = 100
const ENLARGED_WIDTH = 300
const SPACING = 20

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: ({ numImages }) => `translateX(-${0.5 * numImages * SPACING}px)`,
    right: 100,
    zIndex: 100,
  },
  imageContainer: {
    width: THUMB_WIDTH,
    height: THUMB_WIDTH * 0.75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderLeft: `1px ${theme.palette.divider} solid`,
    position: 'relative',
  },
  selected: {
    // outline: '1px white solid',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
  },
  bigImage: {
    width: ENLARGED_WIDTH,
    height: ENLARGED_WIDTH * 0.75,
    position: 'absolute',
    bottom: THUMB_WIDTH * 0.75 + 5,
    left: '50%',
    transform: 'translateX(-50%)',
    outline: `1px ${theme.palette.divider} solid`,
  },
}))

const Sidebar = ({ images, selectedImage, onSelect }) => {
  const classes = useStyles({ numImages: images.length })
  const [hoveredId, setHoveredId] = useState(null)

  console.log(hoveredId)

  return (
    <div className={classes.root} onMouseLeave={() => setHoveredId(null)}>
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
            left: idx * SPACING,
          }}
          onClick={onSelect.bind(null, image)}
          onMouseEnter={() => setHoveredId(image.public_id)}
        >
          <img
            className={classes.image}
            src={thumbUrl(image)}
            alt={image.public_id}
          />
          {hoveredId === image.public_id && selectedImage.public_id !== image.public_id && (
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

export default Sidebar
