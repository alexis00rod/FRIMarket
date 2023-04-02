import { InputNumber } from "../index.js"

export const PostProductPrice = ({product, handle}) => {
  const {price, stock} = product

  return (
    <div className="w-full px-2 py-4 flex flex-col gap-4">
      <h4 className="font-medium">Fija un precio y la cantidad</h4>
      <div className="w-full flex justify-between gap-4">
        <InputNumber 
        label='Precio' 
        size='input-m'
        name='price' 
        id='price' 
        defaultValue={price}
        onChange={handle} 
        />
        <InputNumber 
        label='Cantidad' 
        size='input-m'
        name='stock' 
        id='stock' 
        defaultValue={stock}
        onChange={handle} 
        />
      </div>
    </div>
  )
}