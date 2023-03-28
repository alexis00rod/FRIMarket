import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Breadcrumb, InputAddress, InputBio, InputCP, InputDisplayName, InputPhone, InputPhoto, InputUserID, Loader, SelectCity, SelectProvince } from "../../components"
import { useProfile } from "../../hooks/useProfile"
import { updateProfileInfo } from "../../services/firestore"
import { uploadUserPhoto } from "../../services/storage"

export const EditProfile = () => {
  const {profile} = useProfile()
  const [editProfile, setEditProfile] = useState({})
  const navigate = useNavigate()

  const handlePhoto = ({target:{files}}) => {
    uploadUserPhoto(profile,files[0])
      .then(resp => setEditProfile({...editProfile,photoURL:resp}))
  }

  const submitEditProfile = e => {
    e.preventDefault()
    updateProfileInfo(profile.email,editProfile)
    navigate('/')
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

  return (
    <>
    <Breadcrumb />
    <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
      <form 
      className="w-full max-w-xl px-2 pt-2 pb-4 mx-auto flex flex-col bg-white border border-gray-300 rounded-md divide-y divide-gray-300"
      onSubmit={submitEditProfile}
      >
        <h3 className="px-2 py-2 text-lg font-semibold">Editar perfil</h3>
        {profile
        ? <>
            {/* Personal info */}
            <div className="w-full py-2 flex flex-col">
              <h4 className="w-full px-2 py-1 font-semibold">Datos personales</h4>
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
              <h4 className="w-full px-2 py-1 font-semibold">Datos de envio</h4>
              <div className="w-full flex flex-col">
                <SelectProvince 
                selected={editProfile.province ? editProfile.province : profile.province} 
                onChange={handleEditProfile} 
                />
                <SelectCity 
                selected={editProfile.city ? editProfile.city : profile.city} 
                province={editProfile.province ? editProfile.province : profile.province} 
                onChange={handleEditProfile} 
                />
                <InputAddress defaultValue={profile.address} onChange={handleEditProfile} />
                <InputCP defaultValue={profile.cp} onChange={handleEditProfile} />
              </div>
            </div>
            <button type="submit" className="w-full max-w-btn h-8 px-2 ml-2 flex items-center justify-center gap-2 bg-green-500 text-white rounded-md">
              <i className="fa-solid fa-check"></i>
              <span className="text-sm">Guardar cambios</span>
            </button>
              </>
        : <div className="w-full px-2 pt-4">
            <Loader />
          </div>}
      </form>
    </main>
    </>
  )
}
