import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import repoUtils from 'services/repo'
import themes from 'themes'

export const useLocation = () => useSelector((state) => state.router.location)
export const useRepo = () => useSelector((state) => state.repo)
export const useFolders = () => useSelector((state) => state.folders)
export const useFiles = () => useSelector((state) => state.files)
export const useSettings = () => useSelector((state) => state.settings)

export const useModal = (modalType) =>
  useSelector((state) => {
    return state.modals[modalType] || { isOpen: false, params: {} }
  })

export const useContext = () =>
  useSelector((state) => {
    const { context } = state.router.location.query
    return {
      isExtension: context === 'chrome',
      isWeb: context !== 'chrome',
    }
  })

const rootFolder = (state) => state.repo?.cloc.tree
const selectedFolderPath = (state) => state.settings.selectedFolderPath

export const useSelectedFolderPath = () => useSelector(selectedFolderPath)

const selectedFolder = createSelector(
  [rootFolder, selectedFolderPath],
  (rootFolder, selectedFolderPath) => {
    if (!rootFolder || !selectedFolderPath) return null
    return repoUtils.getFolder(rootFolder, selectedFolderPath)
  }
)

export const useSelectedFolder = () => useSelector(selectedFolder)

const folderPaths = createSelector(
  [rootFolder],
  (rootFolder) => {
    if (!rootFolder) return null
    return repoUtils.getFolderPaths(rootFolder)
  }
)
export const useFolderPaths = () => useSelector(folderPaths)

const languages = createSelector(
  [selectedFolder], (selectedFolder) => {
    if (!selectedFolder) return {
      counts: null,
      totals: null,
      classes: null,
      sortParams: null,
    }
    return repoUtils.getLanguages(selectedFolder)
  }
)

export const useLanguages = () => useSelector(languages)
export const useSelectedLanguage = () => useSelector((state) => state.settings.selectedLanguage)

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

export const useLanguageColors = () => useSelector(languageColors)
