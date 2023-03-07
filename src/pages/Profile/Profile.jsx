import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader, ProductsLayout, ProfileInfo } from '../../components/index.js'
import { getUserById, getUserProducts } from "../../services/firestore"

export const Profile = () => {
  const {idUser} = useParams()
  const [userProfile, setUserProfile] = useState()
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUserById(idUser)
    .then(resp => setUserProfile({
      id: resp.docs[0].id,
      ...resp.docs[0].data()
    }))
    .finally(() => setLoading(true))

    getUserProducts(idUser)
      .then(resp => setUserPosts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))

  },[idUser])

  if(!loading) return <Loader />

  return (
    <div className="grow flex gap-2">
      <aside className="w-full max-w-xs h-max px-2 py-2 flex flex-col flex-none bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
        <ProfileInfo user={userProfile} />
      </aside>
      <section className="w-full px-2">
        <ProductsLayout products={userPosts} layout='grid' />
      </section>
    </div>
  )
}
