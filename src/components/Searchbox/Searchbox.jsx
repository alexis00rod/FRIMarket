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
    <div className="searchbox">
      <form onSubmit={searchProduct}>
        <input 
        type="text" 
        name="search" 
        onChange={({target:{value}}) => setToSearch(value)}
        />
        <button 
        type="submit" 
        className="btn btn-gray btn-search"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  )
}
