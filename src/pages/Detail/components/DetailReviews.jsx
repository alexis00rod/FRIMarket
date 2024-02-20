import { useEffect, useState } from "react"
import { getProductReviews } from "../../../services/review.js"
import { Select, SelectItem } from "../../../components/index.js"
import moment from "moment"

export const DetailReviews = ({product}) => {
  const [reviews, setReviews] = useState()
  const [reviewsSort, setReviewsSort] = useState('new')

  useEffect(() => {
    getProductReviews(product,reviewsSort,setReviews)
  },[product,reviewsSort])

  const reviewsSortsOptions = [
    {id:'highRating',title:'Calificacion: mas alta'},
    {id:'lowRating',title:'Calificacion: mas baja'},
    {id:'new',title:'Mas nuevos'},
    {id:'old',title:'Mas antiguos'},
  ]

  if(reviews && !reviews.length) return <p className="px-2">No hay opiniones sobre el producto</p>

  if(reviews) {
    return (
      <div className="w-full flex flex-col lg:flex-row">
        {/* Puntuacion */}
        <div className="w-full max-w-md mb-4 flex px-2 text-yellow-500">
          <span className='mr-2 text-5xl font-medium'>{((reviews.map(e => e.rating).reduce((a,b) => a + b)) / reviews.length).toFixed(1)}</span>
          <div className="flex flex-col">
            <div className="py-1 flex gap-1 text-yellow-500">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <span className='text-sm text-gray-500'>{reviews.length} {reviews.length > 1 ? 'calificaciones' : 'calificacion'}</span>
          </div>
        </div>
        <div className="flex flex-col">
          {/* Ordenar opiniones */}
          <Select label='Ordernar por' selected={reviewsSortsOptions.find(e => e.id === reviewsSort).title}>
            {reviewsSortsOptions.map(e => 
              <SelectItem
              key={e.id}
              id={e.id}
              name='reviewsSort'
              onChange={({target:{id}}) => setReviewsSort(id)}
              >
                {e.title}
              </SelectItem>)}
          </Select>
          {/* Opiniones */}
          <div className="mt-4 flex flex-col grow divide-y divide-slate-300">
            {reviews.map(review => 
              <div key={review.id} className="pt-2 mb-2 w-full px-2">
                <div className="mb-1 flex justify-between text-xs">
                  <div className="flex">
                    {[1,2,3,4,5].map((star,i) => <i key={i} className={`${review.rating > i ? 'text-yellow-500' : 'text-gray-300'} fa-solid fa-star`}></i>)}
                  </div>
                  <span className="text-slate-500">{moment(review.date.toDate()).fromNow()}</span>
                </div>
                <p className="text-sm line-clamp-2">{review.body}</p>
              </div>)}
          </div>
        </div>
      </div>
    )
  }
}
