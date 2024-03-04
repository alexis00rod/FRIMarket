import { useState, createContext, useContext, useEffect } from 'react'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({children}) => {
  const [cartList, setCartList] = useState(() => {
    const storedCartList = localStorage.getItem('cartList')
    return storedCartList ? JSON.parse(storedCartList) : []
  })

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

  const [cartPriceTotal, setCartPriceTotal] = useState(() => {
    const storedCartPriceTotal = localStorage.getItem('cartPriceTotal')
    return storedCartPriceTotal ? parseFloat(storedCartPriceTotal) : 0
  })

  useEffect(() => {
    localStorage.setItem('cartPriceTotal', cartPriceTotal.toString())
  }, [cartPriceTotal])

  const [cartQty, setCartQty] = useState(() => {
    const storedCartQty = localStorage.getItem('cartQty')
    return storedCartQty ? parseInt(storedCartQty) : 0
  })

  useEffect(() => {
    localStorage.setItem('cartQty', cartQty.toString())
  }, [cartQty])

  const [delivery, setDelivery] = useState({})

  useEffect(() => {
    const withStandardShipping = cartList.filter(e => e.shipping === 'Envío standard')
    setDelivery({
      qty: withStandardShipping.length,
      price: withStandardShipping.length * 500
    })
    // setDelivery(withStandardShipping.length * 500)
  },[cartList])

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
    const productToRemove = cartList.find(e => e.id === product.id)

    setCartList(cartList.filter(e => e.id !== productToRemove.id))
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
    <CartContext.Provider value={{cartList, cartPriceTotal, cartQty, delivery, addToCartList, removeProductToCartList, addProduct, removeProduct, emptyCart}}>
      {children}
    </CartContext.Provider>
  )
}
