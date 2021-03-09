import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCamera, useModal } from 'store/selectors'
import { checkerGradient, colorString } from 'services/utils'
import Visualization from './Visualization'
import ControlBar from './ControlBar'
import Terminal from './Terminal'
import Aperture from './Aperture'
import FileViewer from 'components/modals/FileViewer'
import Gallery from 'components/modals/Gallery/Main'
import PaletteProvider from 'components/theme/PaletteProvider'
import { useVisStyles } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    background: ({ transparent }) => transparent
      ? checkerGradient({ alpha: 0.04 })
      : 'none',
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
  const { cameraOn, transparent } = useCamera()
  const classes = useStyles({ cameraOn, transparent, galleryIsOpen })
  const visStyles = useVisStyles()

  const backgroundColor = useMemo(() => {
    return colorString(visStyles.background.fill)
  }, [visStyles.background.fill])

  return (
    <PaletteProvider backgroundColor={backgroundColor}>
      <div className={classes.root}>
        <Visualization />
        {cameraOn && <Aperture />}
        <div style={{ visibility: cameraOn ? 'hidden' : 'visible' }}>
          <ControlBar />
          <Terminal />
          <FileViewer />
        </div>
        <div className={classes.gallery}>
          <Gallery />
        </div>
      </div>
    </PaletteProvider>
  )
}

export default Main
