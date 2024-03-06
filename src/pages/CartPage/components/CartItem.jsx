import { useCartContext } from "../../../context/CartContext/CartContext"
import { formatPrice } from "../../../services/format"

export const CartItem = ({product}) => {
  const {removeProductToCartList, removeProduct, addProduct} = useCartContext()
  const {title, images, price, qty, stock} = product

  return (
    <li className="cart-item">
      <img src={images[0].url} alt={images[0].name} />
      <div className="ml-4 flex flex-col lg:flex-row grow">
        <div className="mb-1 flex flex-col grow">
          <h4>{title.join(' ')}</h4>
          <button 
          className="w-max text-sm text-red-500 duration-200 hover:text-red-700" 
          onClick={() => removeProductToCartList(product)}>
            Borrar
          </button>
        </div>
        <div className="flex justify-between">
          <div className="cart-item-controls">
            <button className="btn btn-s btn-gray" disabled={qty <= 1} onClick={() => removeProduct(product)} >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span>{qty}</span>
            <button className="btn btn-s btn-gray" disabled={qty >= stock} onClick={() => addProduct(product)} >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <h5>${formatPrice(price)}</h5>
        </div>
      </div>
    </li>
  )
}
