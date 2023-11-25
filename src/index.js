import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'
import themes from './themes'
import './index.css'

const root = ReactDOMClient.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <ThemeProvider theme={themes}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
