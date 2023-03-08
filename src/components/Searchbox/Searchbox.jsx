import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Searchbox = () => {
  const [toSearch, setToSearch] = useState('')
  const navigate = useNavigate()

  const searchProduct = e => {
    e.preventDefault()
    navigate(`/search/${toSearch}`)
  }

  return (
    <form 
    className="w-full max-w-3xl h-8 flex items-center border border-gray-300 rounded-md"
    onSubmit={searchProduct}
    >
      <input 
      type="text" 
      name="search" 
      className="h-full px-2 grow outline-none" 
      onChange={({target:{value}}) => setToSearch(value)}
      />
      <button type="submit" className="w-8 h-full flex items-center justify-center bg-gray-100 border-l border-gray-300">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  )
}
