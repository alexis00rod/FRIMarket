import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../index.js"

export const InputSearch = () => {
  const [toSearch, setToSearch] = useState('')
  const navigate = useNavigate()

  const submitSearch = e => {
    e.preventDefault()
    navigate(`/search/${toSearch}`)
  }
  
  return (
    <form className="input-search" onSubmit={submitSearch} >
      <input 
      type="text" 
      name="search" 
      onChange={({target:{value}}) => setToSearch(value)}
      />
      <Button type='submit' icon='magnifying-glass' color='btn-gray' size='btn-s' />
    </form>
  )
}
