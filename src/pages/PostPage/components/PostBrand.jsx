import { useState } from 'react'
import { Select, SelectAddItem, SelectItem, SelectSearch } from '../../../components'
import { usePostContext } from '../context/PostContext'
import { addBrand } from '../../../services/post'

export const PostBrand = ({category}) => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const [searchBrand, setSearchBrand] = useState('')
  const [addNewBrand, setAddNewBrand] = useState('')
  const {brand} = productToPost

  const submitAddbrand = async e => {
    e.preventDefault()
    try {
      await addBrand(category,addNewBrand)
      setProductToPost({...productToPost,brand:addNewBrand})
    } catch(err) {
      console.log(err)
    }
    setAddNewBrand('')
  }

  const filterBrands = () => searchBrand ? category.brands.filter(e => e.toLowerCase().includes(searchBrand.toLowerCase())) : category.brands

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Marca:</h3>
      <div className="relative">
        <Select selected={brand || ''}>
          <SelectSearch
          name='searchBrand' 
          placeholder="Buscar marca" 
          onChange={({target: {value}}) => setSearchBrand(value)} 
          />
          {category && filterBrands().map((brand,i) => 
            <SelectItem
            key={i}
            name='brand'
            id={brand}
            onChange={({target:{id}}) => setProductToPost({...productToPost,brand:id})}
            >
              {brand}
            </SelectItem>)}
          <SelectAddItem
          name='addBrand' 
          placeholder='Agregar marca'
          value={addNewBrand}
          onChange={({target: {value}}) => setAddNewBrand(value)}
          act={submitAddbrand}
          />
        </Select>
        {productToPostError.includes('brand')  &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega a que marca pertenece el producto</span>
          </p>}
      </div>
    </div>
  )
}
