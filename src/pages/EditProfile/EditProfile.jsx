import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Loader, Main, Element, EditProfileInfo, EditProfileShipping } from "../../components"
import { useProfile } from "../../hooks/useProfile"
import { updateProfileInfo } from "../../services/firestore"
import { uploadUserPhoto } from "../../services/storage"

export const EditProfile = () => {
  const {profile} = useProfile()
  const [editProfile, setEditProfile] = useState({})
  const navigate = useNavigate()

  const handleUserPhoto = ({target:{files}}) => {
    uploadUserPhoto(profile,files[0])
      .then(resp => setEditProfile({...editProfile,photoURL:resp}))
  }

  const submitEditProfile = e => {
    e.preventDefault()
    updateProfileInfo(profile.email,editProfile)
    navigate(`/profile/${editProfile.idUser ? editProfile.idUser : profile.idUser}`)
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

  if(!profile) return <Loader />

  return (
    <Main size='main-size-medium'>
      <Element flex='flex-col'>
        <h2 className="box-header box-header-underline text-lg font-medium">Editar perfil</h2>
        {profile
          ? <form className="w-full flex flex-col divide-y divide-gray-300 gap-2" onSubmit={submitEditProfile}>
              <EditProfileInfo initial={profile} edit={editProfile} photo={handleUserPhoto} onChange={handleEditProfile} />
              <EditProfileShipping initial={profile} edit={editProfile} onChange={handleEditProfile} />
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
