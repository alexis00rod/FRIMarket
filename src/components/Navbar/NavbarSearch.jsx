import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { InputText } from "../Form/InputText"

export const NavbarSearch = () => {
  const [search, setSearch] = useState()
  const navigate = useNavigate()

  const submitSearch = e => {
    e.preventDefault()
    if(search) navigate(`/search/${search}`) 
  }

  return (
    <div className="navbar-search">
      <input 
      type="text" 
      name="search" 
      id="search" 
      value={search || ''}
      onChange={({target: {value}}) => setSearch(value)}
      className="navbar-search-input"
      placeholder={`${window.innerWidth >= 1024 ? 'Buscar productos, marcas y más...' : 'Buscar en FRIMarket'}`}
      />
      <button className="btn btn-gray btn-s" onClick={submitSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  )

  return (
    <div className="pl-2 flex justify-end grow">
      <div className="w-full lg:max-w-[600px] flex border border-gray-300 rounded-md overflow-hidden">
        <input 
        type="text" 
        name="search" 
        id="search" 
        value={search || ''}
        onChange={({target: {value}}) => setSearch(value)}
        className="px-2 grow text-sm outline-none"
        placeholder="Buscar productos, marcas y más..."
        />
        <button className="btn btn-gray btn-s" onClick={submitSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  )
}
