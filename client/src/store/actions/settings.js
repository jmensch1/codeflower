import visThemes from 'themes'
import { types as repoTypes } from './repo'

export const types = {
  SET_MAIN_THEME: 'settings/SET_MAIN_THEME',
  SET_VIS_THEME: 'settings/SET_VIS_THEME',
  SET_VIS_TYPE: 'settings/SET_VIS_TYPE',
  SELECT_LANGUAGE: 'settings/SELECT_LANGUAGE',
  SELECT_FOLDER: 'settings/SELECT_FOLDER',
}

export const setMainTheme = (mainThemeId) => ({
  type: types.SET_MAIN_THEME,
  data: mainThemeId,
})

export const setVisTheme = (visThemeId) => ({
  type: types.SET_VIS_THEME,
  data: visThemeId,
})

export const setVisType = (visType) => ({
  type: types.SET_VIS_TYPE,
  data: visType,
})

export const selectLanguage = (language) => ({
  type: types.SELECT_LANGUAGE,
  data: language,
})

export const selectFolder = (folderPath) => ({
  type: types.SELECT_FOLDER,
  data: folderPath,
})

const initialState = {
  mainThemeId: 'dark',
  visThemeId: Object.keys(visThemes)[0],
  visType: 'force',
  selectedLanguage: null,
  selectedFolderPath: null,
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
    case types.SELECT_FOLDER:
      return {
        ...state,
        selectedFolderPath: action.data,
      }
    case repoTypes.GET_REPO_SUCCESS:
      return {
        ...state,
        selectedFolderPath: action.data.selectedFolderPath,
      }
    default:
      return state
  }
}

export default reducer
