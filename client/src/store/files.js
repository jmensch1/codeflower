import * as api from 'services/api'

export const types = {
  GET_FILE_SUCCESS: 'files/GET_FILE_SUCCESS',
  CLOSE_FILE: 'files/CLOSE_FILE',
}

export const getFile = (path) => {
  return async (dispatch, getState) => {
    const state = getState()
    const { repoId } = state.repo
    const file = await api.getFile({ repoId, path })
    dispatch({
      type: types.GET_FILE_SUCCESS,
      data: { path, file },
    })
  }
}

export const closeFile = () => ({
  type: types.CLOSE_FILE,
})

const initialState = {
  selectedFile: undefined,
  files: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FILE_SUCCESS:
      return {
        selectedFile: action.data.path,
        files: {
          ...state.files,
          [action.data.path]: action.data.file,
        }
      }
    case types.CLOSE_FILE:
      return {
        ...state,
        selectedFile: undefined,
      }
    default:
      return state
  }
}

export default reducer
