import { InputEmail, InputNumber, InputText } from "../index.js"

export const CheckoutInformation = ({initial, ...props}) => {
  const {email, displayName, phone} = initial

  return (
    <div className="box-body flex flex-col gap-2">
      <h4 className='font-medium'>Datos personales</h4>
      <div className='w-full flex flex-wrap gap-4'>
        <InputEmail 
        label='Email'
        size='input-m'
        id='email'
        name='email'
        defaultValue={email} 
        {...props} 
        />
        <InputText 
        label='Nombre y apellido' 
        size='input-m' 
        id='displayName' 
        name='displayName' 
        defaultValue={displayName} 
        {...props} 
        />
        
        <InputNumber 
        label='Numero de telefono'
        size='input-m'
        id='phone'
        name='phone'
        defaultValue={phone} 
        {...props}
        />
      </div>
    </div>
  )
}
