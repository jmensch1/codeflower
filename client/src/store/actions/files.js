import * as api from 'services/api'

export const types = {
  GET_FILE_PENDING: 'files/GET_FILE_PENDING',
  GET_FILE_SUCCESS: 'files/GET_FILE_SUCCESS',
  GET_FILE_ERROR: 'files/GET_FILE_ERROR',
}

export const getFile = (path) => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.GET_FILE_PENDING,
      data: { path },
    })

    try {
      const { repoId } = getState().repo
      const file = await api.getFile({ repoId, path })
      dispatch({
        type: types.GET_FILE_SUCCESS,
        data: { path, file },
      })
    } catch (e) {
      dispatch({
        type: types.GET_FILE_ERROR,
      })
    }
  }
}

const initialState = {
  isLoading: false,
  error: null,
  files: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FILE_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
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
    case types.GET_FILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: {
          message: 'Error loading file.',
        },
      }
    default:
      return state
  }
}

export default reducer
