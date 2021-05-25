import queryString from 'query-string'
import { createMuiTheme } from '@material-ui/core/styles'

const DEFAULT_BASE_THEME = {
  palette: {
    type: 'dark',
    background: {
      default: 'hsl(0, 0%, 14%)',
      paper: 'hsl(0, 0%, 21%)',
    },
  },
}

// get theme from the query string if it exists
// only dark themes are allowed because light ones look bad
const baseTheme = (() => {
  try {
    const { theme } = queryString.parse(window.location.search)
    const parsed = JSON.parse(theme)
    return parsed?.palette?.type === 'dark' ? parsed : DEFAULT_BASE_THEME
  } catch(e) {
    return DEFAULT_BASE_THEME
  }
})()

export default createMuiTheme(baseTheme)
