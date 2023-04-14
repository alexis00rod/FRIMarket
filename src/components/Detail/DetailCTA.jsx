import { useState } from 'react'
import { useCartContext } from '../../context/CartContext/CartContext'
import { BtnAddCart, BtnAddWishlist, BtnShare, InputProductQty, BtnBuyNow, Element } from '../index.js'

export const DetailCTA = ({product}) => {
  const [qtyProducts, setQtyProducts] = useState(1)
  const {cartList, addProduct, removeProduct} = useCartContext()
  const {id,stock} = product

  const productInCart = cartList.find(e => e.id === id)

  const handleAddQty = () => {
    productInCart
    ? addProduct(productInCart)
    : setQtyProducts(qtyProducts + 1)
  }
  
  const handleRemoveQty = () => {
    productInCart
    ? removeProduct(productInCart)
    : setQtyProducts(qtyProducts - 1)
  }

  return (
    <>
      <div className="box-body hidden lg:flex items-end gap-4">
        <div className="flex-col">
          <span className='px-2 text-sm font-medium'>Cantidad</span>
          <InputProductQty 
          qty={productInCart ? productInCart.qty : qtyProducts} 
          stock={stock}
          left={handleRemoveQty}
          right={handleAddQty}
          onChange={({target: {value}}) => setQtyProducts(value)}
          />
        </div>
        <BtnAddCart product={product} qty={qtyProducts} size='btn-m' />
        <BtnBuyNow />
      </div>
      <div className="box-body flex flex-wrap md:gap-4">
        <BtnAddWishlist product={product} size='btn-m' />
        <BtnShare />
      </div>
      <Element position='fixed left-0 bottom-0 z-10 lg:hidden' flex='justify-center items-end gap-4'>
        <div className="flex flex-col">
          <span className='px-2 text-sm font-medium'>Cantidad</span>
          <InputProductQty 
          qty={productInCart ? productInCart.qty : qtyProducts} 
          stock={stock}
          left={handleRemoveQty}
          right={handleAddQty}
          onChange={({target: {value}}) => setQtyProducts(value)}
          />
        </div>
        <BtnAddCart product={product} qty={qtyProducts} size='btn-s' />
        <BtnBuyNow />
      </Element>
    </>
  )
}
