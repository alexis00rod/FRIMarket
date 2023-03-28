import { useEffect, useState } from "react"
import { useGeo } from "../../hooks/useGeo"

export const SelectProvince = ({selected, ...props}) => {
  const [dropDown, setDropDown] = useState(false)
  const {provinces} = useGeo()

  useEffect(() => {
    setDropDown(false)
  },[selected])

  const handleDropDown = e => {
    e.preventDefault()
    setDropDown(!dropDown)
  }

  return (
    <div className="w-full px-2 py-2 flex flex-col">
      <span className="px-1 text-sm font-medium">Provincia:</span>
      <div className="relative w-full h-8">
        <button 
        className={`w-full h-full flex border border-gray-300 ${dropDown ? 'rounded-t-md' : 'rounded-md'}`} 
        onClick={handleDropDown}
        >
          <span className='h-full px-2 flex items-center grow capitalize'>
            {selected && provinces && provinces.find(e => e.id === selected)?.nombre}
          </span>
          <i className={`w-8 h-full flex items-center justify-center fa-solid fa-chevron-${dropDown ? 'up' : 'down'}`}></i>
        </button>
        {dropDown &&
        <ul 
        className='absolute top-full left-0 z-10 w-full h-48 flex flex-col bg-white border-x border-b border-gray-300 rounded-b-md shadow-md overflow-y-scroll '>
          {provinces && 
          provinces.map(e => (
            <li key={e.id} className='w-full h-8 flex items-center flex-none'>
              <input type="radio" name="province" id={e.id} className='hidden' {...props} />
              <label 
              htmlFor={e.id}
              className='w-full h-full px-2 flex items-center text-sm capitalize hover:bg-gray-100 cursor-pointer truncate'
              >
                {e.nombre}
              </label>
            </li>
          ))}
        </ul>}
      </div>
    </div>
  )
}
