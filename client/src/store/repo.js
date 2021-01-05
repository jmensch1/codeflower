import * as api from 'services/api'
import repoUtils from 'services/repo'
import { openModal, closeModal } from './modals'
import { delay } from 'services/utils'
import { MAX_NODES } from 'constants.js'

export const types = {
  SUBSCRIBE: 'repo/SUBSCRIBE',
  UNSUBSCRIBE: 'repo/UNSUBSCRIBE',
  GET_REPO_SUCCESS: 'repo/GET_REPO_SUCCESS',
  GET_REPO_FAILURE: 'repo/GET_REPO_FAILURE',
}

let subscriptions = []

export const subscribe = (callback) => {
  subscriptions.push(callback)
  return { type: types.SUBSCRIBE }
}

export const unsubscribe = (callback) => {
  subscriptions = subscriptions.filter((sub) => sub !== callback)
  return { type: types.UNSUBSCRIBE }
}

function onUpdate(data) {
  subscriptions.forEach((sub) => sub(data))
}

export const getRepo = ({ owner, name, branch, username, password }) => {
  return async (dispatch) => {
    //// GET REPO ////

    // await delay(250)
    dispatch(openModal('terminal'))
    await delay(750)

    let repo
    try {
      repo = await api.getRepo({
        owner,
        name,
        branch,
        username,
        password,
        onUpdate,
      })
    } catch (error) {
      console.log(error)
      if (!['NeedCredentials', 'CredentialsInvalid'].includes(error.name))
        return dispatch({
          type: types.GET_REPO_FAILURE,
          data: error,
        })

      return dispatch(openModal('credentials', { owner, name, branch, error }))
    }

    await delay(750)
    dispatch(closeModal('terminal'))
    await delay(750)

    //// FOLDER SELECTION ////

    const onSelectFolder = (selectedFolderPath) => {
      dispatch({
        type: types.GET_REPO_SUCCESS,
        data: {
          repo,
          selectedFolderPath,
        },
      })
    }

    const getLargestFolderUnderMax = (folderPaths) => {
      const largest = folderPaths
        .slice()
        .sort((a, b) => b.totalNodes - a.totalNodes)
        .find((el) => el.totalNodes < MAX_NODES)

      return largest ? largest.pathName : 'root'
    }

    const folderPaths = repoUtils.getFolderPaths(repo.cloc.tree)
    if (folderPaths[0].totalNodes < MAX_NODES)
      return onSelectFolder(folderPaths[0].pathName)

    return dispatch(
      openModal('maxNodes', {
        totalNodes: folderPaths[0].totalNodes,
        onRenderAll: () => onSelectFolder(folderPaths[0].pathName),
        onRenderSub: () =>
          onSelectFolder(getLargestFolderUnderMax(folderPaths)),
      })
    )
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
