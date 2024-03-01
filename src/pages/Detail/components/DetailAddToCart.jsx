import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCartContext } from "../../../context/CartContext/CartContext"
import { useAuthContext } from "../../../context/AuthContext/AuthContext"
import { InputNumber, Notification } from "../../../components"

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
      <button className="btn btn-red btn-m btn-text" onClick={() => removeProductToCartList(product)}>
        <i className="fa-solid fa-trash"></i>
        Borrar del carrito
      </button>
    )
  } else {
    return (
      <div className="detail-cart">
        <div className="detail-cart-qty">
          <span className="detail-cart-qty-title">Cantidad:</span>
          <InputNumber 
          name="qtyProducts" 
          id="qtyProducts"
          value={qtyProducts}
          max={stock}
          style={{width: `${Math.max(30, (qtyProducts.toString().length || 1) * 10)}px`}}
          onChange={({target:{value}}) => setQtyProducts(value)}
          />
          {qtyProductsError &&
            <Notification position='bottom-full left-0' message={qtyProductsError}/>}
        </div>
        <button className="btn btn-blue btn-m btn-text" onClick={submitAddToCart} >
          <i className="fa-solid fa-cart-shopping"></i>
          Agregar al carrito
        </button>
      </div>
    )
  }

}
