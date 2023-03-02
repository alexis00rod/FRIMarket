import { useState, useEffect } from 'react'

export const PostType = ({selected, category, ...props}) => {
  const [dropDown, setDropDown] = useState(false)

  useEffect(() => {
    setDropDown(false)
  },[selected])

  const handleDropDown = e => {
    e.preventDefault()
    setDropDown(!dropDown)
  }

  return (
    <div className="px-2 py-2 flex flex-col">
      <span className="px-1 text-sm font-medium">Tipo:</span>
      <div className="relative w-full max-w-xs h-8">
        <button 
        className={`w-full h-full flex border border-gray-300 ${dropDown ? 'rounded-t-md' : 'rounded-md'}`} 
        onClick={handleDropDown}
        >
          <span className='h-full px-2 flex items-center grow capitalize'>{selected}</span>
          <i className={`w-8 h-full flex items-center justify-center fa-solid fa-chevron-${dropDown ? 'up' : 'down'}`}></i>
        </button>
        {dropDown &&
        <ul 
        className='absolute top-full left-0 z-10 w-full h-max flex flex-col bg-white border-x border-b border-gray-300 rounded-b-md shadow-md overflow-hidden'>
          {category.types.map(e => (
            <li key={e} className='w-full h-8' >
              <input type="radio" name="type" id={e} className='hidden' {...props} />
              <label 
              htmlFor={e}
              className='w-full h-full px-2 flex items-center text-sm capitalize hover:bg-gray-100 cursor-pointer'
              >
                {e}
              </label>
            </li>
          ))}
        </ul>}
      </div>
    </div>
  )
}
