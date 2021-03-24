import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import { setVisStyles } from 'store/actions/vis'
import { useVisStyles } from 'store/selectors'
import visThemes from 'themes/visThemes'
import ButtonGroup from '../core/ButtonGroup'

const VisThemeButtons = () => {
  const dispatch = useDispatch()
  const { id } = useVisStyles()

  const onChange = useCallback(
    (id) => {
      dispatch(setVisStyles(visThemes[id]))
    },
    [dispatch]
  )

  return (
    <ButtonGroup
      value={id}
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
