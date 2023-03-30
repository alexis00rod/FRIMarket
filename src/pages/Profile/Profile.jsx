import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbLink, Loader, ProductsLayout, ProductsSort, ProfileInfo } from '../../components/index.js'
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
    <>
      <Breadcrumb>
        {userProfile && <BreadcrumbLink name={userProfile.displayName} to={`/profile/${idUser}`} />}
      </Breadcrumb>
      <main>
        <div className="w-full flex flex-col lg:flex-row gap-2 md:gap-4">
          <aside className="box lg:max-w-xs h-max flex flex-col flex-none">
            <ProfileInfo user={userProfile} />
          </aside>
          <section className="w-full flex flex-col gap-2 md:gap-4">
            <div className="box flex items-center flex-wrap">
              <h3 className="px-1 md:px-2 py-1 md:py-2 grow text-lg font-medium">Publicaciones</h3>
              <div className="flex justify-end gap-2 md:gap-4 grow">
                <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
                <ProductsLayout size={cardSize} handle={setCardSize} />
              </div>
            </div>
            <ProfilePosts user={userProfile} sort={productsSort} layout={cardSize} />
          </section>
        </div>
      </main>
    </>
  )
}
