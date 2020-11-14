import * as api from 'services/api'

export const types = {
  GET_FILE_PENDING: 'files/GET_FILE_PENDING',
  GET_FILE_SUCCESS: 'files/GET_FILE_SUCCESS',
  CLOSE_FILE: 'files/CLOSE_FILE',
}

export const getFile = (path) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.GET_FILE_PENDING,
      data: path,
    })

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
  isLoading: false,
  selectedFile: null,
  files: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FILE_PENDING:
      return {
        ...state,
        selectedFile: action.data,
        isLoading: true,
      }
    case types.GET_FILE_SUCCESS:
      return {
        ...state,
        files: {
          ...state.files,
          [action.data.path]: action.data.file,
        },
        isLoading: false,
      }
    case types.CLOSE_FILE:
      return {
        ...state,
        selectedFile: null,
      }
    default:
      return state
  }
}

export default reducer
