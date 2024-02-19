import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserProducts } from "../../services/shop.js"
import { getUserById } from "../../services/user.js"
import { Breadcrumb, BreadcrumbLink, Loader, ProfileInfo, ProfilePosts, Main } from '../../components/index.js'

export const Profile = () => {
  const {idUser} = useParams()
  const [profile, setProfile] = useState()
  const [posts, setPosts] = useState()

  useEffect(() => {
    getUserById(idUser, setProfile)
  },[idUser])

  useEffect(() => {
    // profile &&
    // getUserProducts(profile)
    //   .then(resp => setPosts(resp.docs.map(e => ({
    //     id: e.id,
    //     ...e.data()
    //   }))))
  },[profile])

  if(!profile) return <Loader />

  return (
    <>
    {/* <Breadcrumb> */}
      {/* {profile && <BreadcrumbLink name={profile.displayName} to={`/profile/${idUser}`} />} */}
    {/* </Breadcrumb> */}
    <main className="grow flex flex-col">
      {/* Informacion de usuario */}
      <div className="w-full h-max bg-white">
        <section className="w-full max-w-[1200px] mx-auto p-4 flex ">
          <Link to='/' className="w-max p-2 flex items-center border border-slate-300 rounded-md">
            <img src={profile.photoURL} alt={profile.displayName} className="w-10 h-10 object-cover object-center rounded-full" />
            <h2 className="pl-2 text-lg font-medium">{profile.displayName}</h2>
          </Link>
        </section>
      </div>
    </main>
    </>
  )

  return (
    <>
      <Breadcrumb>
        {/* {profile && <BreadcrumbLink name={profile.displayName} to={`/profile/${idUser}`} />} */}
      </Breadcrumb>
      <Main size='' flex='flex-col lg:flex-row'>
        {/* <ProfileInfo user={profile} posts={posts} /> */}
        {/* {posts
        ? <ProfilePosts posts={posts} />
        : <Loader />} */}
      </Main>
    </>
  )
}
