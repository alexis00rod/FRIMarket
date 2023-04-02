import { SelectProductType, SelectProductBrand, InputText, Textarea } from "../index.js"

export const PostProductDetail = ({product, category, handle}) => {
  const {type, brand, name, description} = product

  return (
    <div className="w-full px-2 pb-4 flex flex-col gap-4">
      <h4 className="font-medium">Incluye algunos detalles</h4>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <SelectProductType 
          category={category} 
          selected={type} 
          onChange={handle} 
          />
          <SelectProductBrand 
          selected={brand} 
          category={category} 
          onChange={handle} 
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <InputText 
          label='Nombre del producto' 
          size='input-l'
          name='name' 
          id='name'
          defaultValue={name}
          onChange={handle} 
          />
          <Textarea 
          label='Descripcion' 
          size='input-l'
          name='description' 
          id='description' 
          defaultValue={description}
          onChange={handle} 
          />
        </div>
      </div>
    </div>
  )
}