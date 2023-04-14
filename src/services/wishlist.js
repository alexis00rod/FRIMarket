import { deleteDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore'
import { wishlistDocRef, wishlistRef } from "./firestore";

// Funcion para obtener lista de favoritos
// Agregar onSnapshot para detectar actualizacion en tiempo real
export const getWishlist = async ({email}) => await getDocs(wishlistRef(email))


// Funcion para agregar producto a favoritos
export const addProductWishlist = async (user,product) => {
  const {email} = user
  const {id} = product
  await setDoc(wishlistDocRef(email,id),product)
}

// Funcion para eliminar producto de favoritos
export const removeProductWishlist = async (user,product) => {
  const {email} = user
  const {id} = product
  await deleteDoc(wishlistDocRef(email,id))
}

// Funcion para ver si existe producto en favoritos
export const getProductInWishlist = (user,product,obs) => {
  const {email} = user
  const {id} = product

  onSnapshot(wishlistDocRef(email,id), (
    snap => {
      snap.exists()
      ? obs(true)
      : obs(false)
    }
  ))
}