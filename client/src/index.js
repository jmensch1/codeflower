import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from 'services/history'
import App from './components/App'
import MainThemeProvider from './components/MainThemeProvider'
import store from './store'
//import reportWebVitals from './reportWebVitals'

// console.log('environment:', process.env)

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
