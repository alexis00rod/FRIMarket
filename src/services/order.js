import { addDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { orderRef, ordersRef } from "./firestore"

// Funcion para realizar compra
export const addOrder = async (order) => {
  const {user:{email}} = order
  const orderID = await addDoc(ordersRef(email),{
    ...order,
    date: serverTimestamp()
  })
  return orderID.id
}

// Funcion para obtener ordenes
export const getOrder = async (user,order) => await getDoc(orderRef(user,order))
