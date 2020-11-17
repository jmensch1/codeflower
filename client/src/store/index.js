import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import repo from './repo'
import folders from './folders'
import tree from './tree'
import languages from './languages'
import files from './files'
import terminal from './terminal'
import settings from './settings'
import modals from './modals'

const rootReducer = combineReducers({
  repo,
  folders,
  tree,
  languages,
  files,
  terminal,
  settings,
  modals,
})

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store
