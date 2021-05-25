import { types as repoTypes } from './repo'
import { types as galleryTypes } from './gallery'

export const types = {
  SELECT_LANGUAGE: 'settings/SELECT_LANGUAGE',
  SELECT_FOLDER: 'settings/SELECT_FOLDER',
  HIGHLIGHT_FOLDER: 'settings/HIGHLIGHT_FOLDER',
  SELECT_AUTHOR: 'settings/SELECT_AUTHOR',
  HIGHLIGHT_AUTHOR: 'settings/HIGHLIGHT_AUTHOR',
}

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
  selectedLanguage: null,
  selectedFolderPath: null,
  highlightedFolderPath: null,
  selectedAuthorId: null,
  highlightedAuthorId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
