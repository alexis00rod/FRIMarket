import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { updateProfileInfo } from "../../services/firestore"
import { uploadUserPhoto } from "../../services/storage"

export const SettingsProfile = () => {
  const {userLoggedProfile} = useAuthContext()
  const {email,photoURL,idUser,bio} = userLoggedProfile
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
    <>
      <h3 className="px-3 py-3 text-xl font-semibold">Editar perfil</h3>
      <form className="w-full py-2 flex flex-col gap-2" onSubmit={saveProfile}>
        <div className="flex">
          {/* Setting photo */}
          <div className="px-2 py-2 flex flex-col">
            <span className="px-1 text-sm font-medium">Foto</span>
            <input 
            type="file" 
            name='photoURL' 
            id='photoURL' 
            className="hidden"
            onChange={handlePhoto}
            />
            <label htmlFor='photoURL' className="w-48 h-48 px-1 py-1 flex items-center justify-center flex-none border border-gray-300 rounded-md cursor-pointer">
              {editProfile.photoURL
              ? <img src={editProfile.photoURL} alt={idUser} className='w-full h-full object-cover' />
              : <img src={photoURL} alt={idUser} className='w-full h-full object-cover' />}
            </label>
          </div>
          <div className="flex flex-col grow">
            {/* Setting nombre de usuario */}
            <div className="px-2 py-2 w-full max-w-lg flex flex-col">
              <label htmlFor="idUser" className="px-1 text-sm font-medium">Nombre de usuario</label>
              <input 
              type="text" 
              name="idUser" 
              id="idUser"
              defaultValue={idUser}
              onChange={({target:{name,value}}) => setEditProfile({...editProfile,[name]:value})}
              className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
              />
            </div>
            {/* Setting bio */}
            <div className="px-2 py-2 w-full max-w-lg flex flex-col">
              <label htmlFor="bio" className="px-1 text-sm font-medium">Biografia</label>
              <textarea 
              name="bio" 
              id="bio" 
              defaultValue={bio}
              onChange={({target:{name,value}}) => setEditProfile({...editProfile,[name]:value})}
              className="w-full max-w-lg h-28 px-2 py-2 border border-gray-300 rounded-md outline-none resize-none" 
              >
              </textarea>
            </div>
          </div>
        </div>
        <button type="submit" className="w-full max-w-btn h-8 px-2 ml-2 flex items-center justify-center gap-2 bg-green-500 text-white rounded-md">
          <i className="fa-solid fa-check"></i>
          <span className="text-sm">Guardar cambios</span>
        </button>
      </form>
    </>
  )
}
