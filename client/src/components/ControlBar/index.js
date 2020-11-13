import React from 'react'
import { useDispatch } from 'react-redux'
import { setVisTheme, setVisType, setMainTheme } from 'store/settings'
import { useSettings } from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
// import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
// import FormatBoldIcon from '@material-ui/icons/FormatBold'
// import FormatItalicIcon from '@material-ui/icons/FormatItalic'
// import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
// import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Divider from '@material-ui/core/Divider'
import ButtonGroup from './ButtonGroup'
import ButtonGroupBar from './ButtonGroupBar'

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}))

const ControlBar = () => {
  const { mainThemeId, visThemeId, visType } = useSettings()
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <ButtonGroupBar>
      <ButtonGroup
        value={mainThemeId}
        onChange={mainThemeId => dispatch(setMainTheme(mainThemeId))}
        buttons={[
          {
            value: 'dark',
            Icon: FormatAlignLeftIcon,
            text: 'dark theme',
          },
          {
            value: 'light',
            Icon: FormatAlignRightIcon,
            text: 'light theme',
          },
        ]}
      />
      <Divider className={classes.divider} />
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
      <Divider className={classes.divider} />
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
