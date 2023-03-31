import { InputPhoto } from "../index.js"

export const PostProductThumb = ({product,handle}) => {
  const {thumb} = product

  return (
    <div className="w-full px-2 py-4 flex flex-col gap-4">
      <h4 className="font-medium">Subi una foto</h4>
      <InputPhoto 
      label='Foto' 
      name='thumb' 
      id='thumb' 
      photo={thumb} onChange={handle} 
      />
    </div>
  )
}