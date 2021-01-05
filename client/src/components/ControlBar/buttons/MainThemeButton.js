import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import { setMainTheme } from 'store/actions/settings'
import { useSettings } from 'store/selectors'
import ToggleButton from '../core/ToggleButton'

const MainThemeButton = () => {
  const dispatch = useDispatch()
  const { mainThemeId } = useSettings()

  const onChange = useCallback(
    (mainThemeId) => {
      dispatch(setMainTheme(mainThemeId))
    },
    [dispatch]
  )

  return (
    <ToggleButton
      value={mainThemeId}
      onChange={onChange}
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
  )
}

export default MainThemeButton
