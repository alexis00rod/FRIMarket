import { usePostContext } from "../context/PostContext"
import { formatNumber, formatPrice } from "../../../services/format"
import { useState } from "react"

export const PostPrice = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {price} = productToPost

  const [formattedPrice, setFormattedPrice] = useState(formatPrice(price) || '')

  const handlePrice = ({target: {value}}) => {
    setFormattedPrice(formatPrice(value))
    setProductToPost({
      ...productToPost,
      price: formatNumber(value)
    })
  }

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Precio:</h3>
      <div className="relative">
        <div className="w-[11.25rem] h-8 flex items-center border border-gray-300 rounded-md overflow-hidden">
          <span className="w-[1.5rem] flex justify-center flex-none text-gray-300">
            $
          </span>
          <input
            type="text"
            name="price"
            id="price"
            value={formattedPrice}
            onChange={handlePrice}
            className="h-full grow outline-none text-sm line-clamp-1"
          />
        </div>
        {productToPostError.includes('price')  &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega el precio del producto</span>
          </p>}
      </div>
    </div>
  )
}
