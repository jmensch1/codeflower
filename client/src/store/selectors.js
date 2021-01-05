import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import repoUtils from 'services/repo'
import themes from 'themes'

////////// SIMPLE SELECTORS ///////////

const location = (state) => state.router.location
const repo = (state) => state.repo
const rootFolder = (state) => state.repo?.cloc.tree
const files = (state) => state.files
const settings = (state) => state.settings
const selectedFolderPath = (state) => state.settings.selectedFolderPath
const selectedLanguage = (state) => state.settings.selectedLanguage
const context = (state) => {
  const { context } = state.router.location.query
  return {
    isExtension: context === 'chrome',
    isWeb: context !== 'chrome',
  }
}

////////// CREATE SELECTOR ///////////

const folderPaths = createSelector(
  [rootFolder],
  (rootFolder) => {
    if (!rootFolder) return null
    return repoUtils.getFolderPaths(rootFolder)
  }
)

const selectedFolder = createSelector(
  [rootFolder, selectedFolderPath],
  (rootFolder, selectedFolderPath) => {
    if (!rootFolder || !selectedFolderPath) return null
    return repoUtils.getFolder(rootFolder, selectedFolderPath)
  }
)

const languages = createSelector(
  [selectedFolder], (selectedFolder) => {
    if (!selectedFolder) return {
      counts: null,
    }
    return repoUtils.getLanguages(selectedFolder)
  }
)

const languageColors = createSelector([
  languages,
  (state) => state.settings.visThemeId,
], (languages, visThemeId) => {
  const { counts } = languages
  if (!counts || !visThemeId) return null

  const getLanguageColor = themes[visThemeId].languages.color
  const langs = counts.map(count => count.language)
  return langs.reduce((colors, lang, index) => {
    colors[lang] = getLanguageColor(langs, index)
    return colors
  }, {})
})

////////// USE SELECTOR ///////////

export const useLocation = () => useSelector(location)
export const useRepo = () => useSelector(repo)
export const useFiles = () => useSelector(files)
export const useSettings = () => useSelector(settings)
export const useSelectedFolderPath = () => useSelector(selectedFolderPath)
export const useSelectedLanguage = () => useSelector(selectedLanguage)
export const useFolderPaths = () => useSelector(folderPaths)
export const useSelectedFolder = () => useSelector(selectedFolder)
export const useLanguages = () => useSelector(languages)
export const useLanguageColors = () => useSelector(languageColors)
export const useContext = () => useSelector(context)

////////// PARAMATERIZED USE SELECTOR ///////////

export const useModal = (modalType) =>
  useSelector((state) => {
    return state.modals[modalType] || { isOpen: false, params: {} }
  })
