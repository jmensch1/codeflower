import React from 'react'
import { useDispatch } from 'react-redux'
import themes from 'themes'
import { setVisTheme } from 'store/settings'
import { useSettings } from 'store/selectors'
import Select from './Select'

const VisThemeSelect = () => {
  const dispatch = useDispatch()
  const { visThemeId } = useSettings()

  return (
    <Select
      value={visThemeId}
      onChange={e => dispatch(setVisTheme(e.target.value))}
      options={Object.keys(themes)}
      helperText='select viz theme'
    />
  )
}

export default VisThemeSelect
