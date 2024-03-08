import { usePostContext } from "../context/PostContext"
import { InputRadio, Notification } from "../../../components"

export const PostCondition = () => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {condition} = productToPost

  return (
    <div className="post-input">
      <h3>Estado del Producto:</h3>
      {['Nuevo','Usado','Reacondicionado'].map((option,i ) => 
        <InputRadio
        key={i}
        name='condition'
        id={option}
        checked={condition === option}
        onChange={({target:{id}}) => setProductToPost({...productToPost,condition:id})}
        >
          {option}
        </InputRadio>)}
      {productToPostError.includes('condition')  &&
        <Notification message='Seleccioná el estado en el que se encuentra el producto'/>}
    </div>
  )
}
