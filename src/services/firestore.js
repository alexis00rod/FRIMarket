import { app } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'

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
const adsRef = collection(db,'ads')

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
  const {type, brand, minPrice, maxPrice, province} = filters

  let products

  if(category === 'all') {
    products = query(productsRef,where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(category !== 'all') {
    products = query(productsRef,where('category','==',category),where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(category === 'all' && province !== 'allProvinces') {
    products = query(productsRef,where('province','==',province),where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(category !== 'all' && province !== 'allProvinces') {
    products = query(productsRef,where('category','==',category),where('province','==',province),where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(type !== 'allTypes') {
    products = query(productsRef,where('category','==',category),where('type','==',type),where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(brand !== 'allBrands') {
    products = query(productsRef,where('category','==',category),where('brand','==',brand),where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(type !== 'allTypes' && brand !== 'allBrands') {
    products = query(productsRef,where('type','==',type),where('brand','==',brand),where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(type !== 'allTypes' && brand !== 'allBrands' && province !== 'allProvinces') {
    products = query(productsRef,where('type','==',type),where('brand','==',brand),where('province','==',province),where('price','>=',minPrice),where('price','<=',maxPrice))
  }

  return await getDocs(products)
}

// Funcion para obtener detalles del producto
export const getProductDetail = (id,obs) => {
  onSnapshot(productRef(id),(snap => {
    obs({id:snap.id,...snap.data()})
  }))
}

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
export const addProfile = async (profile) => {
  const {email} = profile
  return await setDoc(userRef(email),{
    ...profile,
    joined: serverTimestamp()
  })
}

// Funcion para obtener usuario
export const getUser = async (user,set) => {
  // const {email} = user
  onSnapshot(userRef(user),(snap => {
    set({id: snap.id,...snap.data()})
  }))
}

// Funcion para obtener usuario por id
export const getUserById = (user,set) => {
  onSnapshot(query(usersRef,where('idUser','==',user)),(snap => {
    set({
      id: snap.docs[0].id,
      ...snap.docs[0].data()
    })
  }))
}

// Funcion para obtener publicaciones de un usuario
export const getUserProducts = (user) => {
  const q = query(productsRef,where('idUser','==',user))
  return getDocs(q)
}

// Funcion para actualizar contador de publicaciones del usuario
export const updatePostsUser = async ({email,posts},action) => {
  const addPost = posts ? posts + 1 : 1
  const removePost = posts - 1
  await updateDoc(userRef(email),{
    posts : action === 'add' ? addPost : removePost
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

// Funcion para buscar productos
export const searchProducts = async (toSearch) => {
  const resp = await getDocs(productsRef)
  const products = await resp.docs.map(e => ({id: e.id,...e.data()}))
  return await products.filter(e =>
    e.name.toLowerCase().includes(toSearch.toLowerCase())
    ||
    e.brand.toLowerCase().includes(toSearch.toLowerCase())
  )
}

// Funcion para actualizar informacion de usuario
export const updateProfileInfo = async (email,newProfile) => await updateDoc(userRef(email),newProfile)

// Funcion para obtener productos similares
export const getSimilarProducts = async (type) => await getDocs(query(productsRef,where('type','==',type),limit(5)))

// Funcion para obtener reviews de un producto
export const getProductReviews = async (product,obs) => {
  onSnapshot(collection(db,'products',product,'reviews'),(snap => {
    obs(snap.docs.map(e => ({
      id: e.id,
      ...e.data()
    })))
  }))
}

// Funcion para agregar reseña
export const addReview = async (user,product,review) => {
  const {email} = user
  return await addDoc(collection(db,'products',product,'reviews'),{
    timestamp: serverTimestamp(),
    email, 
    ...review
  })
}

// Funcion para obtener usuarios
export const getUsers = async (location,sort) => {
  const order = sort === 'sales'
    ? orderBy('sales','desc')
    : sort === 'posts'
      ? orderBy('posts','desc')
      : sort === 'new'
        ? orderBy('joined','desc')
        : orderBy('joined','asc')

  const users = location === 'all'
    ? query(usersRef,order)
    : query(usersRef,where('province','==',location),order)

  return await getDocs(users)
}

// Funcion para borrar producto
export const deleteProduct = async (product) => await deleteDoc(productRef(product))

// Funcion para editar producto
export const editProduct = async (product, changes) => {
  const {id} = product
  await updateDoc(productRef(id),changes)
}

// Funcion para obtener categorias destacadas
export const getFeaturedCategories = async () => {
  const q = query(categoriesRef,orderBy('products','desc'),limit(6))
  return await getDocs(q)
}

// Funcion para obtener productos destacados
export const getFeaturedProducts = async (category) => {
  const q = query(productsRef,where('category','==',category),orderBy('price','desc'),limit(7))
  return await getDocs(q)
}

// Funcion para obtener publicidades
export const getAds = async () => {
  const q = adsRef
  return await getDocs(q)
}