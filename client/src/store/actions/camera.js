export const types = {
  UPDATE_CAMERA: 'camera/UPDATE_CAMERA',
  RESET_CAMERA: 'camera/RESET_CAMERA',
}

export const updateCamera = (updates) => ({
  type: types.UPDATE_CAMERA,
  data: updates,
})

export const resetCamera = () => ({
  type: types.RESET_CAMERA,
})

const initialState = {
  cameraOn: false,
  transparent: false,
  aspectRatio: null,
  aperture: null,
  showAperture: false,
  flash: null,
  getSvgUri: null,
  getPngUri: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CAMERA:
      return {
        ...state,
        ...action.data,
      }
    case types.RESET_CAMERA:
      return initialState
    default:
      return state
  }
}

export default reducer
