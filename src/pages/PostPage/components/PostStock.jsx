import { usePostContext } from "../context/PostContext"
import { InputStock, Notification } from "../../../components"

export const PostStock = () => {
  const {productToPost,setProductToPost,productToPostError} = usePostContext()
  const {stock} = productToPost

  return (
    <div className="post-input">
      <h3>Stock:</h3>
      <InputStock 
      name='stock'
      id='stock'
      value={stock || ''}
      onChange={({target:{value}}) => setProductToPost({...productToPost,stock:value})}
      />
      {productToPostError.includes('stock')  &&
        <Notification message='Ingresa cantidad de 1 0 más'/>}
    </div>
  )
}
