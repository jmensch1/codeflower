import themes from 'themes'
import jss from 'jss'

export const types = {
  UPDATE_STYLE_SHEET: 'UPDATE_STYLE_SHEET',
  SELECT_LANGUAGE: 'SELECT_LANGUAGE',
}

export const updateStyleSheet = () => {
  return (dispatch, getState) => {
    const { themeId, languages, styleSheet } = getState()
    const theme = themes[themeId]

    if (styleSheet.theme) jss.removeStyleSheet(styleSheet.theme)

    const styles = languages.reduce((styles, lang, index) => {
      const color = theme.dynamic.nodeColor(languages, index)
      styles[lang.class] = {
        fill: color,
        'background-color': color,
      }
      return styles
    }, {})

    const sheet = jss.createStyleSheet(
      styles,
      {
        generateId: (className) => className.key,
      }
    ).attach()

    dispatch({
      type: types.UPDATE_STYLE_SHEET,
      data: sheet
    })
  }
}

export const selectLanguage = (langClass) => {
  return (dispatch, getState) => {
    const { themeId, styleSheet, languages } = getState()
    const theme = themes[themeId]

    if (styleSheet.language) jss.removeStyleSheet(styleSheet.language)

    const styles = languages.reduce((styles, lang) => {
      styles[lang.class] = lang.class === langClass
        ? theme.dynamic.highlightNode()
        : theme.dynamic.suppressNode()
      return styles
    }, {})

    let sheet = null
    if (langClass)
      sheet = jss.createStyleSheet(
        styles,
        {
          generateId: (className) => className.key,
        }
      ).attach()

    dispatch({
      type: types.SELECT_LANGUAGE,
      data: sheet,
    })
  }
}

const initialState = {
  theme: null,
  language: null,
  user: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_STYLE_SHEET:
      return {
        ...state,
        theme: action.data,
      }
    case types.SELECT_LANGUAGE:
      return {
        ...state,
        language: action.data,
      }
    default:
      return state
  }
}

export default reducer
