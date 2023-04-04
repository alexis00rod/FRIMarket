export const ReviewRating = ({reviews}) => {
  const ratings = reviews.reduce((a, b) => {
    return a.rating + b.rating
  })

  // console.log(ratings)


  return (
    <div className="w-full max-w-xs px-2 py-2 flex flex-none gap-2 text-yellow-500">
      {/* <span className='text-5xl font-medium'>{reviews.length === 1 ? reviews[0].rating.toFixed(2) : ratings / reviews.length.toFixed(2)}</span> */}
      <div className="flex flex-col">
        <div className="py-1 flex gap-1 text-yellow-500">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
        {/* <span className='text-sm text-gray-500'>{reviews.length} calificacion</span> */}
      </div>
    </div>
  )
}
