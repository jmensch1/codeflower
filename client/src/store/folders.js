import { types as repoTypes } from './repo'
import { types as treeTypes } from './tree'
import { types as languagesTypes } from './languages'
import { updateStyleSheet } from './styleSheet'
import utils from 'utils'

export const types = {
  SET_FOLDER_PATH: 'SET_FOLDER_PATH'
}

export const setFolderPath = (folderPath) => {
  return (dispatch, getState) => {
    const { tree } = getState().repo.cloc
    const folder = utils.getFolder(tree, folderPath)
    const languages = utils.getLanguages(folder)
    utils.sortLanguages(languages, { sortCol: 'lines', sortDesc: true })
    utils.applyLanguageColorsToJson(folder, languages)
    dispatch({
      type: types.SET_FOLDER_PATH,
      data: folderPath,
    })
    dispatch({
      type: treeTypes.SET_TREE,
      data: folder,
    })
    dispatch({
      type: languagesTypes.SET_LANGUAGES,
      data: languages,
    })
    dispatch(updateStyleSheet())
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case repoTypes.GET_REPO_SUCCESS:
      return {
        selectedFolder: undefined,
        folderPaths: utils.getFolderPaths(action.data.cloc.tree),
      }
    case types.SET_FOLDER_PATH:
      return {
        ...(state || {}),
        selectedFolder: action.data,
      }
    default:
      return state
  }
}

export default reducer
