import { InputText, InputPhoto, InputNumber, Textarea } from "../index.js"

export const EditProfileInfo = ({initial, edit, photo, ...props}) => {
  return (
    <div className="box-body flex flex-col gap-2">
      <h4 className="font-medium">Datos personales</h4>
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col justify-between grow gap-2">
          <InputText 
          label='Nombre y apellido' 
          size='input-l'
          id='displayName' 
          name='displayName'
          defaultValue={edit.displayName ? edit.displayName : initial.displayName}
          {...props}
          />
          <InputText 
          label='Nombre de usuario' 
          size='input-l'
          id='idUser' 
          name='idUser' 
          defaultValue={edit.idUser ? edit.idUser : initial.idUser}
          {...props}
          />
        </div>
        <InputPhoto 
        label='Foto' 
        id='photoURL' 
        mame='photoURL' 
        photo={edit.photoURL ? edit.photoURL : initial.photoURL} 
        onChange={photo}
        />
      </div>
      <Textarea 
      label='Biografia' 
      size='input-l'
      name='bio' 
      id='bio'
      defaultValue={edit.bio ? edit.bio : initial.bio} 
      {...props}
      />
      <InputNumber 
      label='Telefono' 
      size='input-l'
      id='phone' 
      name='phone' 
      defaultValue={edit.phone ? edit.phone : initial.phone}
      {...props}
      />
    </div>
  )
}
