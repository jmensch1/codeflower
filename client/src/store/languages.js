export const types = {
  SET_LANGUAGES: 'SET_LANGUAGES'
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGES:
      return action.data
    default:
      return state
  }
}

export default reducer
