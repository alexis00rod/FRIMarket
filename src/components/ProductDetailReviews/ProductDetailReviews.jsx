import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext/AuthContext'
import { addReview, getProductReviews } from '../../services/firestore'
import { ReviewCard } from '../index.js'

export const ProductDetailReviews = ({product}) => {
  const {userLogged} = useAuthContext()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
  const [writeReview, setWriteReview] = useState(false)
  const [review, setReview] = useState({})

  useEffect(() => {
    getProductReviews(product,setReviews)
  },[product])

  const handleWriteReview = () => {
    userLogged
    ? setWriteReview(!writeReview)
    : navigate('/login')
  }

  const handleReview = ({target:{name,value}}) => {
    setReview({
      ...review,
      [name]: name === 'rating' ? parseFloat(value) : value
    })
  }

  const submitReview = e => {
    e.preventDefault()
    addReview(userLogged,product,review)
    setWriteReview(false)
  }

  return (
    <div className="w-full px-2 py-2 bg-white border border-gray-300 rounded-md divide-y divide-gray-300">
      <div className="w-full px-2 py-2 flex items-center">
        <h3 className='grow text-xl font-medium'>Reseñas</h3>
        <button 
        className='w-max px-2 flex items-center gap-2 hover:text-yellow-500' 
        onClick={handleWriteReview}
        >
          <i className="fa-solid fa-pen"></i>
          <span className='text-sm'>Escribir reseña</span>
        </button>
      </div>
      {writeReview
      ? <form className='w-full py-2 flex flex-col gap-2' onSubmit={submitReview}>
          <div className="px-2 py-2 flex flex-col">
            <label htmlFor="rating" className='px-1 text-sm font-medium'>Calificacion</label>
            <input 
            type="number" 
            name="rating" 
            id="rating" 
            min={0} 
            max={5} 
            className='w-max h-8 px-2 border border-gray-300 rounded-md outline-none'
            onChange={handleReview}
            />
          </div>
          <div className="px-2 py-2 flex flex-col">
            <label htmlFor="title" className='px-1 text-sm font-medium'>Titulo de la reseña</label>
            <input 
            type="text" 
            name="title" 
            id="title" 
            className='w-full max-w-lg h-8 px-2 border border-gray-300 rounded-md outline-none'
            onChange={handleReview}
            />
          </div>
          <div className="px-2 py-2 flex flex-col">
            <label htmlFor="body" className='px-1 text-sm font-medium'>Reseña</label>
            <textarea 
            name="body" 
            id="body" 
            className='w-full max-w-lg h-24 px-2 py-2 border border-gray-300 rounded-md outline-none resize-none' 
            onChange={handleReview}
            >
            </textarea>
          </div>
          <button className='w-full max-w-btn h-8 px-2 ml-2 mt-2 flex items-center justify-center gap-2 bg-green-500 text-white rounded-md'>
            <i className="fa-solid fa-check"></i>
            <span className="text-sm">Enviar reseña</span>
          </button>
        </form>
      : reviews.length > 0
        ? <div className='w-full flex gap-2'>
            <div className="h-max px-2 py-2 flex items-center flex-none text-yellow-500">
              <span className='px-1 py-1 text-5xl font-medium'>5.0</span>
              <div className="px-1 py-1">
                <div className="text-yellow-500">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <span className='text-sm text-gray-500'>{reviews.length} calificacion</span>
              </div>
            </div>
            <ul className="flex flex-col grow divide-y divide-gray-300">
              {reviews.map(e => <ReviewCard key={e.id} review={e} /> )}
            </ul>
          </div>
        : <div className='w-full px-2 pt-2'>
            <span>No hay reseñas</span>
          </div>}
    </div>
  )
}
