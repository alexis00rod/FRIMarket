import { useState } from 'react'
import { usePostContext } from '../context/PostContext'
import { addBrand } from '../../../services/post'
import { Notification, Select, SelectAddItem, SelectItem, SelectSearch } from '../../../components'

export const PostBrand = ({category}) => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const [searchBrand, setSearchBrand] = useState('')
  const [addNewBrand, setAddNewBrand] = useState('')
  const {brand} = productToPost

  const submitAddbrand = async e => {
    e.preventDefault()
    try {
      const brandAdd = await addBrand(category,addNewBrand)
      setProductToPost({...productToPost,brand:brandAdd})
    } catch(err) {
      alert(err)
    }
    setAddNewBrand('')
  }

  const filterBrands = () => searchBrand ? category.brands.filter(e => e.toLowerCase().includes(searchBrand.toLowerCase())) : category.brands

  return (
    <div className="post-input">
      <h3>Marca:</h3>
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
        <Notification message='Agrega a que marca pertenece el producto'/>}
    </div>
  )
}
