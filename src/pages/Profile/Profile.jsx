import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { ProductsLayout, ProfileInfo } from '../../components/index.js'
import { getUserProducts } from "../../services/firestore"

export const Profile = () => {
  const {idUser} = useParams()
  const [userPosts, setUserPosts] = useState()

  useEffect(() => {
    getUserProducts(idUser)
    .then(resp => setUserPosts(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[idUser])

  return (
    <div className="grow flex gap-2">
      <aside className="w-full max-w-xs h-max px-2 py-2 flex flex-col flex-none bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
        <ProfileInfo user={idUser} />
      </aside>
      <section className="w-full px-2">
        <ProductsLayout products={userPosts} layout='grid' />
      </section>
    </div>
  )
}
