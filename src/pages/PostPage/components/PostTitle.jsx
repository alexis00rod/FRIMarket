import { usePostContext } from "../context/PostContext"
import { InputText } from '../../../components/'

export const PostTitle = ({label, err}) => {
  const {productToPost, setProductToPost,productToPostError} = usePostContext()

  return (
    <div className="relative mt-6 mb-1.5">
      {!label && <h3 className="py-3 text-lg font-medium">Título</h3>}
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
        <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="pl-2 font-medium">{err}</span>
        </p>}
    </div>
  )
}
