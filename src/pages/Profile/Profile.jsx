import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserById, getUserProducts } from "../../services/firestore"
import { Breadcrumb, BreadcrumbLink, Loader, ProfileInfo, ProfilePosts, Main } from '../../components/index.js'

export const Profile = () => {
  const {idUser} = useParams()
  const [profile, setProfile] = useState()
  const [posts, setPosts] = useState()

  useEffect(() => {
    getUserById(idUser, setProfile)
  },[idUser])

  useEffect(() => {
    profile &&
    getUserProducts(profile.id)
      .then(resp => setPosts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[profile])

  if(!profile) return <Loader />

  return (
    <>
      <Breadcrumb>
        {profile && <BreadcrumbLink name={profile.displayName} to={`/profile/${idUser}`} />}
      </Breadcrumb>
      <Main size='' flex='flex-col lg:flex-row'>
        <ProfileInfo user={profile} posts={posts} />
        {posts
        ? <ProfilePosts posts={posts} />
        : <Loader />}
      </Main>
    </>
  )
}
