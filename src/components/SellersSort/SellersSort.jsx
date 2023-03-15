import {useState, useEffect} from 'react'

export const SellersSort = ({selected, ...props}) => {
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
    <div className="w-full max-w-sm px-2 py-2 flex flex-col">
      <span className="px-1 text-sm font-medium">Ordenar por:</span>
      <div className="relative w-full h-8">
        <button 
        className={`w-full h-full flex border border-gray-300 ${dropDown ? 'rounded-t-md' : 'rounded-md'}`} 
        onClick={handleDropDown}
        >
          <span className='h-full px-2 flex items-center grow'>
            {selected === 'sales'
              ? 'Mas ventas'
              : selected === 'posts'
                ? 'Mas publicaciones'
                : selected === 'new'
                  ? 'Mas nuevos'
                  : 'Mas antiguos'}
          </span>
          <i className={`w-8 h-full flex items-center justify-center fa-solid fa-chevron-${dropDown ? 'up' : 'down'}`}></i>
        </button>
        {dropDown &&
        <ul 
        className='absolute top-full left-0 z-10 w-full h-max flex flex-col bg-white border-x border-b border-gray-300 rounded-b-md shadow-md'>
          <SortOption id='new' name='Mas nuevos' />
          <SortOption id='old' name='Mas antiguos' />
          <SortOption id='posts' name='Mas publicaciones' />
          <SortOption id='sales' name='Mas ventas' />
        </ul>}
      </div>
    </div>
  )
}
