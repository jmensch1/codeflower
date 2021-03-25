import baseTheme from 'themes/baseTheme'
import { types as repoTypes } from './repo'
import { types as galleryTypes } from './gallery'
import { setPath } from 'services/utils'

export const types = {
  SET_BASE_THEME: 'settings/SET_BASE_THEME',
  UPDATE_BASE_THEME: 'settings/UPDATE_BASE_THEME',
  SELECT_LANGUAGE: 'settings/SELECT_LANGUAGE',
  SELECT_FOLDER: 'settings/SELECT_FOLDER',
  HIGHLIGHT_FOLDER: 'settings/HIGHLIGHT_FOLDER',
  SELECT_AUTHOR: 'settings/SELECT_AUTHOR',
  HIGHLIGHT_AUTHOR: 'settings/HIGHLIGHT_AUTHOR',
}

export const setBaseTheme = (baseTheme) => ({
  type: types.SET_BASE_THEME,
  data: baseTheme,
})

export const updateBaseTheme = (path, value) => ({
  type: types.UPDATE_BASE_THEME,
  data: { path, value },
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

const initialState = {
  baseTheme,
  selectedLanguage: null,
  selectedFolderPath: null,
  highlightedFolderPath: null,
  selectedAuthorId: null,
  highlightedAuthorId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BASE_THEME:
      return {
        ...state,
        baseTheme: action.data,
      }
    case types.UPDATE_BASE_THEME:
      return {
        ...state,
        baseTheme: setPath(
          state.baseTheme,
          action.data.path,
          action.data.value
        ),
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
    case galleryTypes.RESTORE_IMAGE:
      return {
        ...state,
        selectedFolderPath: action.data.selectedFolderPath,
        highlightedFolderPath: null,
      }
    default:
      return state
  }
}

export default reducer
