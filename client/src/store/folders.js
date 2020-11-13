import { types as repoTypes } from './repo'
import { types as treeTypes } from './tree'
import { updateLanguages } from './languages'
import utils from 'utils'

export const types = {
  SET_FOLDER_PATH: 'folders/SET_FOLDER_PATH'
}

export const setFolderPath = (folderPath) => {
  return (dispatch, getState) => {
    const { tree } = getState().repo.cloc
    const folder = utils.getFolder(tree, folderPath)
    dispatch({
      type: types.SET_FOLDER_PATH,
      data: folderPath,
    })
    dispatch({
      type: treeTypes.SET_TREE,
      data: folder,
    })
    dispatch(updateLanguages(folder))
  }
}

const initialState = {
  selectedFolder: null,
  folderPaths: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case repoTypes.GET_REPO_SUCCESS:
      return {
        selectedFolder: null,
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
