import { types as repoTypes } from './repo'
import { types as foldersTypes } from './folders'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case repoTypes.GET_REPO_SUCCESS:
    case foldersTypes.SELECT_FOLDER:
      return action.data.folder
    default:
      return state
  }
}

export default reducer
