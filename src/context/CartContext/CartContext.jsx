import {useState, createContext, useContext} from 'react'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({children}) => {
  const [cartList, setCartList] = useState([])
  const [cartPriceTotal, setCartPriceTotal] = useState(0)
  const [cartQty, setCartQty] = useState(0)

  const addToCartList = (product,qty) => {
    const {id,price} = product

    const productInCart = cartList.find(e => e.id === id)

    if(productInCart) {
      productInCart.qty += qty
    } else {
      setCartList([...cartList,{...product,qty}])
    }

    setCartPriceTotal(cartPriceTotal + (qty * price))
    setCartQty(cartQty + qty)
  }

  const removeProductToCartList = (product) => {
    const productToRemove = cartList.find(e => e.id === product)

    setCartList(cartList.filter(e => e.id !== product))
    setCartPriceTotal(cartPriceTotal - (productToRemove.price * productToRemove.qty))
    setCartQty(cartQty - productToRemove.qty)
  }

  const addProduct = (product) => {
    const {id,price} = product

    cartList.find(e => e.id === id).qty += 1
    setCartPriceTotal(cartPriceTotal + price)
    setCartQty(cartQty + 1)
  }

  const removeProduct = (product) => {
    const {id,price} = product

    cartList.find(e => e.id === id).qty -= 1
    setCartPriceTotal(cartPriceTotal - price)
    setCartQty(cartQty - 1)
  }

  const emptyCart = () => {
    setCartList([])
    setCartPriceTotal(0)
    setCartQty(0)
  }

  return (
    <CartContext.Provider value={{cartList, cartPriceTotal, cartQty, addToCartList, removeProductToCartList, addProduct, removeProduct, emptyCart}}>
      {children}
    </CartContext.Provider>
  )
}
