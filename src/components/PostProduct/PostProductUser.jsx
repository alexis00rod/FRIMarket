import { InputText, InputNumber } from "../index.js"

export const PostProductUser = ({user, handle}) => {
  const {displayName, phone} = user

  return (
    <div className="w-full px-2 pt-4 flex flex-col gap-4">
      <h4 className="font-medium">Confirma tus datos personales</h4>
      <div className="w-full flex justify-between flex-wrap gap-4">
        <InputText 
        label='Nombre' 
        size='input-m'
        id='displayName' 
        name='displayName' 
        defaultValue={displayName}
        // defaultValue={displayName ? displayName : profile.displayName}
        onChange={handle} 
        />
        <InputNumber 
        label='Numero de telefono' 
        size='input-m'
        id='phone' 
        name='phone' 
        defaultValue={phone}
        // defaultValue={phone ? phone : profile.phone}
        onChange={handle} 
        />
      </div>
    </div>
  )
}