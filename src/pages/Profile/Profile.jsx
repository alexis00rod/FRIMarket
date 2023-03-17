import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader, ProductsLayout, ProductsSort, ProfileInfo } from '../../components/index.js'
import { ProfilePosts } from "../../components/index.js"
import { useCardSize } from "../../hooks/useCardSize.jsx"
import { useProductsSort } from "../../hooks/useProductsSort.jsx"
import { getUserById } from "../../services/firestore"

export const Profile = () => {
  const {idUser} = useParams()
  const [userProfile, setUserProfile] = useState()
  const {productsSort, setProductsSort} = useProductsSort()
  const {cardSize, setCardSize} = useCardSize()

  useEffect(() => {
    getUserById(idUser, setUserProfile)
  },[idUser])

  if(!userProfile) return <Loader />

  return (
    <div className="grow flex gap-2">
      <aside className="w-full max-w-xs h-max px-2 py-2 flex flex-col flex-none bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
        <ProfileInfo user={userProfile} />
      </aside>
      <section className="w-full px-2 flex flex-col gap-4">
        <div className="w-full px-2 py-2 flex items-center bg-white border border-gray-300 rounded-md">
          <h3 className="px-2 py-2 grow text-lg font-medium">Publicaciones</h3>
          <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
          <ProductsLayout size={cardSize}  onChange={({target:{id}}) => setCardSize(id)} />
        </div>
        <ProfilePosts user={userProfile} sort={productsSort} layout={cardSize} />
      </section>
    </div>
  )
}
