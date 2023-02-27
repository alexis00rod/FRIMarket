import {useState, createContext, useContext} from 'react'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({children}) => {
  const [cartList, setCartList] = useState([])
  const [cartPriceTotal, setCartPriceTotal] = useState(0)
  const [cartQty, setCartQty] = useState(0)

  const addToCartList = (product) => {
    setCartPriceTotal(cartPriceTotal + (product.qty * product.price))
    setCartQty(cartQty + product.qty)
    const productInCart = cartList.find(e => e.id === product.id)

    if(productInCart) {
      productInCart.qty += product.qty
    } else {
      setCartList([...cartList,product])
    }
  }

  const removeProductToCartList = (product) => {
    const productToRemove = cartList.find(e => e.id === product)

    setCartList(cartList.filter(e => e.id !== product))
    setCartPriceTotal(cartPriceTotal - (productToRemove.price * productToRemove.qty))
    setCartQty(cartQty - productToRemove.qty)
  }

  return (
    <CartContext.Provider value={{cartList,cartPriceTotal,cartQty, addToCartList, removeProductToCartList}}>
      {children}
    </CartContext.Provider>
  )
}
