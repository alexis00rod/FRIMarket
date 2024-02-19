import { useState } from "react"
import { Select, SelectAddItem, SelectItem, SelectSearch } from "../index.js"
import { addBrand } from "../../services/post.js"

export const SelectProductBrand = ({selected,category, ...props}) => {
  const [searchBrand, setSearchBrand] = useState('')
  const [newBrand, setNewBrand] = useState('')

  const submitAddbrand = e => {
    e.preventDefault()
    addBrand(category,newBrand)
    setNewBrand('')
    console.log()
  }

  const filterBrands = () => searchBrand ? category.brands.filter(e => e.toLowerCase().includes(searchBrand.toLowerCase())) : category.brands

  return (
    <Select selected={selected}>
      <SelectSearch 
      name='searchBrand' 
      placeholder="Buscar marca" 
      onChange={({target: {value}}) => setSearchBrand(value)} 
      />
      {category && filterBrands().map((e,i) => <SelectItem key={i} name='brand' id={e} {...props} >{e}</SelectItem>)}
      {/* {brand.map((e,i) => <SelectItem key={i} name='brand' id={e} {...props} >{e}</SelectItem>)} */}
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
