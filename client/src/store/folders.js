import { types as repoTypes } from './repo'
import { types as treeTypes } from './tree'
import { updateLanguages } from './languages'
import repo from 'services/repo'

export const types = {
  SELECT_FOLDER: 'folders/SELECT_FOLDER'
}

export const selectFolder = (folderPath) => {
  return (dispatch, getState) => {
    const { tree } = getState().repo.cloc
    const folder = repo.getFolder(tree, folderPath)
    dispatch({
      type: types.SELECT_FOLDER,
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
        folderPaths: repo.getFolderPaths(action.data.cloc.tree),
      }
    case types.SELECT_FOLDER:
      return {
        ...(state || {}),
        selectedFolder: action.data,
      }
    default:
      return state
  }
}

export default reducer
