import * as api from 'services/api'

export const types = {
  GET_FILE_SUCCESS: 'GET_FILE_SUCCESS'
}

export const getFile = (path) => {
  return async (dispatch, getState) => {
    const state = getState()
    const { repoId } = state.repo
    const file = await api.getFile({ repoId, path })
    console.log(file)
    dispatch({
      type: types.GET_FILE_SUCCESS,
      data: { path, file },
    })
  }
}

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
    default:
      return state
  }
}

export default reducer
