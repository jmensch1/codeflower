import { types as foldersTypes } from './folders'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case foldersTypes.SELECT_FOLDER:
      return action.data.folder
    default:
      return state
  }
}

export default reducer
