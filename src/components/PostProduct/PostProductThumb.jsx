import { InputPhoto } from "../index.js"

export const PostProductThumb = ({product,handle}) => {
  const {thumb} = product

  return (
    <div className="w-full px-2 py-4 flex flex-col gap-4">
      <h4 className="font-medium">Subi una foto</h4>
      {/* <h4 className="font-medium">Subi hasta 4 fotos</h4> */}
      <div className="w-full flex flex-wrap gap-4">
        <InputPhoto 
        // label='Foto' 
        name='thumb' 
        id='thumb' 
        photo={thumb} onChange={handle} 
        />
        {/* <InputPhoto 
        // label='Foto' 
        name='thumb2' 
        id='thumb2' 
        // photo={thumb} onChange={handle} 
        /> */}
        {/* <InputPhoto 
        // label='Foto' 
        name='thumb3' 
        id='thumb3' 
        // photo={thumb} onChange={handle} 
        /> */}
        {/* <InputPhoto 
        // label='Foto' 
        name='thumb4' 
        id='thumb4' 
        // photo={thumb} onChange={handle} 
        /> */}
      </div>
    </div>
  )
}