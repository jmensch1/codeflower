import { useSelector } from 'react-redux'
import queryString from 'query-string'

const ORIGIN = window.location.origin

export const useLocation = () => useSelector((state) => state.router.location)
export const useRepo = () => useSelector((state) => state.repo)
export const useFolders = () => useSelector((state) => state.folders)
export const useTree = () => useSelector((state) => state.tree)
export const useLanguages = () => useSelector((state) => state.languages)
export const useFiles = () => useSelector((state) => state.files)
export const useTerminal = () => useSelector((state) => state.terminal)
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
