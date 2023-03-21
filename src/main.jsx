import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components'
import { AuthContextProvider, CartContextProvider } from './context'
import { ShopContextProvider } from './context/ShopContext/ShopContext'
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
