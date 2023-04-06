import { SelectProvince, SelectCity, InputText, InputNumber } from "../index.js"

export const CheckoutShipping = ({initial, ...props}) => {
  const {province, city, address, cp} = initial

  return (
    <div className="box-body flex flex-col gap-2">
      <h4 className='font-medium'>Datos de envio</h4>
      <div className='w-full flex flex-wrap gap-4'>
        <SelectProvince 
        label='Provincia' 
        selected={province} 
        {...props} 
        />
        <SelectCity 
        label='Ciudad' 
        selected={city} 
        province={province} 
        {...props} 
        />
        <InputText 
        label='Direccion'
        size='input-m'
        id='address'
        name='address'
        defaultValue={address} 
        {...props}
        />
        <InputNumber 
        label='Codigo postal'
        size='input-m'
        id='cp'
        name='cp'
        defaultValue={cp} 
        {...props}
        />
      </div>
    </div>
  )
}
