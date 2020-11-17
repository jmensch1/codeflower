import { types as repoTypes } from './repo'
import { types as foldersTypes } from './folders'

export const types = {
  SELECT_LANGUAGE: 'languages/SELECT_LANGUAGE',
}

export const selectLanguage = (language) => {
  return {
    type: types.SELECT_LANGUAGE,
    data: language,
  }
}

const initialState = {
  selectedLanguage: null,
  counts: null,
  totals: null,
  classes: null,
  sortParams: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.data,
      }
    case repoTypes.GET_REPO_SUCCESS:
    case foldersTypes.SELECT_FOLDER:
      return {
        ...state,
        ...action.data.languages,
      }
    default:
      return state
  }
}

export default reducer
