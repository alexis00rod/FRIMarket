import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BtnAddCart, BtnAddWishlist, EditProduct, Loader, ProductDetailDate, ProductDetailLocation, ProductDetailUser, ProductReviews, ProductsDetailSimilar } from '../../components'
import { useAuthContext } from '../../context/AuthContext/AuthContext'
import { useCartContext } from '../../context/CartContext/CartContext'
import { getProductDetail } from '../../services/firestore'

export const ProductDetail = () => {
  const {userLogged} = useAuthContext()
  const {cartList} = useCartContext()
  const {idProduct} = useParams()
  const [productDetail, setProductDetail] = useState()
  const [qtyProducts, setQtyProducts] = useState(1)
  const [editProduct, setEditProduct] = useState(false)
  
  useEffect(() => {
    getProductDetail(idProduct,setProductDetail)
  },[idProduct])

  if(!productDetail) return <Loader />
  
  const {id,name,thumb,description,brand,stock,price,type,category,province,timestamp, idUser} = productDetail
  const productInCart = cartList.find(e => e.id === id)

  return (
    <div className="w-full flex flex-col gap-2">
      <section className='px-2 py-2 w-full flex flex-col gap-4'>
        <div className="w-full flex gap-4">
          <div className="w-full max-w-screen-md flex flex-col items-center flex-none gap-4">
            <figure className='w-full flex items-center justify-center border border-gray-300 rounded-md'>
              <img src={thumb} alt={name} className='w-full' />
            </figure>
            {/* Detail description */}
            <div className="w-full px-2 py-2 bg-white border border-gray-300 rounded-md divide-y divide-gray-300">
              <h4 className='w-full px-2 py-2 text-xl font-medium'>Descripcion</h4>
              <div className="px-2 pt-2 flex flex-col gap-2">
                {/* Descrition */}
                <p className=" text-sm line-clamp-6">{description}</p>
                <div className="flex flex-col">
                  {/* Brand */}
                  <p className='flex items-center gap-2 capitalize'>
                    <span className='font-medium'>Marca: </span>{brand}
                  </p>
                  {/* type */}
                  <p className='flex items-center gap-2 capitalize'>
                    <span className='font-medium'>Tipo: </span>{type}
                  </p>
                  {/* Stock */}
                  <p className='flex items-center gap-2 capitalize'>
                    <span className='font-medium'>Disponibilidad:</span> 
                    <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock}
                      <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col grow gap-4">
            <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
              {/* Detail name */}
              <div className="px-2 py-2 flex items-center">
                <h2 className='flex grow text-2xl font-medium line-clamp-1'>{name}</h2>
                {userLogged && userLogged.email === idUser &&
                <button 
                className='w-8 h-8 flex items-center justify-center hover:text-yellow-500' 
                title='Editar producto'
                onClick={() => setEditProduct(true)}
                >
                  <i className="fa solid fa-pen"></i>
                </button>
                }
              </div>
              <div className="w-full px-2 pt-2 flex flex-col gap-2">
                {/* Detail price */}
                <h3 className='pt-2 pb-1 grow text-3xl text-yellow-500 font-medium'>${price}</h3>
                <div className="w-full flex flex-col">
                  <ProductDetailLocation location={province} />
                  <ProductDetailDate date={timestamp} />
                </div>
              </div>
            </div>
            {/* Detail cta */}
            <div className="w-full px-2 py-2 flex items-center gap-2 bg-white border border-gray-300 rounded-md">
              <div className="w-max px-2 py-2 flex items-center gap-2">
                <span className='text-lg font-medium'>Cantidad: </span>
                <div className="w-max flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400'
                    onClick={() => setQtyProducts(qtyProducts - 1)}
                    disabled={qtyProducts === 1}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className='w-8 h-8 flex items-center justify-center'>
                      {productInCart
                      ? productInCart.qty
                      : qtyProducts}
                    </span>
                    <button 
                    className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 disabled:bg-gray-100 disabled:text-gray-400'
                    onClick={() => stock > qtyProducts && setQtyProducts(qtyProducts + 1)}
                    disabled={stock <= qtyProducts || cartList.find(e => e.id === id)?.qty >= stock}
                    >
                      <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              {/* Add to cartlist */}
              <BtnAddCart product={productDetail} qty={qtyProducts} />
              {/* Add to wishlist */}
              <BtnAddWishlist product={productDetail} />
              {/* Share */}
              <button className="w-max h-8 px-2 flex items-center gap-2 bg-yellow-500 text-white rounded-md">
                <i className="fa-solid fa-share"></i>
                <span className="text-sm">Compartir</span>
              </button>
            </div>
            {/* Detail user */}
            <ProductDetailUser user={idUser} />
          </div>
        </div>
        <ProductReviews product={id} />
        <ProductsDetailSimilar type={type} />
        {editProduct && <EditProduct product={productDetail} handle={setEditProduct} />}
      </section>
    </div>
  )
}
