import { usePostContext } from "../context/PostContext"
import { InputText, Notification } from '../../../components/'

export const PostTitle = ({label, err}) => {
  const {productToPost, setProductToPost,productToPostError} = usePostContext()

  return (
    <div className="post-input">
      {!label && <h3>Título</h3>}
      <InputText
      label={label}
      placeholder='Ej.: Celular Iphone 12 128gb'
      id='title'
      name='title'
      size='input-l'
      value={productToPost.title ? productToPost.title.join(' ') : ''}
      onChange={({target:{value}}) => setProductToPost({...productToPost,title:value.split(' ')})}
      />
      {productToPostError.includes('title') &&
        <Notification message={err}/>}
    </div>
  )
}
