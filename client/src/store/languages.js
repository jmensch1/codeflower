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

// returns the counts of languages in the given folder
function getCounts(folder) {
  const counts = {}

  // traverse the given folder and calculate
  // the file and line folders
  ;(function recurse(node) {

    if (node.language) {
      const { language: lang } = node

      if (!counts[lang])
        counts[lang] = {
          files: 0,
          lines: 0,
        }

      counts[lang].files += 1
      counts[lang].lines += node.size
    }

    if (node.children)
      node.children.forEach(recurse)

  })(folder)

  return Object.keys(counts).map(language => ({
    ...counts[language],
    language,
  }))
}

function getSortedCounts(counts, sortParams) {
  const prop = sortParams.sortCol
  const sortFactor = sortParams.sortDesc ? 1 : -1
  return counts.slice().sort((a, b) => {
    return sortFactor * (b[prop] > a[prop] ? 1 : -1);
  })
}

function getTotals(sortedCounts) {
  return sortedCounts.reduce((totals, count) => {
    totals.files += count.files
    totals.lines += count.lines
    return totals
  }, { files: 0, lines: 0 })
}

function getClasses(sortedCounts) {
  return sortedCounts.reduce((classes, count, index) => {
    classes[count.language] = `lang-${index}`
    return classes
  }, {})
}

export const updateLanguages = (folder) => {
  const sortParams = { sortCol: 'lines', sortDesc: true }
  const counts = getCounts(folder)
  const sortedCounts = getSortedCounts(counts, sortParams)
  const totals = getTotals(sortedCounts)
  const classes = getClasses(sortedCounts)
  return {
    type: types.UPDATE_LANGUAGES,
    data: {
      sortParams,
      counts: sortedCounts,
      totals,
      classes,
    }
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
