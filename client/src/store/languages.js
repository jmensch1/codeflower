export const types = {
  SET_LANGUAGES: 'languages/SET_LANGUAGES',
  SELECT_LANGUAGE: 'languages/SELECT_LANGUAGE',
}

export const selectLanguage = (langClass) => {
  return {
    type: types.SELECT_LANGUAGE,
    data: langClass,
  }
}

const initialState = {
  selectedLanguage: undefined,
  languages: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGES:
      return {
        ...state,
        languages: action.data,
      }
    case types.SELECT_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.data,
      }
    default:
      return state
  }
}

export default reducer
