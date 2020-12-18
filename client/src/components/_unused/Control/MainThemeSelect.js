import React from 'react'
import { useDispatch } from 'react-redux'
import { useSettings } from 'store/selectors'
import { setMainTheme } from 'store/settings'
import Select from './Select'

const MainThemeSelect = () => {
  const dispatch = useDispatch()
  const { mainThemeId } = useSettings()
  return (
    <Select
      value={mainThemeId}
      onChange={e => dispatch(setMainTheme(e.target.value))}
      options={['dark', 'light']}
      helperText='main theme'
    />
  )
}

export default MainThemeSelect
