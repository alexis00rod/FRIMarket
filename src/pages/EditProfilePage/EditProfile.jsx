import { Link } from "react-router-dom"
import { useProfile } from "../../hooks/useProfile.jsx"
import { EditProfilePhotoURL, Loader } from "../../components/index.js"

export const EditProfile = () => {
  const {profile} = useProfile()

  const editProfileItems = [
    {id:0,icon:'id-card',title: 'Información personal',href:'my-data'},
    {id:1,icon:'user',title: 'Datos de tu cuenta',href:'my-account'},
    {id:2,icon:'credit-card',title: 'Tarjetas',href:'my-card'},
    {id:3,icon:'location-dot',title: 'Direcciones',href:'my-location'},
  ]

  if(!profile) return <Loader />

  return (
    <section className="editProfile">
      <div className="editProfile-header">
        <EditProfilePhotoURL profile={profile}/>
        <div className="editProfile-header-profile">
          <h3>{`${profile.name} ${profile.lastName}`}</h3>
          <h4>{profile.id}</h4>
        </div>
      </div>
      <div className="editProfile-links">
        {editProfileItems.map(e => 
          <Link
          key={e.id}
          to={`/editProfile/${e.href}`}
          className="editProfile-link"
          >
            <i className={`editProfile-icon fa-solid fa-${e.icon}`}></i>
            <h4 className="ml-4 grow font-medium">{e.title}</h4>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>)}
      </div>
    </section>
  )
}
