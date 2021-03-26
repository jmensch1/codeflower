import visThemes from 'themes/visThemes'
import { types as repoTypes } from './repo'
import { types as galleryTypes } from './gallery'
import { setPath } from 'services/utils'

export const types = {
  SET_VIS_TYPE: 'vis/SET_VIS_TYPE',
  SET_VIS_FORCES: 'vis/SET_VIS_FORCES',
  UPDATE_VIS_FORCES: 'vis/UPDATE_VIS_FORCES',
  SET_VIS_STYLES: 'vis/SET_VIS_STYLES',
  UPDATE_VIS_STYLES: 'vis/UPDATE_VIS_STYLES',
  SET_VIS_POSITION: 'vis/SET_VIS_POSITION',
  UPDATE_VIS_POSITION: 'vis/UPDATE_VIS_POSITION',
  SET_VIS_FUNCS: 'vis/SET_VIS_FUNCS',
}

export const setVisType = (visType) => ({
  type: types.SET_VIS_TYPE,
  data: visType,
})

export const setVisForces = (visForces) => ({
  type: types.SET_VIS_FORCES,
  data: visForces,
})

export const updateVisForces = (path, value) => ({
  type: types.UPDATE_VIS_FORCES,
  data: { path, value },
})

export const setVisStyles = (visStyles) => ({
  type: types.SET_VIS_STYLES,
  data: visStyles,
})

export const updateVisStyles = (path, value) => ({
  type: types.UPDATE_VIS_STYLES,
  data: { path, value },
})

export const setVisPosition = (visPosition) => ({
  type: types.SET_VIS_POSITION,
  data: visPosition,
})

export const updateVisPosition = (path, value) => ({
  type: types.UPDATE_VIS_POSITION,
  data: { path, value },
})

export const setVisFuncs = (funcs) => ({
  type: types.SET_VIS_FUNCS,
  data: funcs,
})

const initialState = {
  type: 'force',
  forces: null,
  styles: visThemes.periwinkle,
  position: {
    rotation: 0,
    zoom: {
      x: 0,
      y: 0,
      k: 1,
    },
  },
  funcs: {
    getSvg: null,
  },
  saved: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VIS_TYPE:
      return {
        ...state,
        type: action.data,
      }
    case types.SET_VIS_FORCES:
      return {
        ...state,
        forces: action.data,
      }
    case types.UPDATE_VIS_FORCES:
      return {
        ...state,
        forces: setPath(
          state.forces,
          action.data.path,
          action.data.value
        ),
      }
    case types.SET_VIS_STYLES:
      return {
        ...state,
        styles: action.data,
      }
    case types.UPDATE_VIS_STYLES:
      return {
        ...state,
        styles: {
          ...setPath(
            state.styles,
            action.data.path,
            action.data.value
          ),
          id: null,
        },
      }
    case types.SET_VIS_POSITION:
      return {
        ...state,
        position: action.data,
      }
    case types.UPDATE_VIS_POSITION:
      return {
        ...state,
        position: setPath(
          state.position,
          action.data.path,
          action.data.value
        ),
      }
    case types.SET_VIS_FUNCS:
      return {
        ...state,
        funcs: action.data,
      }
    case repoTypes.GET_REPO_SUCCESS:
      return {
        ...state,
        saved: null,
      }
    case galleryTypes.RESTORE_IMAGE:
      return {
        ...state,
        ...action.data.vis,
        saved: {
          getSvgString: () => action.data.svgString,
        },
      }
    default:
      return state
  }
}

export default reducer
