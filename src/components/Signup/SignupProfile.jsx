import { InputNumber, InputPhoto,InputText, SelectCity, SelectProvince } from "../index.js"

export const SignupProfile = ({user,photo, ...props}) => {
  const {province, city, photoURL} = user
  return (
    <div className="w-full flex flex-col gap-4">
      <InputText 
      label='Nombre y apellido' 
      size='input-l'
      id='displayName' 
      name='displayName' 
      {...props}
      required
      />
      <div className="w-full flex gap-4">
        <div className="flex flex-col justify-between grow">
          <InputText 
          label='Nombre de usuario' 
          size='input-l'
          id='idUser' 
          name='idUser' 
          {...props}
          required
          />
          <InputNumber
          label='Numero de contacto' 
          size='input-l'
          id='phone' 
          name='phone' 
          {...props}
          required
          /> 
        </div>
        <InputPhoto id='photoURL' label='Foto' photo={photoURL} onChange={photo} />
      </div>
      <div className="w-full flex justify-between flex-wrap gap-4">
        <SelectProvince label='Provincia' selected={province} {...props} required />
        <SelectCity label='Ciudad' province={province} selected={city} {...props} required />
      </div>
    </div>
  )
}
