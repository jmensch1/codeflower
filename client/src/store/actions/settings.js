import mainThemes from 'themes/mainThemes'
import visThemes from 'themes/visThemes'
import { types as repoTypes } from './repo'
import { setPath } from 'services/utils'

export const types = {
  SET_MAIN_THEME: 'settings/SET_MAIN_THEME',
  UPDATE_MAIN_THEME: 'settings/UPDATE_MAIN_THEME',
  SET_VIS_TYPE: 'settings/SET_VIS_TYPE',
  SELECT_LANGUAGE: 'settings/SELECT_LANGUAGE',
  SELECT_FOLDER: 'settings/SELECT_FOLDER',
  HIGHLIGHT_FOLDER: 'settings/HIGHLIGHT_FOLDER',
  SELECT_AUTHOR: 'settings/SELECT_AUTHOR',
  HIGHLIGHT_AUTHOR: 'settings/HIGHLIGHT_AUTHOR',
  SET_VIS_STYLES: 'settings/SET_VIS_STYLES',
  UPDATE_VIS_STYLES: 'settings/UPDATE_VIS_STYLES',
  SET_VIS_FORCES: 'settings/SET_VIS_FORCES',
  UPDATE_VIS_FORCES: 'settings/UPDATE_VIS_FORCES',
  SET_VIS_POSITION: 'settings/SET_VIS_POSITION',
  UPDATE_VIS_POSITION: 'settings/UPDATE_VIS_POSITION',
}

export const setMainTheme = (mainTheme) => ({
  type: types.SET_MAIN_THEME,
  data: mainTheme,
})

export const updateMainTheme = (path, value) => ({
  type: types.UPDATE_MAIN_THEME,
  data: { path, value },
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

export const updateVisStyles = (path, value) => ({
  type: types.UPDATE_VIS_STYLES,
  data: { path, value },
})

export const setVisForces = (visForces) => ({
  type: types.SET_VIS_FORCES,
  data: visForces,
})

export const updateVisForces = (path, value) => ({
  type: types.UPDATE_VIS_FORCES,
  data: { path, value },
})

export const setVisPosition = (visPosition) => ({
  type: types.SET_VIS_POSITION,
  data: visPosition,
})

export const updateVisPosition = (path, value) => ({
  type: types.UPDATE_VIS_POSITION,
  data: { path, value },
})

const initialState = {
  mainTheme: mainThemes.dark,
  visType: 'force',
  selectedLanguage: null,
  selectedFolderPath: null,
  highlightedFolderPath: null,
  selectedAuthorId: null,
  highlightedAuthorId: null,
  visStyles: visThemes.periwinkle,
  visForces: null,
  visPosition: {
    rotation: 0,
    zoom: null,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MAIN_THEME:
      return {
        ...state,
        mainTheme: action.data,
      }
    case types.UPDATE_MAIN_THEME:
      return {
        ...state,
        mainTheme: setPath(
          state.mainTheme,
          action.data.path,
          action.data.value
        ),
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
    case types.UPDATE_VIS_STYLES:
      return {
        ...state,
        visStyles: {
          ...setPath(state.visStyles, action.data.path, action.data.value),
          id: undefined,
        },
      }
    case types.SET_VIS_FORCES:
      return {
        ...state,
        visForces: action.data,
      }
    case types.UPDATE_VIS_FORCES:
      return {
        ...state,
        visForces: setPath(
          state.visForces,
          action.data.path,
          action.data.value
        ),
      }
    case types.SET_VIS_POSITION:
      return {
        ...state,
        visPosition: action.data,
      }
    case types.UPDATE_VIS_POSITION:
      return {
        ...state,
        visPosition: setPath(
          state.visPosition,
          action.data.path,
          action.data.value
        ),
      }
    default:
      return state
  }
}

export default reducer
