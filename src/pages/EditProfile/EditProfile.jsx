import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Breadcrumb, Button, InputNumber, InputPhoto, InputText, Loader, SelectCity, SelectProvince, Textarea } from "../../components"
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
    <>
      <Breadcrumb />
      <main>
        <form className="box box-form flex flex-col">
          <h2 className="box-header text-lg font-medium">Editar perfil</h2>
          {profile
          ? <div className="box-body flex flex-col items-center gap-4 divide-y divide-gray-300">
              <div className="w-full px-2 pb-4 flex flex-col gap-4">
                <h3 className="font-medium">Datos personales</h3>
                <div className="w-full flex gap-4">
                  <div className="flex flex-col justify-between grow gap-4">
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
              <div className="w-full px-2 py-4 flex flex-col gap-4">
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
            </div>
          : <div className="w-full px-2 pt-4">
              <Loader />
            </div>}
        </form>
      </main>
    </>
  )

  return (
    <>
    <Breadcrumb />
    <main>
      <form 
      className="box max-w-xl mx-auto"
      onSubmit={submitEditProfile}
      >
        <h3 className="box-header text-lg font-medium">Editar perfil</h3>
        {profile
        ? <>
            {/* Personal info */}
            <div className="w-full py-2 flex flex-col">
              <h4 className="w-full px-2 py-1 font-medium">Datos personales</h4>
              <div className="w-full flex flex-col">
                <div className="w-full flex gap-2">
                  <InputPhoto photo={profile.photoURL} newPhoto={editProfile.photoURL} name={profile.displayName} onChange={handlePhoto} />
                  <div className="flex flex-col grow">
                    <InputDisplayName defaultValue={profile.displayName} onChange={handleEditProfile} />
                    <InputUserID defaultValue={profile.idUser} onChange={handleEditProfile} />
                  </div>
                </div>
                <InputBio defaultValue={profile.bio} onChange={({target:{name,value}}) => setEditProfile({...editProfile,[name]:value})} />
                <InputPhone defaultValue={profile.phone} onChange={({target:{name,value}}) => setEditProfile({...editProfile,[name]:value})}
                />
              </div>
            </div> 
            {/* Shipping info */}
            <div className="w-full py-2 flex flex-col">
              <h4 className="w-full px-2 py-1 font-medium">Datos de envio</h4>
              <div className="w-full flex flex-col">
                {/* <SelectProvince 
                selected={editProfile.province ? editProfile.province : profile.province} 
                onChange={handleEditProfile} 
                /> */}
                <SelectCity 
                selected={editProfile.city ? editProfile.city : profile.city} 
                province={editProfile.province ? editProfile.province : profile.province} 
                onChange={handleEditProfile} 
                />
                <InputAddress defaultValue={profile.address} onChange={handleEditProfile} />
                <InputCP defaultValue={profile.cp} onChange={handleEditProfile} />
              </div>
            </div>
            <div className="w-full px-2 pt-4 flex items-center justify-center">
              <Button type='submit' icon='check' size='btn-l' color='btn-green'>
                <span className="text-sm">Guardar cambios</span>
              </Button>
            </div>
            {/* <button type="submit" className="w-full max-w-btn h-8 px-2 ml-2 flex items-center justify-center gap-2 bg-green-500 text-white rounded-md">
              <i className="fa-solid fa-check"></i>
              <span className="text-sm">Guardar cambios</span>
            </button> */}
              </>
        : <div className="w-full px-2 pt-4">
            <Loader />
          </div>}
      </form>
    </main>
    </>
  )
}
