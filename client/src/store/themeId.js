import themes from 'themes'
import { updateStyleSheet } from './styleSheet'

export const types = {
  SET_THEME_ID: 'SET_THEME_ID'
}

export const setThemeId = (themeId) => {
  return dispatch => {
    dispatch({
      type: types.SET_THEME_ID,
      data: themeId,
    })
    dispatch(updateStyleSheet())
  }
}

const initialState = Object.keys(themes)[0]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_THEME_ID:
      return action.data
    default:
      return state
  }
}

export default reducer
