import { useState } from 'react'
import { useCartContext } from '../../context/CartContext/CartContext'
import { Button, BtnAddCart, BtnAddWishlist, BtnShare, InputProductQty } from '../index.js'

export const DetailCTA = ({product}) => {
  const [qtyProducts, setQtyProducts] = useState(1)
  const {cartList} = useCartContext()
  const {id,stock} = product

  const productInCart = cartList.find(e => e.id === id)

  return (
    <div className="fixed left-0 bottom-0 z-20 xl:static box flex justify-center xl:justify-start flex-wrap gap-4">
      <div className="w-max px-2 py-2 flex flex-col">
        <span className='px-2 text-sm font-medium'>Cantidad: </span>
          <InputProductQty />
        {/* <div className="flex items-center">
          <Button 
          icon='chevron-down' 
          color='btn-gray' 
          size='btn-s' 
          onClick={() => setQtyProducts(qtyProducts - 1)} 
          disabled={qtyProducts === 1} 
          />
          <span className='w-8 h-8 flex items-center justify-center'>
            {productInCart
            ? productInCart.qty
            : qtyProducts}
          </span>
          <Button 
          icon='chevron-up' 
          color='btn-gray' 
          size='btn-s' 
          onClick={() => stock > qtyProducts && setQtyProducts(qtyProducts + 1)} 
          disabled={stock <= qtyProducts || cartList.find(e => e.id === id)?.qty >= stock} 
          />
        </div> */}
      </div>
      <div className="w-max px-2 py-2 flex justify-center items-center gap-2">
        <BtnAddCart product={product} qty={qtyProducts} size='btn-m' />
        <BtnAddWishlist product={product} size='btn-s' />
        <BtnShare size='btn-s' />
      </div>
    </div>
  )
}
