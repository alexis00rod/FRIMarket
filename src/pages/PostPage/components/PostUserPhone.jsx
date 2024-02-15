import { usePostContext } from "../context/PostContext"
import { InputText } from "../../../components"
import { formatPhone } from "../../../services/format"

export const PostUserPhone = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {user:{phone}} = productToPost
  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Número de contacto</h3>
      <div className="relative">
        <InputText 
        name='phone'
        id='phone'
        value={phone || ''}
        onChange={({target:{value}}) => setProductToPost({...productToPost,user:{...productToPost.user,phone:formatPhone(value)}})}
        />
        {productToPostError.includes('phone')  &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega tu número de contacto</span>
          </p>}
      </div>
    </div>
  )
}
