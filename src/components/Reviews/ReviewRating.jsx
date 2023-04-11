export const ReviewRating = ({reviews}) => {
  let rating
  if(reviews.length === 0) return <p className="w-full max-w-xs px-2 pt-4 pb-2 text-center md:text-left">No hay reseñas</p>
  if(reviews.length > 0) rating = ((reviews.map(e => e.rating).reduce((a,b) => a + b)) / reviews.length).toFixed(1)

  return (
    <div className="w-full max-w-xs px-2 pt-4 pb-2 flex justify-center flex-none gap-2 text-yellow-500">
      <span className='text-5xl font-medium'>{rating}</span>
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
  )
}
