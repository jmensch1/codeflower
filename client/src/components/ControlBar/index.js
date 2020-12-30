import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useFullscreen } from '@straw-hat/react-fullscreen'
import {
  setVisTheme,
  // setVisType,
  setMainTheme
} from 'store/settings'
import { useRepo, useSettings, useContext } from 'store/selectors'
import { openModal } from 'store/modals'

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
// import AdjustIcon from '@material-ui/icons/Adjust'
// import GrainIcon from '@material-ui/icons/Grain'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import SearchIcon from '@material-ui/icons/Search'
import InfoIcon from '@material-ui/icons/Info'

import Bar from './Bar'
import Divider from './Divider'
import ButtonGroup from './ButtonGroup'
import ToggleButton from './ToggleButton'
// import LinkButton from './LinkButton'

const ControlBar = () => {
  const repo = useRepo()
  const {
    mainThemeId,
    visThemeId,
    // visType, 
  } = useSettings()
  const dispatch = useDispatch()
  const { isWeb } = useContext()

  const {
    isFullscreen,
    toggleFullscreen,
  } = useFullscreen(useRef(window.document.body))

  if (!repo) return null

  return (
    <Bar>
      {isWeb && (
        <>
          <ToggleButton
            value={false}
            onChange={() => dispatch(openModal('search'))}
            buttons={[
              {
                value: false,
                Icon: SearchIcon,
                text: 'search',
              },
            ]}
          />
          <Divider />
        </>
      )}
      {/*<ButtonGroup
        value={visType}
        onChange={visType => dispatch(setVisType(visType))}
        buttons={[
          {
            value: 'force',
            Icon: GrainIcon,
            text: 'force',
          },
          {
            value: 'sunburst',
            Icon: AdjustIcon,
            text: 'sunburst',
          },
        ]}
      />
      <Divider />*/}
      <ButtonGroup
        value={visThemeId}
        onChange={visThemeId => dispatch(setVisTheme(visThemeId))}
        buttons={[
          {
            value: 'periwinkle',
            Icon: FormatAlignLeftIcon,
            text: 'periwinkle',
          },
          {
            value: 'bumblebee',
            Icon: FormatAlignRightIcon,
            text: 'bumblebee',
          },
          {
            value: 'rainbow',
            Icon: FormatAlignCenterIcon,
            text: 'rainbow',
          },
        ]}
      />
      <Divider />
      <ToggleButton
        value={mainThemeId}
        onChange={mainThemeId => dispatch(setMainTheme(mainThemeId))}
        buttons={[
          {
            value: 'dark',
            Icon: Brightness4Icon,
            text: 'light mode',
          },
          {
            value: 'light',
            Icon: Brightness7Icon,
            text: 'dark mode',
          },
        ]}
      />
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
            text: 'go full screen',
          },
        ]}
      />
      <ToggleButton
        value={false}
        onChange={() => dispatch(openModal('about'))}
        buttons={[
          {
            value: false,
            Icon: InfoIcon,
            text: 'about the app',
          },
        ]}
      />
      {/*<Divider />
      <LinkButton />*/}
    </Bar>
  )
}

export default ControlBar
