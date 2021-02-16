import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import * as repoUtils from 'services/repo'
import { colorArray } from 'services/utils'

////////// SIMPLE SELECTORS ///////////

const location = (state) => state.router.location
const query = (state) => state.query
const repo = (state) => state.repo
const authors = (state) => state.repo?.authors
const rootFolder = (state) => state.repo?.cloc.tree
const files = (state) => state.files
const settings = (state) => state.settings
const mainTheme = (state) => state.settings.mainTheme
const visType = (state) => state.settings.visType
const selectedFolderPath = (state) => state.settings.selectedFolderPath
const highlightedFolderPath = (state) => state.settings.highlightedFolderPath
const selectedLanguage = (state) => state.settings.selectedLanguage
const selectedAuthorId = (state) => state.settings.selectedAuthorId
const highlightedAuthorId = (state) => state.settings.highlightedAuthorId
const visStyles = (state) => state.settings.visStyles
const fileFill = (state) => state.settings.visStyles?.files.fill
const visForces = (state) => state.settings.visForces
const visPosition = (state) => state.settings.visPosition
const context = (state) => {
  const { context } = state.router.location.query
  return {
    isExtension: context === 'chrome',
    isWeb: context !== 'chrome',
  }
}

////////// CREATE SELECTOR ///////////

const selectedFolder = createSelector(
  [rootFolder, selectedFolderPath],
  (rootFolder, selectedFolderPath) => {
    if (!rootFolder || !selectedFolderPath) return null
    return repoUtils.getFolder(rootFolder, selectedFolderPath)
  }
)

const languageCounts = createSelector([selectedFolder], (selectedFolder) =>
  repoUtils.getLanguageCounts(selectedFolder)
)

const languageColors = createSelector(
  [languageCounts, fileFill],
  (counts, fileFill) => {
    if (!fileFill) return {}

    const langColors = colorArray(fileFill, counts.length)
    return counts.reduce((colors, { language }, index) => {
      colors[language] = langColors[index]
      return colors
    }, {})
  }
)

////////// USE SELECTOR ///////////

export const useLocation = () => useSelector(location)
export const useQuery = () => useSelector(query)
export const useRepo = () => useSelector(repo)
export const useRootFolder = () => useSelector(rootFolder)
export const useAuthors = () => useSelector(authors)
export const useFiles = () => useSelector(files)
export const useSettings = () => useSelector(settings)
export const useSelectedFolderPath = () => useSelector(selectedFolderPath)
export const useSelectedLanguage = () => useSelector(selectedLanguage)
export const useHighlightedFolderPath = () => useSelector(highlightedFolderPath)
export const useHighlightedAuthorId = () => useSelector(highlightedAuthorId)
export const useSelectedAuthorId = () => useSelector(selectedAuthorId)
export const useSelectedFolder = () => useSelector(selectedFolder)
export const useLanguageCounts = () => useSelector(languageCounts)
export const useLanguageColors = () => useSelector(languageColors)
export const useContext = () => useSelector(context)
export const useMainTheme = () => useSelector(mainTheme)
export const useVisType = () => useSelector(visType)
export const useVisStyles = () => useSelector(visStyles)
export const useVisForces = () => useSelector(visForces)
export const useVisPosition = () => useSelector(visPosition)

////////// PARAMATERIZED USE SELECTOR ///////////

export const useModal = (modalType) =>
  useSelector((state) => {
    return state.modals[modalType] || { isOpen: false, params: {} }
  })
