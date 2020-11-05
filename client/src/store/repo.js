import testRepo from './test-repo-2.json'

export const types = {
  GET_REPO_SUCCESS: 'GET_REPO_SUCCESS'
}

export const getRepo = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: types.GET_REPO_SUCCESS,
        data: testRepo
      })
    }, 500)
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
