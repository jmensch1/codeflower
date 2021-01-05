import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import history from 'services/history'
import { routerMiddleware } from 'connected-react-router'

import router from './router'
import repo from './repo'
import folders from './folders'
import files from './files'
import settings from './settings'
import modals from './modals'

const rootReducer = combineReducers({
  router,
  repo,
  folders,
  files,
  settings,
  modals,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
)

export default store
