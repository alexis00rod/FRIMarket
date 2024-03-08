import { usePostContext } from "../context/PostContext"
import { Notification, Textarea } from "../../../components"

export const PostDescription = () => {
  const {productToPost,setProductToPost,productToPostError} = usePostContext()

  return (
    <div className="post-input">
      <h3>Cuéntanos más sobre tu Producto</h3>
      <Textarea 
      placeholder='Escribe una descripción detallada de tu producto.'
      id='description'
      name='description'
      value={productToPost.description || ''}
      onChange={({target: {value}}) => setProductToPost({...productToPost,description:value})}
      />
      {productToPostError.includes('description')  &&
        <Notification message='Escribe una breve descripción sobre tu producto'/>}
    </div>
  )
}
