import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCamera, useModal } from 'store/selectors'
import Visualization from './Visualization'
import ControlBar from './ControlBar'
import Terminal from './Terminal'
import Camera from './Camera'
import Gallery from './Gallery'
import FileViewer from 'components/modals/FileViewer'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
  },
  gallery: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    bottom: 0,
    zIndex: 2, // on top of terminal
    transition: 'all 0.5s ease-out',
    transform: ({ galleryIsOpen }) =>
      `translateX(${galleryIsOpen ? 0 : '100%'})`,
  },
}))

const Main = () => {
  const { isOpen: galleryIsOpen } = useModal('gallery')
  const { cameraOn, showAperture } = useCamera()
  const classes = useStyles({ cameraOn, galleryIsOpen })

  return (
    <div className={classes.root}>
      <Visualization />
      {cameraOn && <Camera />}
      <div style={{ display: showAperture ? 'none' : 'block' }}>
        <ControlBar />
        <Terminal />
        <FileViewer />
      </div>
      <div className={classes.gallery}>
        <Gallery />
      </div>
    </div>
  )
}

export default Main
