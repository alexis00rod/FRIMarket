import { addDoc, serverTimestamp, updateDoc, } from 'firebase/firestore'
import { categoryRef, productsRef, userRef } from "./firestore";

// Funcion para agregar producto
// Devolver notificacion
export const addProduct = async (product) => {
  return await addDoc(productsRef, {
    ...product,
    date: serverTimestamp()
  })
}

// Funcion para actualizar publiaciones de un usuario
export const updateUserPosts = async (user) => {
  const {email,posts} = user
  return await updateDoc(userRef(email),{
    posts: posts ? posts + 1 : 1
  })
}
// Funcion para agregar marca nueva
export const addBrand = async (category,brand) => {
  const {id, brands} = category

  const newBrand = brand.toLowerCase()

  await updateDoc(categoryRef(id), {
    brands: [...brands,newBrand]
  })
}