import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { thumbUrl } from 'services/gallery'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
  },
  imageContainer: {
    width: 240,
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:not(:first-child)': {
      marginTop: '1em',
    }
  },
  selected: {
    outline: '1px white solid',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
  },
}))

const Sidebar = ({ images, selectedImage, onSelect }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {images.map((image) => (
        <div
          key={image.public_id}
          className={clsx(classes.imageContainer, {
            [classes.selected]: selectedImage && selectedImage.public_id === image.public_id,
          })}
          onClick={onSelect.bind(null, image)}
        >
          <img
            className={classes.image}
            src={thumbUrl(image)}
            alt={image.public_id}
          />
        </div>
      ))}
    </div>
  )
}

export default Sidebar
