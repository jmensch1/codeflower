import { listImages } from 'services/gallery'

export const types = {
  GET_IMAGES_SUCCESS: 'gallery/GET_IMAGES_SUCCESS',
  SELECT_IMAGE: 'gallery/SELECT_IMAGE',
}

export const getImages = () => {
  return async (dispatch) => {
    const images = await listImages()
    return dispatch({
      type: types.GET_IMAGES_SUCCESS,
      data: images,
    })
  }
}

export const selectImage = (selectedImage) => ({
  type: types.SELECT_IMAGE,
  data: selectedImage,
})

const initialState = {
  images: null,
  selectedImage: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.data,
        selectedImage: action.data[0],
      }
    case types.SELECT_IMAGE:
      return {
        ...state,
        selectedImage: action.data,
      }
    default:
      return state
  }
}

export default reducer
