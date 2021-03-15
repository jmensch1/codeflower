export const types = {
  OPEN_MODAL: 'modals/OPEN_MODAL',
  CLOSE_MODAL: 'modals/CLOSE_MODAL',
}

export const openModal = (modalType, params = {}) => ({
  type: types.OPEN_MODAL,
  data: {
    modalType,
    params,
  },
})

export const closeModal = (modalType) => ({
  type: types.CLOSE_MODAL,
  data: modalType,
})

export const toggleModal = (modalType, params = {}) => {
  return (dispatch, getState) => {
    const state = getState().modals[modalType]
    if (!state || !state.isOpen) dispatch(openModal(modalType, params))
    else dispatch(closeModal(modalType))
  }
}

const initialState = {
  gallery: {
    isOpen: false,
    params: {},
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return {
        ...state,
        [action.data.modalType]: {
          isOpen: true,
          params: action.data.params,
        },
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        [action.data]: {
          isOpen: false,
          params: {},
        },
      }
    default:
      return state
  }
}

export default reducer
