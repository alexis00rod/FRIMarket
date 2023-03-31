import {useState, useEffect} from 'react'

export const InputRating = ({initial,obs}) => {
  const [rating, setRating] = useState(0)
  
  const handleRating = (e,i) => {
    e.preventDefault()
    setRating(rating === i ? rating - 1 : i)
  }
  
  useEffect(() => {
    obs({...initial,rating: rating})
  },[rating])

  return (
    <div className="input">
      <span className='input-label'>Calificacion</span>
      <div className="w-max flex gap-1">
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
