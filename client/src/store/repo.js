import * as api from 'services/api'
import { openTerminal, closeTerminal } from './terminal'
import { delay } from 'services/utils'

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

    await delay(250)
    dispatch(openTerminal())
    await delay(750)

    const repo = await api.getRepo({ owner, name, branch, onUpdate })

    await delay(750)
    dispatch(closeTerminal())
    await delay(750)

    dispatch({
      type: types.GET_REPO_SUCCESS,
      data: repo,
    })
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPO_SUCCESS:
      return action.data
    default:
      return state
  }
}

export default reducer
