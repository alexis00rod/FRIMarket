import { useEffect, useState } from "react"
import { useUserPosts } from "../../hooks/useUserPosts"
import { getUserProducts } from "../../services/firestore"
import { Loader, ProductsList } from "../index.js"

export const ProfilePosts = ({user,sort,layout}) => {
  const {email} = user
  const {userPosts} = useUserPosts(email)

  if(!userPosts) return <Loader />

  return <ProductsList products={userPosts} sort={sort} size={layout} maxCols={4} />
}
