import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import history from 'services/history'
import { routerMiddleware } from 'connected-react-router'

import router from './actions/router'
import repo from './actions/repo'
import files from './actions/files'
import settings from './actions/settings'
import modals from './actions/modals'

const rootReducer = combineReducers({
  router,
  repo,
  files,
  settings,
  modals,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
)

export default store
