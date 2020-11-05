export const types = {
  SET_TREE: 'SET_TREE'
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TREE:
      return action.data
    default:
      return state
  }
}

export default reducer
