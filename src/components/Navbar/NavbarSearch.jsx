import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useNavbarContext } from "../../context/NavbarContext/NavbarContext"

export const NavbarSearch = () => {
  const [search, setSearch] = useState()
  const navigate = useNavigate()
  const {closeMenu} = useNavbarContext()

  const submitSearch = e => {
    e.preventDefault()
    closeMenu()
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
}
