import { app } from "./firebase";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'

const db = getFirestore(app)

// Referencias
const categoriesRef = collection(db,"categories")
const categoryRef = (id) => doc(db,"categories",id)
const productsRef = collection(db,"products")
const productRef = (id) => doc(db,"products",id)

// Funcion para obtener categorias
export const getCategories = (obs) => {
  onSnapshot(categoriesRef,(snap) => {
    obs(snap.docs.map(e => ({
      id: e.id,
      ...e.data()
    })))
  })
}

// Funcion para obtener productos
export const getProducts = async (category,filters) => {
  const {type, brand, minPrice, maxPrice} = filters

  const q = category === 'all'
  // Si categoria es igual a todos muestro todos los productos
    ? query(productsRef,
        where('price','>=',minPrice),
        where('price','<=',maxPrice))
    : type === 'allTypes' && brand === 'allBrands'
    // Si categoria distinto de todos muestro los productos de la categoria elegida
      ? query(productsRef,
          where('category','==',category),
          where('price','>=',minPrice),
          where('price','<=',maxPrice))
      : type === 'allTypes' && brand !== 'allBrands'
        ? query(productsRef,
            where('category','==',category),
            where('brand','==',brand),
            where('price','>=',minPrice),
            where('price','<=',maxPrice))
        : type !== 'allTypes' && brand === 'allBrands'
          ? query(productsRef,
              where('category','==',category),
              where('type','==',type),
              where('price','>=',minPrice),
              where('price','<=',maxPrice))
          : query(productsRef,
              where('category','==',category),
              where('type','==',type),
              where('brand','==',brand),
              where('price','>=',minPrice),
              where('price','<=',maxPrice))

  return await getDocs(q)
}

// Funcion para obtener detalles del producto
export const getProductDetail = async (id) => await getDoc(productRef(id))

// Funcion para agregar marca nueva
export const addBrand = async (category,brand) => {
  const {id, brands} = category

  const newBrand = brand.toLowerCase()

  await updateDoc(categoryRef(id), {
    brands: [...brands,newBrand]
  })
}

// Funcion para agregar producto
export const addProduct = async (product) => await addDoc(productsRef, product)