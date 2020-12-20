import { useSelector } from 'react-redux'

export const useLocation = () => useSelector(state => state.router.location)
export const useRepo = () => useSelector(state => state.repo)
export const useFolders = () => useSelector(state => state.folders)
export const useTree = () => useSelector(state => state.tree)
export const useLanguages = () => useSelector(state => state.languages)
export const useFiles = () => useSelector(state => state.files)
export const useTerminal = () => useSelector(state => state.terminal)
export const useSettings = () => useSelector(state => state.settings)
export const useModal = (modalType) =>
  useSelector(state => state.modals[modalType] || { isOpen: false, params: {} })
