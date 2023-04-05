import { SelectProvince, SelectCity, InputText, InputNumber } from "../index.js"

export const EditProfileShipping = ({initial, edit, ...props}) => {
  return (
    <div className="box-body flex flex-col gap-2">
      <h4 className="font-medium">Datos de envio</h4>
      <div className="w-full flex flex-col md:flex-row items-center justify-between flex-wrap gap-4">
        <SelectProvince 
        label='Provincia' 
        selected={edit.province ? edit.province : initial.province} 
        {...props} 
        />
        <SelectCity 
        label='Ciudad' 
        selected={edit.city ? edit.city : initial.city} 
        province={edit.province ? edit.province : initial.province} 
        {...props}
        />
      </div>
      <div className="w-full flex justify-between flex-wrap gap-4">
        <InputText 
        label='Direccion' 
        size='input-m'
        id='address' 
        name='address' 
        defaultValue={edit.address ? edit.address : initial.address}
        {...props} 
        />
        <InputNumber 
        label='Codigo postal'
        size='input-m'
        id='cp'
        name='cp'
        defaultValue={edit.cp ? edit.cp : initial.cp}
        {...props} 
        />
      </div>
    </div>
  )
}
