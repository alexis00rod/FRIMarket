import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartContext } from "../../../context/CartContext/CartContext"
import { useAuthContext } from "../../../context/AuthContext/AuthContext"

export const DetailAddToCart = ({product}) => {
  const [qtyProducts, setQtyProducts] = useState(1)
  const [qtyProductsError, setQtyProductsError] = useState()
  const { cartList, addToCartList, removeProductToCartList} = useCartContext()
  const {id,stock} = product
  const navigate = useNavigate()
  const {userLogged} = useAuthContext()
  
  const validateQty = () => {
    if(!userLogged) {
      navigate('/login')
      return false
    }
    if(!qtyProducts || qtyProducts === '0') {
      setQtyProductsError('Ingresa cantidad de 1 0 más')
      return false
    }
    if(parseInt(qtyProducts) > parseInt(stock)) {
      setQtyProductsError(`Cantidad maxima permitida ${stock}`)
      return false
    }
    return true
  }

  const submitAddToCart = async () => {
    const validate = validateQty()
    if(validate) {
      addToCartList(product,parseInt(qtyProducts))
      navigate('/cart')
    }
  }
  
  const productInCart = cartList.find(e => e.id === id)

  if(productInCart) {
    return (
      <button className="btn btn-red btn-m" onClick={() => removeProductToCartList(product)}>
        <i className="fa-solid fa-trash"></i>
        <span className="text-sm font-medium">Borrar del carrito</span>
      </button>
    )
  } else {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative flex items-center">
          <span className="text-sm font-medium">Cantidad:</span>
          <input 
          type="number" 
          name="qtyProducts" 
          id="qtyProducts"
          value={qtyProducts}
          max={stock}
          className={`ml-2 h-8 text-sm border border-slate-300 rounded-md outline-none text-center`} 
          style={{width: `${Math.max(30, (qtyProducts.toString().length || 1) * 10)}px`}}
          onChange={({target:{value}}) => setQtyProducts(value)}
          />
          {qtyProductsError && 
            <p className="ml-2 w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="pl-2 font-medium">{qtyProductsError}</span>
            </p>}
        </div>
        <button className="btn btn-blue btn-m" onClick={submitAddToCart} >
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="text-sm font-medium">Agregar al carrito</span>
        </button>
      </div>
    )
  }

}
