import { InputNumber } from "../../../components"
import { usePostContext } from "../context/PostContext"

export const PostStock = () => {
  const {productToPost,setProductToPost} = usePostContext()
  const {stock} = productToPost

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Stock:</h3>
      <div className="relative">
        <InputNumber 
        name='stock'
        id='stock'
        defaultValue={stock}
        onChange={({target:{name,value}}) => setProductToPost({...productToPost,stock:value})}
        />
        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-gray-500">unidad</span>
      </div>
    </div>
  )
}
