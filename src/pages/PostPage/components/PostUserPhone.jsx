import { usePostContext } from "../context/PostContext"
import { formatPhone } from "../../../services/format"
import { InputText, Notification } from "../../../components"

export const PostUserPhone = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()

  return (
    <div className="post-input">
      <h3>Número de contacto</h3>
      <InputText 
      name='phone'
      id='phone'
      value={productToPost.user?.phone || ''}
      onChange={({target:{value}}) => setProductToPost({...productToPost,user:{...productToPost.user,phone:formatPhone(value)}})}
      />
      {productToPostError.includes('phone')  &&
        <Notification message='Agrega tu número de contacto'/>}
    </div>
  )
}
