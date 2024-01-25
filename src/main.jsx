import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext/AuthContext'
import { CartContextProvider } from './context/CartContext/CartContext'
import { ShopContextProvider } from './context/ShopContext/ShopContext'
import { App } from './components'
import './index.css'
import { RegistrationContextProvider } from './context/RegistrationContext/RegistrationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <RegistrationContextProvider>
        <AuthContextProvider>
          <ShopContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </ShopContextProvider>
        </AuthContextProvider>
      </RegistrationContextProvider>
    </Router>
  </React.StrictMode>,
)
