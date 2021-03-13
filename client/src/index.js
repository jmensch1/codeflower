import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store from 'store'
import history from 'services/history'
import RootThemeProvider from 'components/theme/RootThemeProvider'
import App from 'components/App'

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
