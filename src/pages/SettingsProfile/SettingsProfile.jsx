import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SelectCity, SelectProvince, SettingsLocation } from "../../components"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { updateProfileInfo } from "../../services/firestore"
import { uploadUserPhoto } from "../../services/storage"

export const SettingsProfile = () => {
  const {userLoggedProfile} = useAuthContext()
  const {idUser,displayName,email,photoURL,bio,phone,address, province} = userLoggedProfile
  const [editProfile, setEditProfile] = useState({})
  const navigate = useNavigate()

  const handlePhoto = ({target:{files}}) => {
    uploadUserPhoto(userLoggedProfile,files[0])
    .then(resp => setEditProfile({...editProfile,photoURL:resp}))
  }

  const saveProfile = e => {
    e.preventDefault()
    updateProfileInfo(email,editProfile)
    navigate('/')
  }

  return (
    <form className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 rounded-md divide-y divide-gray-300">
      <h3 className="px-2 py-2 text-lg font-semibold">Editar perfil</h3>
      {/* Personal info */}
      <div className="w-full py-2 flex flex-col">
        <h4 className="w-full px-2 py-1 font-semibold">Datos personales</h4>
        <div className="w-full flex flex-col">
          <div className="w-full max-w-lg flex gap-2">
            <div className="px-2 py-2 flex flex-col">
              <span className="px-1 text-sm font-medium">Foto</span>
              <input 
              type="file" 
              name='photoURL' 
              id='photoURL' 
              className="hidden"
              onChange={handlePhoto}
              />
              <label 
              htmlFor='photoURL' 
              className="w-24 h-24 px-1 py-1 flex items-center justify-center flex-none border border-gray-300 rounded-md cursor-pointer"
              >
                {editProfile.photoURL
                ? <img src={editProfile.photoURL} alt={idUser} className='w-full h-full object-cover' />
                : <img src={photoURL} alt={idUser} className='w-full h-full object-cover' />}
              </label>
            </div>
            <div className="flex flex-col grow">
            <div className="w-full max-w-lg px-2 py-2 flex flex-col">
            <label htmlFor='name' className="px-1 text-sm font-medium">Nombre y apellido</label>
            <input 
            type="text" 
            name="name" 
            id="name"
            className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
            // defaultValue={displayName}
            // onChange={({target: {name,value}}) => setOrder({...order,[name]:value})}
            />
          </div>
          <div className="w-full max-w-lg px-2 py-2 flex flex-col">
            <label htmlFor='idUser' className="px-1 text-sm font-medium">Nombre de usuario</label>
            <input 
            type="text" 
            name="idUser" 
            id="idUser"
            className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
            // defaultValue={idUser}
            // onChange={({target: {name,value}}) => setOrder({...order,[name]:value})}
            />
          </div>
            </div>
          </div>
          <div className="px-2 py-2 w-full max-w-lg flex flex-col">
            <label htmlFor="bio" className="px-1 text-sm font-medium">Biografia</label>
            <textarea 
            name="bio" 
            id="bio" 
            defaultValue={bio}
            // onChange={({target:{name,value}}) => setEditProfile({...editProfile,[name]:value})}
            className="w-full max-w-lg h-24 px-2 py-2 border border-gray-300 rounded-md outline-none resize-none" 
            >
            </textarea>
          </div>
          <div className="w-full max-w-lg px-2 py-2 flex flex-col">
            <label htmlFor='phone' className="px-1 text-sm font-medium">Telefono</label>
            <input 
            type="text" 
            name="phone" 
            id="phone"
            className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
            // defaultValue={phone}
            // onChange={({target: {name,value}}) => setOrder({...order,[name]:value})}
            />
          </div>
        </div>
      </div>
      {/* Shipping info */}
      <div className="w-full py-2 flex flex-col">
        <h4 className="w-full px-2 py-1 font-semibold">Datos de envio</h4>
        <div className="w-full flex flex-col">
          {/* Edit Province */}
          <SelectProvince selected={editProfile.province} onChange={({target: {id}}) => setEditProfile({...editProfile,province: id})} />
          {/* Edit City */}
          {editProfile.province && <SelectCity province={editProfile.province} selected={editProfile.city} onChange={({target: {id}}) => setEditProfile({...editProfile,city: id})} />}
          {/* Edit address */}
          <div className="w-full max-w-lg px-2 py-2 flex flex-col">
            <label htmlFor='address' className="px-1 text-sm font-medium">Direccion</label>
            <input 
            type="text" 
            name="address" 
            id="address"
            className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
            defaultValue={address}
            // onChange={({target: {name,value}}) => setOrder({...order,[name]:value})}
            />
          </div>
        </div>
      </div>
      <button 
      className="w-full max-w-btn h-8 px-2 ml-2 flex items-center justify-center gap-2 bg-green-500 text-white rounded-md"
      >
        <i className="fa-solid fa-check"></i>
        <span className="text-sm">Guardar cambios</span>
      </button>
    </form>
  )
}
