import React from 'react'
import { useDispatch } from 'react-redux'
import themes from 'themes'
import { useThemeId } from 'store/selectors'
import { setThemeId } from 'store/themeId'

const ThemeSelect = () => {
  const themeId = useThemeId()
  const dispatch = useDispatch()
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      }}
    >
      <select
        value={themeId}
        onChange={e => dispatch(setThemeId(e.target.value))}
      >
        {Object.keys(themes).map(themeId => (
          <option
            key={themeId}
            value={themeId}
          >
            { themeId }
          </option>
        ))}
      </select>
    </div>
  )
}

export default ThemeSelect
