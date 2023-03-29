import {useState} from 'react'
import { useCartContext } from '../../context/CartContext/CartContext'
import { BtnAddCart } from '../Button/BtnAddCart'
import { BtnAddWishlist } from '../Button/BtnAddWishlist'
import { BtnShare } from '../Button/BtnShare'
import { Button } from '../Button/Button'

export const DetailCTA = ({product}) => {
  const [qtyProducts, setQtyProducts] = useState(1)
  const {cartList} = useCartContext()
  const {id,stock} = product

  const productInCart = cartList.find(e => e.id === id)

  return (
    <div className="fixed left-0 bottom-0 xl:static box flex justify-center xl:justify-start flex-wrap">
      <div className="w-max px-2 py-2 flex justify-center items-center gap-2">
        <span className='w-max text-sm font-medium'>Cantidad: </span>
        <div className="w-max flex items-center">
          <Button icon='minus' color='btn-gray' onClick={() => setQtyProducts(qtyProducts - 1)} disabled={qtyProducts === 1} />
          <span className='w-8 h-8 flex items-center justify-center'>
            {productInCart
            ? productInCart.qty
            : qtyProducts}
          </span>
          <Button icon='plus' color='btn-gray' onClick={() => stock > qtyProducts && setQtyProducts(qtyProducts + 1)} disabled={stock <= qtyProducts || cartList.find(e => e.id === id)?.qty >= stock} />
        </div>
      </div>
      <div className="w-max px-2 py-2 flex justify-center items-center gap-2">
        <BtnAddCart product={product} qty={qtyProducts} />
        <BtnAddWishlist product={product} toggle />
        <BtnShare />
      </div>
    </div>
  )
}
