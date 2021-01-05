import { useSelector } from 'react-redux'
import queryString from 'query-string'
import { createSelector } from 'reselect'
import repoUtils from 'services/repo'

const ORIGIN = window.location.origin

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

export const useShareLink = () =>
  useSelector((state) => {
    const { pathname, search } = state.router.location
    const params = queryString.parse(search)
    delete params.context
    const query = queryString.stringify(params)
    return `${ORIGIN}${pathname}/?${query}`
  })

const rootFolder = (state) => state.repo?.cloc.tree
const selectedFolderPath = (state) => state.folders.selectedFolder

const selectedFolder = createSelector(
  [rootFolder, selectedFolderPath],
  (rootFolder, selectedFolderPath) => {
    if (!rootFolder || !selectedFolderPath) return null
    return repoUtils.getFolder(rootFolder, selectedFolderPath)
  }
)

export const useSelectedFolder = () => useSelector(selectedFolder)

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
