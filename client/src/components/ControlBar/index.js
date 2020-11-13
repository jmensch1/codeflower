import React from 'react'
import { useDispatch } from 'react-redux'
import { setVisTheme, setVisType, setMainTheme } from 'store/settings'
import { useSettings } from 'store/selectors'

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

import Divider from './Divider'
import ButtonGroup from './ButtonGroup'
import ButtonGroupBar from './ButtonGroupBar'
import ToggleButton from './ToggleButton'

const ControlBar = () => {
  const { mainThemeId, visThemeId, visType } = useSettings()
  const dispatch = useDispatch()

  return (
    <ButtonGroupBar>
      <ToggleButton
        value={mainThemeId}
        onChange={mainThemeId => dispatch(setMainTheme(mainThemeId))}
        buttons={[
          {
            value: 'dark',
            Icon: Brightness4Icon,
            text: 'toggle light/dark theme',
          },
          {
            value: 'light',
            Icon: Brightness7Icon,
            text: 'toggle light/dark theme',
          },
        ]}
      />
      <Divider />
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
      <ButtonGroup
        value={visType}
        onChange={visType => dispatch(setVisType(visType))}
        buttons={[
          {
            value: 'force',
            Icon: FormatAlignLeftIcon,
            text: 'force',
          },
          {
            value: 'sunburst',
            Icon: FormatAlignRightIcon,
            text: 'sunburst',
          },
        ]}
      />
    </ButtonGroupBar>
  )
}

export default ControlBar
