import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCamera, useModal } from 'store/selectors'
import { checkerGradient } from 'services/utils'
import Visualization from './Visualization'
import ControlBar from './ControlBar'
import Terminal from './Terminal'
import Aperture from './Aperture'
import Gallery from './Gallery'
import FileViewer from 'components/modals/FileViewer'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    position: 'relative',
    height: '100%',

    // camera transparency
    background: ({ transparent}) => transparent
      ? checkerGradient({
          alpha: 0.04,
          backgroundColor: theme.palette.background.default
        })
      : 'none',
    '&:after': {
      display: ({ transparent }) => transparent ? 'block' : 'none',
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      backgroundColor: theme.palette.background.default,
    },
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
      `translateX(${galleryIsOpen ? 0 : '100%'})`
  },
}))

const Main = () => {
  const { isOpen: galleryIsOpen } = useModal('gallery')
  const { cameraOn, showAperture, transparent } = useCamera()
  const classes = useStyles({ cameraOn, transparent, galleryIsOpen })

  return (
    <div className={classes.root}>
      <Visualization />
      {cameraOn && <Aperture />}
      <div style={{ visibility: showAperture ? 'hidden' : 'visible' }}>
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
