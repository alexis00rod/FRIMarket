import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById } from "../../services/firestore"
import { useCardSize } from "../../hooks/useCardSize.jsx"
import { useProductsSort } from "../../hooks/useProductsSort.jsx"
import { Breadcrumb, BreadcrumbLink, Element, Loader, ProductsLayout, ProfileInfo, ProfilePosts, SelectProductsSort, Main } from '../../components/index.js'

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
      <Main flex='lg:flex-row'>
        <Element size='lg:max-w-xs h-max' flex='flex-col flex-none'>
          <ProfileInfo user={userProfile} />
        </Element>
        <div className="flex flex-col gap-4">
          <Element flex='flex-col md:flex-row md:items-center gap-2'>
            <h3 className='box-header flex flex-col  text-lg font-semibold'>
              Publicaciones
              <span className="w-max text-sm text-gray-500 font-normal">{'product.length'} {'product.length' > 1 ? 'resultados' : 'resultado'}</span>
            </h3>
            <SelectProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
            <div className="absolute top-2 right-2 md:static px-2 py-1">
              <ProductsLayout size={cardSize} handle={setCardSize} />
            </div>
          </Element>
          <ProfilePosts user={userProfile} sort={productsSort} layout={cardSize} />
        </div>
      </Main>
    </>
  )
}
