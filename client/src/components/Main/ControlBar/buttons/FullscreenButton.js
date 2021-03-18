import React, { useRef } from 'react'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import { useFullscreen } from '@straw-hat/react-fullscreen'
import ToggleButton from '../core/ToggleButton'

const FullscreenButton = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen(
    useRef(window.document.body)
  )

  return (
    <ToggleButton
      value={isFullscreen}
      onChange={toggleFullscreen}
      buttons={[
        {
          value: true,
          Icon: FullscreenExitIcon,
          text: 'exit full screen',
        },
        {
          value: false,
          Icon: FullscreenIcon,
          text: 'full screen',
        },
      ]}
    />
  )
}

export default FullscreenButton
