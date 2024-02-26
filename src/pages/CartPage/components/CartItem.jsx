import { formatPrice } from "../../../services/format"
import { useCartContext } from "../../../context/CartContext/CartContext"

export const CartItem = ({product}) => {
  const {removeProductToCartList, removeProduct, addProduct} = useCartContext()
  const {title, images, price, qty, stock} = product

  return (
    <div className='w-full px-2 first:pt-2 py-4 flex'>
      <img 
      src={images[0].url} 
      alt={images[0].name} 
      className="w-[50px] h-[50px] flex flex-none border border-gray-300 object-cover rounded-md" 
      />
      <div className="ml-2 flex flex-col grow">
        <h4 className="px-2 font-medium capitalize line-clamp-1">{title.join(' ')}</h4>
        <h5 className="px-2 text-yellow-500 text-lg font-medium">${formatPrice(price)}</h5>
        <button className="btn btn-m btn-text btn-text-red" onClick={() => removeProductToCartList(product)}>
          <span className="text-sm font-medium">Borrar</span>
        </button>
      </div>
      <div className="w-max h-max flex flex-col lg:flex-row flex-none border border-gray-300 rounded-md overflow-hidden">
        <button className="btn btn-s btn-gray" disabled={qty <= 1} onClick={() => removeProduct(product)} >
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className="w-[40px] h-[40px] flex items-center justify-center flex-none">{qty}</span>
        <button className="btn btn-s btn-gray" disabled={qty >= stock} onClick={() => addProduct(product)} >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}
