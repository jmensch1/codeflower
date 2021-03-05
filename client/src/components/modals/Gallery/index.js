import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { useModal } from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'components/core/Modal'
// import Header from './Header'
// import Sidebar from './Sidebar'
import { listImages, imageUrl } from 'services/gallery'
import Thumbnails from './Thumbnails'

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
    position: 'relative',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2em',
    position: 'relative',
    '& svg': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
  }
}))

async function urlToSvg(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.addEventListener('load', function(ev)
    {
        var xml = ev.target.response;
        var dom = new DOMParser();
        var svg = dom.parseFromString(xml, 'image/svg+xml');
        resolve(svg.rootElement)
    });
    xhr.send(null);
  })
}

const Gallery = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('gallery')
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const mainRef = useRef(null)

  const close = useCallback(() => {
    dispatch(closeModal('gallery'))
  }, [dispatch])

  useEffect(() => {
    if (!isOpen) return

    listImages().then((images) => {
      setImages(images)
      setSelectedImage(images[0])
    })
  }, [isOpen])

  useEffect(() => {
    if (!selectedImage) return
    urlToSvg(imageUrl(selectedImage)).then(svg => {
      mainRef.current.appendChild(svg)
    })
  }, [selectedImage])

  return (
    <Modal
      open={isOpen}
      onClose={close}
      classes={{
        background: classes.modalBackground,
        content: classes.modalContent,
      }}
    >

      {/*<Header onClose={close} />*/}
      <div className={classes.content}>
        <div className={classes.sidebar}>
          <Thumbnails
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Thumbnails
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Thumbnails
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          {/*<Sidebar
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />*/}
        </div>
        <div className={classes.main} onClick={close} ref={mainRef}>
          {false && selectedImage && (
            <img
              src={imageUrl(selectedImage)}
              className={classes.image}
              alt='main'
            />
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Gallery
