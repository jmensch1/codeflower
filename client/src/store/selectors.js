import { useSelector } from 'react-redux'

export const useRepo = () => useSelector(state => state.repo)
export const useFolders = () => useSelector(state => state.folders)
export const useTree = () => useSelector(state => state.tree)
export const useLanguages = () => useSelector(state => state.languages)
export const useThemeId = () => useSelector(state => state.themeId)
