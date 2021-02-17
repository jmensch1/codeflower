import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from 'services/history'
import store from './store'
import MainThemeProvider from './components/theme/MainThemeProvider'
import App from './components/App'

ReactDOM.render(
  <Provider store={store}>
    <MainThemeProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </MainThemeProvider>
  </Provider>,
  document.getElementById('root')
)
