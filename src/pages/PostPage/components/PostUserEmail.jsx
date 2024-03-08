import { usePostContext } from "../context/PostContext"
import { InputText, Notification } from "../../../components"

export const PostUserEmail = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()

  return (
    <div className="post-input">
      <h3>Email</h3>
      <InputText 
      name='email'
      id='email'
      value={productToPost.user?.email || ''}
      onChange={({target:{value}}) => setProductToPost({...productToPost,user:{...productToPost.user,email:value}})}
      />
      {productToPostError.includes('email')  &&
        <Notification message='Agrega tu email'/>}
    </div>
  )
}
