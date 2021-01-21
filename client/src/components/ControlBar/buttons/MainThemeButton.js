import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import { setMainTheme } from 'store/actions/settings'
import { useMainTheme } from 'store/selectors'
import ToggleButton from '../core/ToggleButton'
import mainThemes from 'themes/mainThemes'

const MainThemeButton = () => {
  const dispatch = useDispatch()
  const { id } = useMainTheme()

  const onChange = useCallback(
    (id) => {
      dispatch(setMainTheme(mainThemes[id]))
    },
    [dispatch]
  )

  return (
    <ToggleButton
      value={id}
      onChange={onChange}
      buttons={[
        {
          value: 'dark',
          Icon: Brightness4Icon,
          text: 'switch to light mode',
        },
        {
          value: 'light',
          Icon: Brightness7Icon,
          text: 'switch to dark mode',
        },
      ]}
    />
  )
}

export default MainThemeButton
