import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { useModal } from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'components/core/Modal'
// import Header from './Header'
// import Sidebar from './Sidebar'
import { listImages, imageUrl } from 'services/gallery'
import Rack from './Rack'
import axios from 'axios'

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
  return axios.get(url).then(({ data: xml }) => {
    const dom = new DOMParser()
    const svg = dom.parseFromString(xml, 'image/svg+xml')
    return svg.rootElement
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

    const prevSvg = mainRef.current.querySelector('svg')
    urlToSvg(imageUrl(selectedImage)).then(svg => {
      mainRef.current.appendChild(svg)
      if (prevSvg) mainRef.current.removeChild(prevSvg)
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
          <Rack
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Rack
            images={images}
            onSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
          <Rack
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
        <div className={classes.main} onClick={close} ref={mainRef} />
      </div>
    </Modal>
  )
}

export default Gallery
