import { useCartContext } from "../../context/CartContext/CartContext.jsx"
import { InputProductQty, Button } from "../index.js"

export const CartProductCard = ({product}) => {
  const {id,name,price,stock,thumb,qty} = product
  const {removeProductToCartList, addProduct, removeProduct} = useCartContext()

  return (
    <div className='cartCard'>
      <figure className="cartCard-thumb">
        <img src={thumb} alt={name} />
      </figure>
      <div className="cartCard-body ">
        <div className="cartCard-detail">
          <h4 className="font-medium line-clamp-1">{name}</h4>
          <h4 className="text-yellow-500 text-lg font-medium">${price}</h4>
          <Button color='btn-text-red' size='btn-m' style='btn-text' onClick={() => removeProductToCartList(id)}>
            <span className="text-sm font-medium">Borrar</span>
          </Button>
        </div>
        <InputProductQty 
        qty={qty}
        stock={stock}
        flex='flex-col-reverse md:flex-row' 
        left={() => removeProduct(product)} 
        right={() => addProduct(product)} 
        />
      </div>
    </div>
  )
}
