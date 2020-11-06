import testRepo from './test-repo.json'
import * as api from 'services/api'

export const types = {
  GET_REPO_SUCCESS: 'GET_REPO_SUCCESS'
}

export const getRepo = ({ owner, name, branch }) => {
  return async dispatch => {
    if (owner && name) {
      const repo = await api.getRepo({ owner, name, branch })
      dispatch({
        type: types.GET_REPO_SUCCESS,
        data: repo,
      })
    } else {
      // DEVELOPMENT ONLY
      setTimeout(() => {
        dispatch({
          type: types.GET_REPO_SUCCESS,
          data: testRepo
        })
      }, 500)
    }
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPO_SUCCESS:
      return action.data
    default:
      return state
  }
}

export default reducer
