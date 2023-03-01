import { app } from "./firebase";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'

const db = getFirestore(app)

// Referencias
const categoriesRef = collection(db,"categories")
const productsRef = collection(db,"products")
const productRef = (id) => doc(db,"products",id)

// Funcion para obtener categorias
export const getCategories = async () => await getDocs(categoriesRef)

// Funcion para obtener productos
export const getProducts = async (category,filters) => {
  const {brand, minPrice, maxPrice} = filters

  const q = category === 'all' 
    ? query(productsRef,where('price','>=',minPrice),where('price','<=',maxPrice))
    : brand === 'all'
      ? query(productsRef,where('category','==',category),where('price','>=',minPrice),where('price','<=',maxPrice))
      : query(productsRef,where('category','==',category),where('brand','==',brand),where('price','>=',minPrice),where('price','<=',maxPrice))

  return await getDocs(q)
}

// Funcion para obtener detalles del producto
export const getProductDetail = async (id) => await getDoc(productRef(id))