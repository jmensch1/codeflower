import React from 'react'
import { useDispatch } from 'react-redux'
import themes from 'themes'
import { useThemeId } from 'store/selectors'
import { setThemeId } from 'store/themeId'
import Select from './Select'

const ThemeSelect = () => {
  const themeId = useThemeId()
  const dispatch = useDispatch()

  return (
    <Select
      value={themeId}
      onChange={e => dispatch(setThemeId(e.target.value))}
      options={Object.keys(themes)}
      helperText='select viz theme'
    />
  )
}

export default ThemeSelect
