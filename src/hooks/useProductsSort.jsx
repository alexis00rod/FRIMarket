import {useState} from 'react'

export const useProductsSort = () => {
  const [productsSort, setProductsSort] = useState('postDate')
  
  return {productsSort, setProductsSort}
}
