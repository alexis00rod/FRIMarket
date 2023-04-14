import { useState, useEffect } from 'react'
import { getUserProducts } from '../services/shop.js'

export const useUserPosts = (user) => {
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    getUserProducts(user)
      .then(resp => setUserPosts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[user])

  return {userPosts}
}
