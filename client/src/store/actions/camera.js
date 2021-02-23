export const types = {
  CAMERA_ON: 'camera/CAMERA_ON',
  CAMERA_OFF: 'camera/CAMERA_OFF',
  FLASH_ON: 'camera/FLASH_ON',
  FLASH_OFF: 'camera/FLASH_OFF',
}

export const cameraOn = () => ({
  type: types.CAMERA_ON,
})

export const cameraOff = () => ({
  type: types.CAMERA_OFF,
})

export const flash = () => {
  return (dispatch) => {
    dispatch({ type: types.FLASH_ON })
    setTimeout(() => dispatch({ type: types.FLASH_OFF }), 100)
  }
}

const initialState = {
  cameraOn: false,
  flashOn: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CAMERA_ON:
      return {
        ...state,
        cameraOn: true,
      }
    case types.CAMERA_OFF:
      return {
        ...state,
        cameraOn: false,
      }
    case types.FLASH_ON:
      return {
        ...state,
        flashOn: true,
      }
    case types.FLASH_OFF:
      return {
        ...state,
        flashOn: false,
      }
    default:
      return state
  }
}

export default reducer
