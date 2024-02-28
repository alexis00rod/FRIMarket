import { usePostContext } from "../context/PostContext"

export const PostCondition = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {condition} = productToPost

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Estado del Producto:</h3>
      <div className="relative">
        {['Nuevo','Usado','Reacondicionado'].map((option,i ) => (
          <div key={i} className="relative flex items-center">
            <input 
            type="radio" 
            name="condition" 
            id={option}
            checked={condition === option}
            onChange={({target:{id}}) => setProductToPost({...productToPost,condition:id})}
            className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer"
            />
            <label htmlFor={option} className="pl-6 cursor-pointer">{option}</label>
          </div>
        ))}
        {productToPostError.includes('condition')  &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Seleccioná el estado en el que se encuentra el producto</span>
          </p>}
      </div>
    </div>
  )
}
