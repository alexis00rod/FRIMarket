import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext/AuthContext'
import { CartContextProvider } from './context/CartContext/CartContext'
import { ShopContextProvider } from './context/ShopContext/ShopContext'
import { App } from './components'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ShopContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ShopContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
