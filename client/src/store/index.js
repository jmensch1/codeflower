import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import history from 'services/history'
import { routerMiddleware } from 'connected-react-router'

import router from './actions/router'
import query from './actions/query'
import repo from './actions/repo'
import vis from './actions/vis'
import files from './actions/files'
import settings from './actions/settings'
import modals from './actions/modals'
import camera from './actions/camera'
import gallery from './actions/gallery'

const rootReducer = combineReducers({
  router,
  query,
  repo,
  files,
  settings,
  modals,
  camera,
  gallery,
  vis,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
)

export default store
