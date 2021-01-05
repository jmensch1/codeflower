import { types as repoTypes } from './repo'

export const types = {
  SELECT_FOLDER: 'folders/SELECT_FOLDER',
}

export const selectFolder = (folderPath) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SELECT_FOLDER,
      data: {
        folderPath,
      },
    })
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
        selectedFolder: action.data.selectedFolder,
        folderPaths: action.data.folderPaths,
      }
    case types.SELECT_FOLDER:
      return {
        ...state,
        selectedFolder: action.data.folderPath,
      }
    default:
      return state
  }
}

export default reducer
