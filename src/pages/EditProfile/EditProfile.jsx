import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Breadcrumb, InputAddress, InputBio, InputCP, InputDisplayName, InputPhone, InputUserID, Loader, SelectCity, SelectProvince } from "../../components"
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
                      ? <img src={editProfile.photoURL} alt={editProfile.idUser} className='w-full h-full object-cover' />
                      : <img src={profile.photoURL} alt={profile.idUser} className='w-full h-full object-cover' />}
                    </label>
                  </div>
                  <div className="flex flex-col grow">
                    <InputDisplayName defaultValue={profile.displayName} onChange={({target: {name,value}}) => setEditProfile({...editProfile,[name]:value})} />
                    <InputUserID defaultValue={profile.idUser} onChange={({target: {name,value}}) => setEditProfile({...editProfile,[name]:value})} />
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
                {/* Edit Province */}
                {/* <SelectProvince 
                selected={editProfile.province ? editProfile.province : province} 
                onChange={({target: {name,id}}) => setEditProfile({...editProfile,[name]: id})} 
                /> */}
                {/* Edit City */}
                {/* <SelectCity 
                province={editProfile.province ? editProfile.province : province} 
                selected={editProfile.city} 
                onChange={({target: {name,id}}) => setEditProfile({...editProfile,[name]: id})} 
                /> */}
                {/* {province && 
                <SelectCity 
                province={province} 
                selected={city} 
                onChange={({target: {name,id}}) => setEditProfile({...editProfile,[name]: id})} 
                />} */}
                <InputAddress defaultValue={profile.address} onChange={({target: {name,value}}) => setEditProfile({...editProfile,[name]:value})} />
                <InputCP defaultValue={profile.cp} onChange={({target: {name,value}}) => setEditProfile({...editProfile,[name]:value})} />
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
