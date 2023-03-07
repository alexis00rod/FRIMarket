import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BtnAddCart, Loader } from '../../components'
import { useCartContext } from '../../context/CartContext/CartContext'
import { getProductDetail, getUserById } from '../../services/firestore'

export const ProductDetail = () => {
  const {idProduct} = useParams()
  const {cartList} = useCartContext()
  const [productDetail, setProductDetail] = useState({})
  const [loader, setLoader] = useState(false)
  const [qtyProducts, setQtyProducts] = useState(1)
  const {id,name,thumb,description,brand,stock,price,type,category, idUser} = productDetail

  useEffect(() => {
    getProductDetail(idProduct)
    .then(resp => setProductDetail({
      id: resp.id,
      ...resp.data()
    }))
    .finally(() => setLoader(true))
    
  },[idProduct])

  const productInCart = cartList.find(e => e.id === id)

  if(!loader) return <Loader />

  return (
    <div className="w-full flex flex-col gap-2">
      <section className='w-full flex gap-2'>
        <div className="w-full max-w-screen-sm px-2 py-2 flex flex-col items-center flex-none gap-2">
          <figure className='w-full flex items-center justify-center border border-gray-300 rounded-md'>
            <img src={thumb} alt={name} className='w-full' />
          </figure>
          <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 rounded-md">
            <h4 className='px-2 py-2 text-2xl font-medium'>Descripcion:</h4>
            <div className="px-2 py-2 flex flex-col gap-2">
              <p className="mb-2 text-sm line-clamp-6">{description}</p>
              <div className="flex flex-col gap-1">
                <p className='flex items-center gap-2 capitalize'>
                  <span className='text-lg font-medium'>Marca: </span>{brand}
                </p>
                <p className='flex items-center gap-2 capitalize'>
                  <span className='text-lg font-medium'>Tipo: </span>{type}
                </p>
                <p className='flex items-center gap-2 capitalize'>
                  <span className='text-lg font-medium'>Disponibilidad:</span> 
                  <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock}
                    <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 py-2 flex flex-col grow gap-2">
          <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 rounded-md">
            <h2 className='px-2 py-2 text-3xl font-medium'>{name}</h2>
            <h3 className='px-2 py-2 text-3xl text-yellow-500 font-medium'>${price}</h3>
            <div className="px-2 py-2 flex items-center gap-2 divide-x divide-gray-300">
              <div className="h-full flex items-center text-sm text-yellow-500">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <span className='h-full px-2 flex items-center'>x Reseñas</span>
              <button className='h-full px-2 flex items-center gap-2 text-sm text-gray-700'>
                <i className="fa-solid fa-pen"></i>
                <span>Escribir reseña</span>
              </button>
            </div>
          </div>
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
            <BtnAddCart product={productDetail} qty={qtyProducts} />
            <button className="w-max h-8 px-2 flex items-center gap-2 bg-red-500 text-white rounded-md">
              <i className="fa-solid fa-heart"></i>
              <span className="text-sm">Agregar a favoritos</span>
            </button>
            <button className="w-max h-8 px-2 flex items-center gap-2 bg-yellow-500 text-white rounded-md">
              <i className="fa-solid fa-share"></i>
              <span className="text-sm">Compartir</span>
            </button>
          </div>
          <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 rounded-md">
            <h4 className='px-2 py-2 text-2xl font-medium'>Publicado por:</h4>
            <Link to={`/profile/${idUser}`} 
            className='px-2 py-2 w-max flex items-center gap-2 hover:text-yellow-500'
            >
              <i className="w-10 h-10 flex items-center justify-center fa-solid fa-user"></i>
              <span className='font-medium'>{idUser}</span>
            </Link>
          </div>
          <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 rounded-md">
            <h4 className='px-2 py-2 text-2xl font-medium'>Publicado en</h4>
            {/* <span>Buenos Aires</span> */}
          </div>
        </div>
      </section>
    </div>
  )
}
