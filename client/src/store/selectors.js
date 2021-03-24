import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import * as repoUtils from 'services/repo'
import { colorArray } from 'services/utils'

////////// SIMPLE SELECTORS ///////////

const location = (state) => state.router.location
const query = (state) => state.query
const repo = (state) => state.repo
const authors = (state) => state.repo?.authors
const rootFolder = (state) => state.repo?.tree
const files = (state) => state.files

const settings = (state) => state.settings
const baseTheme = (state) => state.settings.baseTheme
const selectedFolderPath = (state) => state.settings.selectedFolderPath
const highlightedFolderPath = (state) => state.settings.highlightedFolderPath
const selectedLanguage = (state) => state.settings.selectedLanguage
const selectedAuthorId = (state) => state.settings.selectedAuthorId
const highlightedAuthorId = (state) => state.settings.highlightedAuthorId

const visType = (state) => state.vis.type
const visStyles = (state) => state.vis.styles
const fileFill = (state) => state.vis.styles.files.fill
const visForces = (state) => state.vis.forces
const visPosition = (state) => state.vis.position
const savedVis = (state) => state.vis.saved
const visFuncs = (state) => state.vis.funcs

const camera = (state) => state.camera
const gallery = (state) => state.gallery
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

///////// SELECT (FOR USE IN THUNKS) //////////

export const select = {
  repo,
  visStyles,
  visForces,
  visPosition,
  visFuncs,
  camera,
  gallery,
  selectedFolderPath,
}

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
export const useBaseTheme = () => useSelector(baseTheme)

export const useVisType = () => useSelector(visType)
export const useVisStyles = () => useSelector(visStyles)
export const useVisForces = () => useSelector(visForces)
export const useVisPosition = () => useSelector(visPosition)
export const useSavedVis = () => useSelector(savedVis)
export const useVisFuncs = () => useSelector(visFuncs)

export const useCamera = () => useSelector(camera)
export const useGallery = () => useSelector(gallery)

////////// PARAMATERIZED USE SELECTOR ///////////

export const useModal = (modalType) =>
  useSelector((state) => {
    return state.modals[modalType] || { isOpen: false, params: {} }
  })
