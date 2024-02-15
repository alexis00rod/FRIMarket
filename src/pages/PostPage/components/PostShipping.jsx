import { usePostContext } from "../context/PostContext"

export const PostShipping = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {shipping} = productToPost

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Método de envío:</h3>
      <div className="relative">
        {[{id:'free',label:'Envío gratis',cost:0},{id:'standar',label:'Envío standar',cost:1500}].map(e => (
            <div key={e.id} className="relative flex items-center">
              <input 
              type="radio" 
              name="shipping" 
              id={e.id}
              checked={shipping === e.id}
              onChange={() => setProductToPost({...productToPost,shipping:e.id})}
              className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer"
              />
              <label htmlFor={e.id} className="pl-6 cursor-pointer">{e.label}</label>
            </div>
          ))}
          {productToPostError.includes('shipping')  &&
            <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="pl-2 font-medium">Seleccioná el método de envío</span>
            </p>}
      </div>
    </div>
  )
}
