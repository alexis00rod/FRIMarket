import { InputNumber } from "../../../components"
import { usePostContext } from "../context/PostContext"

export const PostStock = () => {
  const {productToPost,setProductToPost,productToPostError} = usePostContext()
  const {stock} = productToPost

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Stock:</h3>
      <div className="relative">
        <InputNumber 
        name='stock'
        id='stock'
        defaultValue={stock}
        onChange={({target:{value}}) => setProductToPost({...productToPost,stock:value})}
        />
        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-gray-500">unidad</span>
        {productToPostError.includes('stock')  &&
            <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="pl-2 font-medium">Ingresa cantidad de 1 0 más</span>
            </p>}
      </div>
    </div>
  )
}
