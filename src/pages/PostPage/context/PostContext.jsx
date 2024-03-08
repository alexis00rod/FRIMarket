import {useState, createContext, useContext, useEffect} from 'react'

const PostContext = createContext()
export const usePostContext = () => useContext(PostContext)

export const PostContextProvider = ({children}) => {
  const [productToPost, setProductToPost] = useState(() => {
    const storedProductToPost = localStorage.getItem('productToPost')
    return storedProductToPost ? JSON.parse(storedProductToPost) : {}})

  useEffect(() => {
    localStorage.setItem('productToPost', JSON.stringify(productToPost))
  },[productToPost])

  const [productToPostError, setProductToPostError] = useState([])

  const validateProduct = () => {
    const err = []

    if (!productToPost || !productToPost.title || productToPost.title.length === 0 || (productToPost.title.length === 1 && productToPost.title[0] === '')) {
      err.push('title')
    }

    setProductToPostError(err)
    return !err.length
  }

  const validateDetail = () => {
    const err = []

    if (productToPost.title.length === 0 || (productToPost.title.length === 1 && productToPost.title[0] === '')) {
      err.push('title')
    }
    !productToPost.type && err.push('type')
    !productToPost.description && err.push('description')
    !productToPost.condition && err.push('condition')
    !productToPost.brand && err.push('brand')
    !productToPost.stock && err.push('stock')

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
    !productToPost.user.city?.id && err.push('city')

    setProductToPostError(err)
    return !err.length
  }

  return (
    <PostContext.Provider value={{productToPost,setProductToPost,productToPostError,validateProduct,validateDetail,validateSale,validateContact}}>
      {children}
    </PostContext.Provider>
  )
}
