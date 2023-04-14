import { getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore"
import { categoriesRef } from "./firestore"

// Funcion para obtener categorias
export const getCategories = (obs) => {
  onSnapshot(categoriesRef,(snap) => {
    obs(snap.docs.map(e => ({
      id: e.id,
      ...e.data()
    })))
  })
}

// Funcion para obtener categorias destacadas
export const getFeaturedCategories = async () => {
  const q = query(categoriesRef,orderBy('products','desc'),limit(6))
  return await getDocs(q)
}