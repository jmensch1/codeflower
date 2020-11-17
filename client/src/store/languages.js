import repo from 'services/repo'

export const types = {
  UPDATE_LANGUAGES: 'languages/UPDATE_LANGAUGES',
  SELECT_LANGUAGE: 'languages/SELECT_LANGUAGE',
}

export const selectLanguage = (langClass) => {
  return {
    type: types.SELECT_LANGUAGE,
    data: langClass,
  }
}

export const updateLanguages = (folder) => {
  return {
    type: types.UPDATE_LANGUAGES,
    data: repo.getLanguages(folder),
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
    case types.UPDATE_LANGUAGES:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

export default reducer
