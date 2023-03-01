import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext/CartContext'

export const CartProduct = ({product}) => {
  const {id,name, thumb, price,qty,stock} = product
  const {removeProductToCartList,addProduct, removeProduct} = useCartContext()

  return (
    <tr className="divide-x divide-gray-300">
      <td className="px-2 py-2 flex">
        <figure className="w-20 h-20 px-1 py-1 flex items-center justify-center border border-gray-300 rounded-md">
          <img src={thumb} alt={name}/>
        </figure>
        <div className="px-2 grow">
          <Link to={`/product/${id}`}>
            <h4 className="px-2 py-1 mb-1 font-medium">{name}</h4>
          </Link>
          <button
          className="px-2 h-8 text-sm text-red-500 font-medium hover:underline"
          onClick={() => removeProductToCartList(id)}
          >
            Borrar
          </button>
        </div>
      </td>
      <td className="px-2 py-2 text-yellow-500">
        <span className="flex items-center justify-center">${price}</span>
      </td>
      <td className="px-2 py-2">
        <div className="w-max mx-auto flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400'
            onClick={() => removeProduct(product)}
            disabled={qty === 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className='w-8 h-8 flex items-center justify-center'>{qty}</span>
            <button 
            className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400'
            onClick={() => addProduct(product)}
            disabled={qty >= stock}
            >
              <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </td>
      <td className="px-2 py-2 text-yellow-500">
        <span className="flex items-center justify-center">${price * qty}</span>
      </td>
    </tr>
  )
}
