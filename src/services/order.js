import { addDoc, getDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"
import { orderRef, ordersRef } from "./firestore"

// Funcion para realizar compra
export const addOrder = async (user,order) => {
  const orderDoc = await addDoc(ordersRef(user),{
    ...order,
    date: serverTimestamp()
  }) 
  return orderDoc.id 
}

// Funcion para obtener orden
export const getOrder = async (user,order) => await getDoc(orderRef(user,order))

// Funcion para obtener ordenes
export const getOrders = async (user,sort) => {
  const {email} = user

  const order = sort === 'new'
    ? orderBy('date','desc')
    : orderBy('date','asc') 

  const q = query(ordersRef(email),order)

  return await getDocs(q)
}
