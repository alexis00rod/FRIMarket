import { useState } from "react"
import { usePostContext } from "../context/PostContext"
import { formatNumber, formatPrice } from "../../../services/format"
import { InputPrice, Notification } from "../../../components"

export const PostPrice = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {price} = productToPost

  const [formattedPrice, setFormattedPrice] = useState(price ? formatPrice(price) : '')

  const handlePrice = ({target: {value}}) => {
    setFormattedPrice(formatPrice(value))
    setProductToPost({
      ...productToPost,
      price: formatNumber(value)
    })
  }

  return (
    <div className="post-input">
      <h3>Precio:</h3>
      <InputPrice 
      id="price"
      value={formattedPrice}
      onChange={handlePrice} 
      />
      {productToPostError.includes('price')  &&
        <Notification message='Agrega el precio del producto'/>}
    </div>
  )
}
