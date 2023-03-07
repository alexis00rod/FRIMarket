import { app } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'

const db = getFirestore(app)

// Referencias
const categoriesRef = collection(db,"categories")
const categoryRef = (id) => doc(db,"categories",id)
const productsRef = collection(db,"products")
const productRef = (id) => doc(db,"products",id)
const usersRef = collection(db,'users')
const userRef = (id) => doc(db,"users",id)
const wishlistRef = (id) => collection(db,"users",id,'wishlist')
const wishlistDocRef = (email,id) => doc(db,'users',email,'wishlist',id)

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

// Funcion para agregar usuario
export const addProfile = async ({idUser,displayName,email,photoURL}) => {
  return await setDoc(userRef(email),{
    idUser,
    displayName,
    email,
    photoURL,
    joined: serverTimestamp()
  })
}

// Funcion para obtener usuario
export const getUser = async (email) => await getDoc(userRef(email))

// Funcion para obtener usuario por id
export const getUserById = async (id) => await getDocs(query(usersRef,where('idUser','==',id)))

// Funcion para obtener publicaciones de un usuario
export const getUserProducts = (user) => {
  const q = query(productsRef,where('idUser','==',user))
  return getDocs(q)
}

// Funcion para actualizar contador de publicaciones del usuario
export const updatePostsUser = async ({email,posts}) => {
  const postsCounter = posts ? posts + 1 : 1
  await updateDoc(userRef(email),{
    posts : postsCounter
  })
}

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
  // wishlistDocRef(email,id)
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

// Funcion para obtener lista de favoritos
export const getWishlist = async ({email}) => await getDocs(wishlistRef(email))
