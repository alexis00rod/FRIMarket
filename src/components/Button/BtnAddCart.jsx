import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useCartContext } from "../../context/CartContext/CartContext"
import { InputNumber, Notification } from "../"

export const BtnAddCart = ({product}) => {
  const [qtyProducts, setQtyProducts] = useState(1)
  const [qtyProductsError, setQtyProductsError] = useState()
  const {userLogged} = useAuthContext()
  const {cartList,addToCartList, removeProductToCartList} = useCartContext()
  const {id, stock} = product
  const navigate = useNavigate()

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

  const productInCart = cartList.find(e => e.id === id)

  const addToCart = async e => {
    e.preventDefault()
    const validate = validateQty()
    if(validate) {
    addToCartList(product,parseInt(qtyProducts))
    navigate('/cart')
    }
  }

  return (
    <>
      {productInCart
      ? <button className="btn btn-text btn-m btn-red" onClick={() => removeProductToCartList(product)}>
          <i className="fa-solid fa-trash"></i>
          Borrar del carrito
        </button>
      : <div className="btn-addCart">
          <div className="btn-addCart-qty">
            <span className="btn-addCart-title">Cantidad:</span>
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
          <button className="btn btn-text btn-blue btn-m" onClick={addToCart}>
            <i className="fa-solid fa-cart-shopping"></i>
            Agregar al carrito
          </button>
        </div>}
    </>
  )
}
