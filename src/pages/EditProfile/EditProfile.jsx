import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Breadcrumb, Button, InputNumber, InputPhoto, InputText, Loader, SelectCity, SelectProvince, Textarea, Main, Element } from "../../components"
import { useProfile } from "../../hooks/useProfile"
import { updateProfileInfo } from "../../services/firestore"
import { uploadUserPhoto } from "../../services/storage"

export const EditProfile = () => {
  const {profile} = useProfile()
  const [editProfile, setEditProfile] = useState({})
  const navigate = useNavigate()

  const handleUserPhoto = ({target:{files}}) => {
    // uploadUserPhoto(profile,files[0])
    //   .then(resp => setEditProfile({...editProfile,photoURL:resp}))
  }

  const submitEditProfile = e => {
    e.preventDefault()
    // updateProfileInfo(profile.email,editProfile)
    // navigate('/')
  }

  const handleEditProfile = ({target:{name,value,id}}) => {
    setEditProfile({
      ...editProfile,
      [name]: 
          name === 'phone' || name === 'cp' 
          ? parseInt(value) 
          : name === 'province' || name === 'city'
            ? id
            : value
    })
  }

  console.log(editProfile)

  if(!profile) return <Loader />

  return (
    <Main size='main-size-medium'>
      <Element flex='flex-col'>
        <h2 className="box-header box-header-underline text-lg font-medium">Editar perfil</h2>
        {profile
          ? <form className="box-body flex flex-col items-center gap-2 divide-y divide-gray-300">
              <div className="w-full pb-2 flex flex-col gap-2">
                <h3 className="font-medium">Datos personales</h3>
                <div className="w-full flex gap-2">
                  <div className="flex flex-col justify-between grow gap-2">
                    <InputText 
                    label='Nombre y apellido' 
                    size='input-l'
                    id='displayName' 
                    name='displayName'
                    defaultValue={editProfile.displayName ? editProfile.displayName : profile.displayName}
                    onChange={handleEditProfile} 
                    />
                    <InputText 
                    label='Nombre de usuario' 
                    size='input-l'
                    id='idUser' 
                    name='idUser' 
                    defaultValue={editProfile.idUser ? editProfile.idUser : profile.idUser}
                    onChange={handleEditProfile} 
                    />
                  </div>
                  <InputPhoto 
                  label='Foto' 
                  id='photoURL' 
                  mame='photoURL' 
                  photo={editProfile.photoURL ? editProfile.photoURL : profile.photoURL} 
                  onChange={handleUserPhoto} 
                  />
                </div>
                <Textarea 
                label='Biografia' 
                size='input-l'
                name='bio' 
                id='bio'
                defaultValue={editProfile.bio ? editProfile.bio : profile.bio} 
                onChange={handleEditProfile} 
                />
                <InputNumber 
                label='Telefono' 
                size='input-l'
                id='phone' 
                name='phone' 
                defaultValue={editProfile.phone ? editProfile.phone : profile.phone}
                onChange={handleEditProfile} 
                />
              </div>
              <div className="w-full py-2 flex flex-col gap-2">
                <h3 className="font-medium">Datos de envio</h3>
                <div className="w-full flex flex-col md:flex-row items-center justify-between flex-wrap gap-4">
                  <SelectProvince 
                  label='Provincia' 
                  selected={editProfile.province ? editProfile.province : profile.province} 
                  onChange={handleEditProfile} 
                  />
                  <SelectCity 
                  label='Ciudad' 
                  selected={editProfile.city ? editProfile.city : profile.city} 
                  province={editProfile.province ? editProfile.province : profile.province} 
                  onChange={handleEditProfile}
                  />
                </div>
                <div className="w-full flex justify-between flex-wrap gap-4">
                  <InputText 
                  label='Direccion' 
                  size='input-m'
                  id='address' 
                  name='address' 
                  defaultValue={editProfile.address ? editProfile.address : profile.address}
                  onChange={handleEditProfile} 
                  />
                  <InputNumber 
                  label='Codigo postal'
                  size='input-m'
                  id='cp'
                  name='cp'
                  defaultValue={editProfile.cp ? editProfile.cp : profile.cp}
                  onChange={handleEditProfile} 
                  />
                </div>
              </div>
              <Button icon='check' color='btn-green' size='btn-l'>
                <span className="text-sm font-medium">Guardar cambios</span>
              </Button>
            </form>
          : <div className="w-full pt-2">
              <Loader />
            </div>}
      </Element>
    </Main>
  )
}
