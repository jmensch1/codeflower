import mainThemes from 'themes/mainThemes'
import visThemes from 'themes/visThemes'
import { types as repoTypes } from './repo'

export const types = {
  SET_MAIN_THEME: 'settings/SET_MAIN_THEME',
  SET_VIS_THEME: 'settings/SET_VIS_THEME',
  SET_VIS_TYPE: 'settings/SET_VIS_TYPE',
  SELECT_LANGUAGE: 'settings/SELECT_LANGUAGE',
  SELECT_FOLDER: 'settings/SELECT_FOLDER',
  HIGHLIGHT_FOLDER: 'settings/HIGHLIGHT_FOLDER',
  SELECT_AUTHOR: 'settings/SELECT_AUTHOR',
  HIGHLIGHT_AUTHOR: 'settings/HIGHLIGHT_AUTHOR',
  SET_VIS_STYLES: 'settings/SET_VIS_STYLES',
  SET_VIS_FORCES: 'settings/SET_VIS_FORCES',
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

export const highlightFolder = (folderPath) => ({
  type: types.HIGHLIGHT_FOLDER,
  data: folderPath,
})

export const selectAuthor = (authorId) => ({
  type: types.SELECT_AUTHOR,
  data: authorId,
})

export const highlightAuthor = (authorId) => ({
  type: types.HIGHLIGHT_AUTHOR,
  data: authorId,
})

export const setVisStyles = (visStyles) => ({
  type: types.SET_VIS_STYLES,
  data: visStyles,
})

export const setVisForces = (visForces) => ({
  type: types.SET_VIS_FORCES,
  data: visForces,
})

const initialState = {
  mainThemeId: Object.keys(mainThemes)[0],
  visThemeId: Object.keys(visThemes)[0],
  visType: 'force',
  selectedLanguage: null,
  selectedFolderPath: null,
  highlightedFolderPath: null,
  selectedAuthorId: null,
  highlightedAuthorId: null,
  visStyles: null,
  visForces: null,
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
        highlightedFolderPath: null,
      }
    case repoTypes.GET_REPO_SUCCESS:
      return {
        ...state,
        selectedFolderPath: action.data.selectedFolderPath,
        highlightedFolderPath: null,
      }
    case types.HIGHLIGHT_FOLDER:
      return {
        ...state,
        highlightedFolderPath: action.data,
      }
    case types.SELECT_AUTHOR:
      return {
        ...state,
        selectedAuthorId: action.data,
      }
    case types.HIGHLIGHT_AUTHOR:
      return {
        ...state,
        highlightedAuthorId: action.data,
      }
    case types.SET_VIS_STYLES:
      return {
        ...state,
        visStyles: action.data,
      }
    case types.SET_VIS_FORCES:
      return {
        ...state,
        visForces: action.data,
      }
    default:
      return state
  }
}

export default reducer
