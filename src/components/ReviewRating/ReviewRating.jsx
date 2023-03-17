import { useEffect, useState } from "react"

export const ReviewRating = ({initial,obs}) => {
  const [rating, setRating] = useState(0)
  
  const handleRating = (e,i) => {
    e.preventDefault()
    setRating(rating === i ? rating - 1 : i)
  }
  
  useEffect(() => {
    obs({...initial,rating: rating})
  },[rating])

  return (
    <div className="px-2 py-2 flex flex-col">
      <span htmlFor="rating" className='px-1 text-sm font-medium'>Calificacion</span>
      <div className="w-max px-1 py-1 flex gap-1">
        {[...Array(5)].map((star,index) => {
          index += 1
          return (
            <button
            key={index}
            onClick={e => handleRating(e,index)}
            className={`text-lg text-gray-500 ${index <= rating && 'text-yellow-500'}`}
            >
              <i className="fa-solid fa-star"></i>
            </button>
          )
        })}
      </div>
    </div>
  )
}
