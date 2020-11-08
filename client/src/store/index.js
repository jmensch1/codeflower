import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import repo from './repo'
import folders from './folders'
import tree from './tree'
import languages from './languages'
import themeId from './themeId'
import styleSheet from './styleSheet'
import files from './files'
import terminal from './terminal'

const rootReducer = combineReducers({
  repo,
  folders,
  tree,
  languages,
  themeId,
  styleSheet,
  files,
  terminal,
})

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store
