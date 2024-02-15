import { Textarea } from "../../../components"
import { usePostContext } from "../context/PostContext"

export const PostDescription = () => {
  const {productToPost,setProductToPost,productToPostError} = usePostContext()

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Cuéntanos más sobre tu Producto</h3>
      <div className="relative">
        <Textarea 
        placeholder='Escribe una descripción detallada de tu producto.'
        id='description'
        name='description'
        onChange={({target: {name, value}}) => setProductToPost({...productToPost,description:value})}
        />
        {productToPostError.includes('description')  &&
            <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="pl-2 font-medium">Escribe una breve descripción sobre tu producto</span>
            </p>}
      </div>
    </div>
  )
}
