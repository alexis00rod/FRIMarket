import { app } from "./firebase";
import { collection, getDocs, getFirestore } from 'firebase/firestore'

const db = getFirestore(app)

// Funcion para obtener categorias
export const getCategories = async () => {
  return await getDocs(collection(db,"categories"))
}

// Funcion para obtener productos
export const getProducts = async () => {
  return await getDocs(collection(db, "products"))
}