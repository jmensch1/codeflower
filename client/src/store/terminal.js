export const types = {
  OPEN_TERMINAL: 'terminal/OPEN_TERMINAL',
  CLOSE_TERMINAL: 'terminal/CLOSE_TERMINAL',
  TOGGLE_TERMINAL: 'terminal/TOGGLE_TERMINAL',
}

export const openTerminal = () => ({
  type: types.OPEN_TERMINAL,
})

export const closeTerminal = () => ({
  type: types.CLOSE_TERMINAL,
})

export const toggleTerminal = () => ({
  type: types.TOGGLE_TERMINAL,
})

const initialState = {
  isOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_TERMINAL:
      return {
        ...state,
        isOpen: true,
      }
    case types.CLOSE_TERMINAL:
      return {
        ...state,
        isOpen: false,
      }
    case types.TOGGLE_TERMINAL:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    default:
      return state
  }
}

export default reducer
