import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import { setVisTheme } from 'store/settings'
import { useSettings } from 'store/selectors'
import ButtonGroup from '../core/ButtonGroup'

const VisThemeButtons = () => {
  const dispatch = useDispatch()
  const { visThemeId } = useSettings()

  const onChange = useCallback((visThemeId) => {
    dispatch(setVisTheme(visThemeId))
  }, [dispatch])

  return (
    <ButtonGroup
      value={visThemeId}
      onChange={onChange}
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
  )
}

export default VisThemeButtons
