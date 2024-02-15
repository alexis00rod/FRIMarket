import { usePostContext } from "../context/PostContext"
import { InputText } from "../../../components"

export const PostUserEmail = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {user:{email}} = productToPost

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Email</h3>
      <div className="relative">
        <InputText 
        name='email'
        id='email'
        value={email || ''}
        onChange={({target:{value}}) => setProductToPost({...productToPost,user:{...productToPost.user,email:value}})}
        />
        {productToPostError.includes('email')  &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega tu email</span>
          </p>}
      </div>
    </div>
  )
}
