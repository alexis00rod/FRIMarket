import {useState, useEffect} from 'react'

export const ProductsSort = ({selected, ...props}) => {
  const [dropDown, setDropDown] = useState(false)

  useEffect(() => {
    setDropDown(false)
  },[selected])

  const handleDropDown = e => {
    e.preventDefault()
    setDropDown(!dropDown)
  }

  const SortOption = ({id,name}) => {
    return (
      <li className='w-full h-8 flex items-center flex-none'>
        <input 
          type="radio" 
          name="sort" 
          id={id} 
          className='hidden' 
          {...props} />
          <label 
          htmlFor={id}
          className='w-full h-full px-2 flex items-center text-sm capitalize hover:bg-gray-100 cursor-pointer truncate'
          >
            {name}
          </label>
      </li>
    )
  }

  return (
    <div className="w-full max-w-sm px-2 py-2 flex items-center gap-2">
      <span className="px-1 flex flex-none text-sm font-medium">Ordenar por:</span>
      <div className="relative w-full h-8">
        <button 
        className={`w-full h-full flex border border-gray-300 ${dropDown ? 'rounded-t-md' : 'rounded-md'}`} 
        onClick={handleDropDown}
        >
          <span className='h-full px-2 flex items-center grow'>
            {selected === 'highPrice'
              ? 'Precio: mas alto'
              : selected === 'lowPrice'
                ? 'Precio: mas bajo'
                : 'Fecha de publicacion'}
          </span>
          <i className={`w-8 h-full flex items-center justify-center fa-solid fa-chevron-${dropDown ? 'up' : 'down'}`}></i>
        </button>
        {dropDown &&
        <ul 
        className='absolute top-full left-0 z-10 w-full h-max flex flex-col bg-white border-x border-b border-gray-300 rounded-b-md shadow-md'>
          <SortOption id='highPrice' name='Precio: mas alto' />
          <SortOption id='lowPrice' name='Precio: mas bajo' />
          <SortOption id='postDate' name='Fecha de publicacion' />
        </ul>}
      </div>
    </div>
  )
}

