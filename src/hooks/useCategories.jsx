import { useState, useEffect } from 'react'
import { getCategories } from '../services/categories.js'

export const useCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories(setCategories)
  },[])

  return {categories}
}
