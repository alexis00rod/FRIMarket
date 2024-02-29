import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EditProfilePhotoURL, Loader } from "../../components/index.js"
// import { Button, Loader, Main, Element, EditProfileInfo, EditProfileShipping } from "../../components"
import { useProfile } from "../../hooks/useProfile.jsx"
import { updateProfileInfo } from "../../services/user.js"
// import { uploadUserPhoto } from "../../services/storage.js"

export const EditProfile = () => {
  const {profile} = useProfile()
  const [editProfile, setEditProfile] = useState({})
  const navigate = useNavigate()

  // const handleUserPhoto = ({target:{files}}) => {
  //   uploadUserPhoto(profile,files[0])
  //     .then(resp => setEditProfile({...editProfile,photoURL:resp}))
  // }

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

  const editProfileItems = [
    {id:0,icon:'id-card',title: 'Información personal',href:'my-data'},
    {id:1,icon:'user',title: 'Datos de tu cuenta',href:'my-account'},
    {id:2,icon:'credit-card',title: 'Tarjetas',href:'my-card'},
    {id:3,icon:'location-dot',title: 'Direcciones',href:'my-location'},
  ]

  const handlePhotoURL = ({target:{files}}) => {
    console.log(files[0])
  }

  if(!profile) return <Loader />

  return (
    <>
      <div className="w-full p-4 flex items-center bg-white border border-gray-300 rounded-md">
        <EditProfilePhotoURL profile={profile}/>
        <div className="ml-4 flex flex-col grow">
          <h3 className="text-lg font-semibold">{`${profile.name} ${profile.lastName}`}</h3>
          <h4>{profile.id}</h4>
        </div>
      </div>
      <div className="w-full p-4 flex flex-col gap-2 bg-white border border-gray-300 rounded-md">
        {editProfileItems.map(e => 
          <Link
          key={e.id}
          to={`/editProfile/${e.href}`}
          className="w-full p-2 flex items-center duration-200 hover:text-yellow-500"
          >
            <div className="w-[50px] h-[50px] flex items-center justify-center flex-none text-blue-500 rounded-full border border-gray-300">
              <i className={`text-xl fa-solid fa-${e.icon}`}></i>
            </div>
            <h4 className="ml-4 grow font-medium">{e.title}</h4>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>)}
      </div>
    </>
  )
}
