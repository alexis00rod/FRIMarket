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
    <main className="grow flex flex-col">
      <div className="w-full h-max bg-white">
        <div className="w-full max-w-[1200px] mx-auto p-4 flex flex-wrap justify-between items-center gap-2">
          <Link to={`/profile/${profile.idUser}`} className="w-max p-2 flex items-center border border-slate-300 rounded-md">
            <img src={profile.photoURL} alt={profile.idUser} className="w-10 h-10 object-cover object-center rounded-full" />
            <h2 className="pl-2 text-lg font-medium">{`${profile.name} ${profile.lastName}`}</h2>
          </Link>
          <BtnShare />
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto p-4">
        <ProfilePosts user={profile.email} />
      </div>
    </main>
  )
}
