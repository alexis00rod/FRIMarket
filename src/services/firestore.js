import { app } from "./firebase";
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'

const db = getFirestore(app)

// Referencias
const productsRef = collection(db,"products")

// Funcion para obtener categorias
export const getCategories = async () => {
  return await getDocs(collection(db,"categories"))
}

// Funcion para obtener productos
export const getProducts = async (category,filters) => {
  const {brand, minPrice, maxPrice,sort} = filters

  const order = sort === 'lowPrice'
    ? orderBy('price','asc')
    : orderBy('price','desc')

  const q = category === 'all' 
    ? query(productsRef,where('price','>=',minPrice),where('price','<=',maxPrice),order)
    : brand === 'all'
      ? query(productsRef,where('category','==',category),where('price','>=',minPrice),where('price','<=',maxPrice),order)
      : query(productsRef,where('category','==',category),where('brand','==',brand),where('price','>=',minPrice),where('price','<=',maxPrice),order)

  return await getDocs(q)
}