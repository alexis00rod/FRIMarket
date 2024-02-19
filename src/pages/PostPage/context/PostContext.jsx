import {useState, createContext, useContext} from 'react'

const PostContext = createContext()
export const usePostContext = () => useContext(PostContext)

export const PostContextProvider = ({children}) => {
  const [productToPost, setProductToPost] = useState({
    title: '',
    images: [],
    category: '',
    type: '',
    brand: '',
    condition: '',
    stock: 1,
    price: '',
    shipping: '',
    user: {
      name: '',
      email: '',
      province: {
        id: '',
        name: ''
      },
      city: {
        id: '',
        name: ''
      },
      phone: ''
    }
  })
  const [productToPostError, setProductToPostError] = useState([])

  const validateProduct = () => {
    const err = []

    !productToPost.title && err.push('title')

    setProductToPostError(err)
    return !err.length
  }

  const validateDetail = () => {
    const err = []

    !productToPost.title && err.push('title')
    !productToPost.type && err.push('type')
    !productToPost.description && err.push('description')
    !productToPost.condition && err.push('condition')
    !productToPost.brand && err.push('brand')

    setProductToPostError(err)
    return !err.length
  }

  const validateSale = () => {
    const err = []

    !productToPost.price && err.push('price')
    !productToPost.shipping && err.push('shipping')

    setProductToPostError(err)
    return !err.length
  }

  const validateContact = () => {
    const err = []
    
    !productToPost.user.name && err.push('name')
    !productToPost.user.email && err.push('email')
    !productToPost.user.phone && err.push('phone')
    !productToPost.user.city.id && err.push('city')

    setProductToPostError(err)
    return !err.length
  }

  return (
    <PostContext.Provider value={{productToPost,setProductToPost,productToPostError,validateProduct,validateDetail,validateSale,validateContact}}>
      {children}
    </PostContext.Provider>
  )
}