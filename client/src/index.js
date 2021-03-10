import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import RootThemeProvider from 'components/theme/RootThemeProvider'
import history from 'services/history'
import store from './store'
import App from './components/App'

console.log(process.env)

ReactDOM.render(
  <Provider store={store}>
    <RootThemeProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </RootThemeProvider>
  </Provider>,
  document.getElementById('root')
)
