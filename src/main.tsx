import 'react-datepicker/dist/react-datepicker.css'

import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ThemeProvider } from './theme/themeContext'
import { authService } from './common/authService'
import { refreshTokenAndSubscribe } from './common/api/refreshByInterval'

async function initApp() {
  await refreshTokenAndSubscribe()

  ReactDOM
    .createRoot(document.getElementById(`root`)!)
    .render(
      <React.StrictMode>
        <authService.AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </authService.AuthProvider>
      </React.StrictMode >,
    )
}

initApp()
