import * as api from 'services/api'
import repo from 'services/repo'
import { openTerminal, closeTerminal } from './terminal'
import { openModal } from './modals'
import { delay } from 'services/utils'
import { MAX_NODES } from 'constants.js'

export const types = {
  SUBSCRIBE: 'repo/SUBSCRIBE',
  UNSUBSCRIBE: 'repo/UNSUBSCRIBE',
  GET_REPO_SUCCESS: 'repo/GET_REPO_SUCCESS',
}

let subscriptions = []

export const subscribe = (callback) => {
  subscriptions.push(callback)
  return { type: types.SUBSCRIBE }
}

export const unsubscribe = (callback) => {
  subscriptions = subscriptions.filter(sub => sub !== callback)
  return { type: types.UNSUBSCRIBE }
}

function onUpdate(data) {
  subscriptions.forEach(sub => sub(data))
}

export const getRepo = ({ owner, name, branch }) => {
  return async dispatch => {

    //// GET REPO ////

    await delay(250)
    dispatch(openTerminal())
    await delay(750)

    const data = await api.getRepo({ owner, name, branch, onUpdate })

    await delay(750)
    dispatch(closeTerminal())
    await delay(750)

    const { tree } = data.cloc
    const folderPaths = repo.getFolderPaths(tree)

    //// FOLDER SELECTION ////

    const onSelectFolder = (selectedFolder) => {
      const folder = repo.getFolder(tree, selectedFolder)
      const languages = repo.getLanguages(folder)

      dispatch({
        type: types.GET_REPO_SUCCESS,
        data: {
          repo: data,
          folderPaths,
          selectedFolder,
          folder,
          languages,
        }
      })
    }

    const getLargestFolderUnderMax = (folderPaths) => {
      const largest = folderPaths
        .slice()
        .sort((a, b) => b.totalNodes - a.totalNodes)
        .find(el => el.totalNodes < MAX_NODES)

      return largest ? largest.pathName : 'root'
    }

    if (folderPaths[0].totalNodes < MAX_NODES)
      return onSelectFolder(folderPaths[0].pathName)

    return dispatch(openModal('maxNodes', {
      totalNodes: folderPaths[0].totalNodes,
      onRenderAll: () => onSelectFolder(folderPaths[0].pathName),
      onRenderSub: () => onSelectFolder(getLargestFolderUnderMax(folderPaths)),
    }))
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPO_SUCCESS:
      return action.data.repo
    default:
      return state
  }
}

export default reducer
