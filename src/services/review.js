import { addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { reviewsRef } from "./firestore"

// Funcion para obtener reviews de un producto
export const getProductReviews = async (product,sort,obs) => {
  const order = sort === 'new'
  ? orderBy('date','desc')
  : sort === 'old'
    ? orderBy('date','asc')
    : sort === 'highRating'
      ? orderBy('rating','desc')
      : orderBy('rating','asc')

  const q = query(reviewsRef(product),order)

  onSnapshot(q,(snap => {
    obs(snap.docs.map(e => ({
      id: e.id,
      ...e.data()
    })))
  }))
}

// Funcion para agregar reseña
export const addReview = async (user,product,review) => {
  const {email} = user
  return await addDoc(reviewsRef(product),{
    date: serverTimestamp(),
    email, 
    ...review
  })
}