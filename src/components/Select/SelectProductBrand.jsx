import { useState } from "react"
import { Select, SelectAddItem, SelectItem, SelectSearch } from "../index.js"
import { addBrand } from "../../services/post.js"

export const SelectProductBrand = ({selected,category, ...props}) => {
  const [searchBrand, setSearchBrand] = useState('')
  const [newBrand, setNewBrand] = useState('')
  const {brands} = category

  const submitAddbrand = e => {
    e.preventDefault()
    addBrand(category,newBrand)
    setNewBrand('')
  }

  const brand = searchBrand ? brands.filter(e => e.toLowerCase().includes(searchBrand.toLowerCase())) : brands

  return (
    <Select label="Marca" selected={selected}>
      <SelectSearch 
      name='searchBrand' 
      placeholder="Buscar marca" 
      onChange={({target: {value}}) => setSearchBrand(value)} 
      />
      {brand.map((e,i) => <SelectItem key={i} name='brand' id={e} {...props} >{e}</SelectItem>)}
      <SelectAddItem 
      name='addBrand' 
      placeholder='Agregar marca'
      value={newBrand}
      onChange={({target: {value}}) => setNewBrand(value)}
      act={submitAddbrand}
      />
    </Select>
  )
}
