import { InputText, InputNumber } from "../index.js"

export const PostProductUser = ({profile, product, handle}) => {
  const {displayName, phone} = product

  return (
    <div className="w-full px-2 pt-4 flex flex-col gap-4">
      <h4 className="font-medium">Confirma tus datos personales</h4>
      <div className="w-full flex gap-4">
        <InputText 
        label='Nombre' 
        id='displayName' 
        name='displayName' 
        defaultValue={displayName ? displayName : profile.displayName}
        onChange={handle} 
        />
        <InputNumber 
        label='Numero de telefono' 
        id='phone' 
        name='phone' 
        defaultValue={phone ? phone : profile.phone}
        onChange={handle} 
        />
      </div>
    </div>
  )
}