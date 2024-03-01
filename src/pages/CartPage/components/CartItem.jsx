import { useCartContext } from "../../../context/CartContext/CartContext"
import { formatPrice } from "../../../services/format"

export const CartItem = ({product}) => {
  const {removeProductToCartList, removeProduct, addProduct} = useCartContext()
  const {title, images, price, qty, stock} = product

  return (
    <div className='cart-item'>
      {/* Imagen */}
      <img 
      src={images[0].url} 
      alt={images[0].name} 
      className="cart-item-img" 
      />
      <div className="cart-item-detail">
        {/* Nombre */}
        <h4 className="cart-item-detail-name">{title.join(' ')}</h4>
        {/* Precio */}
        <h5 className="cart-item-detail-price">${formatPrice(price)}</h5>
        {/* Borrar de carrito */}
        <button className="btn btn-m btn-text btn-text-red" onClick={() => removeProductToCartList(product)}>Borrar</button>
      </div>
      {/* Control de cantidad */}
      <div className="cart-item-controls">
        {/* Eliminar cantidad */}
        <button className="btn btn-s btn-gray" disabled={qty <= 1} onClick={() => removeProduct(product)} >
          <i className="fa-solid fa-minus"></i>
        </button>
        {/* Agregar cantidad */}
        <span className="cart-item-controls-qty">{qty}</span>
        <button className="btn btn-s btn-gray" disabled={qty >= stock} onClick={() => addProduct(product)} >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}
