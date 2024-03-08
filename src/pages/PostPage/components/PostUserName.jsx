import { usePostContext } from "../context/PostContext"
import { InputText, Notification } from "../../../components"

export const PostUserName = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()

  return (
    <div className="post-input">
      <h3>Nombre</h3>
      <InputText 
      name='name'
      id='name'
      value={productToPost.user?.name || ''}
      onChange={({target:{value}}) => setProductToPost({...productToPost,user:{...productToPost.user,name:value}})}
      />
      {productToPostError.includes('name')  &&
          <Notification message='Agrega tu nombre'/>}
    </div>
  )
}
