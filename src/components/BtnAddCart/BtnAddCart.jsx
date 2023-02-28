import { useEffect, useState } from "react"
import { useCartContext } from "../../context/CartContext/CartContext"

export const BtnAddCart = ({product, qty}) => {
  const {id,name,thumb,price,stock} = product
  const {cartList,addToCartList} = useCartContext()

  // const productInCart = cartList.find(e => e.id === id)

  // console.log(productInCart)

  return (
    <button 
    className="w-full max-w-xs h-8 px-2 flex justify-center items-center gap-2 bg-blue-500 text-white rounded-md disabled:bg-blue-400"
    onClick={() => addToCartList(product,qty)}
    disabled={stock === 0}
    >
      <i className="fa-solid fa-cart-shopping"></i>
      <span className='text-sm'>Agregar al carrito</span>
    </button>
  )
}
