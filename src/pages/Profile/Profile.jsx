import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader, ProfileInfo } from '../../components/index.js'
import { ProfilePosts } from "../../components/index.js"
import { getUserById } from "../../services/firestore"

export const Profile = () => {
  const {idUser} = useParams()
  const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    getUserById(idUser, setUserProfile)
  },[idUser])

  if(!userProfile) return <Loader />

  return (
    <div className="grow flex gap-2">
      <aside className="w-full max-w-xs h-max px-2 py-2 flex flex-col flex-none bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
        <ProfileInfo user={userProfile} />
      </aside>
      <section className="w-full px-2">
        <ProfilePosts user={userProfile} />
      </section>
    </div>
  )
}
