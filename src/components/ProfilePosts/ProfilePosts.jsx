import { useEffect, useState } from "react"
import { getUserProducts } from "../../services/firestore"
import { Loader, ProductsList } from "../index.js"

export const ProfilePosts = ({user,sort,layout}) => {
  const {email} = user
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUserProducts(email)
      .then(resp => setPosts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
      .finally(() => setLoading(true))

  },[user])

  if(!loading) return <Loader />

  return <ProductsList products={posts} sort={sort} size={layout} maxCols={4} />
}
