import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserById } from "../../services/user.js"
import { Loader, ProfilePosts, BtnShare } from '../../components/index.js'

export const Profile = () => {
  const {idUser} = useParams()
  const [profile, setProfile] = useState()

  useEffect(() => {
    getUserById(idUser, setProfile)
  },[idUser])

  if(!profile) return <Loader />

  return (
    <section className="profile">
      <div className="profile-header">
        <Link to={`/profile/${profile.idUser}`} className="profile-user">
          <img src={profile.photoURL} alt={profile.idUser} />
          <h2>{`${profile.name} ${profile.lastName}`}</h2>
        </Link>
        <BtnShare />
      </div>
      <ProfilePosts user={profile.email} />
    </section>
  )
}
