import { types as repoTypes } from './repo'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case repoTypes.GET_REPO_PENDING:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export default reducer
