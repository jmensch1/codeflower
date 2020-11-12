import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ThemeProvider from './components/ThemeProvider'
import { Provider } from 'react-redux'
import store from './store'
//import reportWebVitals from './reportWebVitals'

console.log('environment:', process.env)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
