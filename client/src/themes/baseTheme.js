import queryString from 'query-string'

const DEFAULT_BASE_THEME = {
  palette: {
    type: 'dark',
    background: {
      default: 'hsl(0, 0%, 14%)',
      paper: 'hsl(0, 0%, 21%)',
    },
  }
}

const baseTheme = (() => {
  const { theme } = queryString.parse(window.location.search)
  if (!theme) return DEFAULT_BASE_THEME

  try {
    return JSON.parse(theme)
  } catch(e) {
    return DEFAULT_BASE_THEME
  }
})()

export default baseTheme
