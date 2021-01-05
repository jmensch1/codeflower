import visThemes from 'themes'

export const types = {
  SET_MAIN_THEME: 'settings/SET_MAIN_THEME',
  SET_VIS_THEME: 'settings/SET_VIS_THEME',
  SET_VIS_TYPE: 'settings/SET_VIS_TYPE',
  SELECT_LANGUAGE: 'settings/SELECT_LANGUAGE',
}

export const setMainTheme = (mainThemeId) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_MAIN_THEME,
      data: mainThemeId,
    })
  }
}

export const setVisTheme = (visThemeId) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_VIS_THEME,
      data: visThemeId,
    })
  }
}

export const setVisType = (visType) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_VIS_TYPE,
      data: visType,
    })
  }
}

export const selectLanguage = (language) => {
  return {
    type: types.SELECT_LANGUAGE,
    data: language,
  }
}

const initialState = {
  mainThemeId: 'dark',
  visThemeId: Object.keys(visThemes)[0],
  visType: 'force',
  selectedLanguage: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MAIN_THEME:
      return {
        ...state,
        mainThemeId: action.data,
      }
    case types.SET_VIS_THEME:
      return {
        ...state,
        visThemeId: action.data,
      }
    case types.SET_VIS_TYPE:
      return {
        ...state,
        visType: action.data,
      }
    case types.SELECT_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.data,
      }
    default:
      return state
  }
}

export default reducer
