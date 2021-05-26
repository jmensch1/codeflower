import queryString from 'query-string'
import { createMuiTheme } from '@material-ui/core/styles'

const githubThemes = {
  defaultDark: {
    palette: {
      type: 'dark',
      background: {
        default: '#0d1117',
        paper: '#161b22',
      },
      divider: '#21262d',
    },
  },
  darkDimmed: {
    palette: {
      type: 'dark',
      background: {
        default: '#22272e',
        paper: '#2d333b',
      },
      divider: '#373e47',
    },
  },
}

const DEFAULT_BASE_THEME = githubThemes.darkDimmed

// get theme from the query string if it exists
// only dark themes are allowed because light ones look bad
// if there's no valid theme in the query string, use the default
const baseTheme = (() => {
  try {
    const { theme } = queryString.parse(window.location.search)
    const parsed = JSON.parse(theme)
    return parsed?.palette?.type === 'dark' ? parsed : DEFAULT_BASE_THEME
  } catch (e) {
    return DEFAULT_BASE_THEME
  }
})()

export default createMuiTheme(baseTheme)
