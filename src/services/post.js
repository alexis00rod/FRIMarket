import { addDoc, serverTimestamp, updateDoc, } from 'firebase/firestore'
import { categoryRef, productsRef, userRef } from "./firestore";

// Funcion para agregar producto
export const addProduct = async (product) => {
  const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/frimarket-f4864.appspot.com/o/default-noimage.jpg?alt=media&token=8f0492c4-15e3-44d5-980a-e799fc0d5a93'
  const images = product.images.length 
    ? product.images 
    : [{name: 'default-noimage.jpg',url:defaultPhoto}]
  const productDoc = await addDoc(productsRef, {
    ...product,
    images: images,
    date: serverTimestamp()
  }) 
  return productDoc.id
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

  return newBrand
}