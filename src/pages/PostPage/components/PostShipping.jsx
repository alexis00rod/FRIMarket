import { usePostContext } from "../context/PostContext"
import { InputRadio, Notification } from "../../../components"

export const PostShipping = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {shipping} = productToPost

  return (
    <div className="post-input">
      <h3>Método de envío:</h3>
      {['Envío gratis','Envío standar'].map((option,i) => 
        <InputRadio
        key={i}
        name='shipping'
        id={option}
        checked={shipping === option}
        onChange={() => setProductToPost({...productToPost,shipping:option})}
        >
          {option}
        </InputRadio>)}
      {productToPostError.includes('shipping')  &&
        <Notification message='Seleccioná el método de envío'/>}
    </div>
  )
}
