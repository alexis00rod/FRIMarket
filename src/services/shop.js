import { deleteDoc, getDocs, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { productRef, productsRef } from "./firestore";

export const getProducts = async (filters) => {
  const {category,type,brands,locations,min,max} = filters

  let productsQuery = productsRef

  if (category) {productsQuery = query(productsQuery, where('category', '==', category))}

  if (type) {productsQuery = query(productsQuery, where('type', '==', type))}

  if (brands && brands.length > 0) {
    productsQuery = query(productsQuery, where('brand', 'in', brands));
  }

  if (locations && locations.length > 0) {
    productsQuery = query(productsQuery, where('user.province.id', 'in', locations));
  }

  if (min !== undefined && min !== null) {
    productsQuery = query(productsQuery, where('price', '>=', min))
  }

  if (max !== undefined && max !== null) {
    productsQuery = query(productsQuery, where('price', '<=', max))
  }

  return await getDocs(productsQuery)
}

// Funcion para actualizar producto
export const updateProduct = async (products) => {
  for (const product of products) {
    await updateDoc(productRef(product.id), {
      sales: product.sales ? parseInt(product.sales) + 1 : 1,
      stock: parseInt(product.stock) - product.qty
    })
  }
}

// Funcion para obtener detalles del producto
export const getProductDetail = (id,obs) => {
  onSnapshot(productRef(id),(snap => {
    obs({id:snap.id,...snap.data()})
  }))
}

// Funcion para obtener publicaciones de un usuario
export const getUserProducts = async (user) => await getDocs(query(productsRef,where('user.email','==',user)))

// Funcion para buscar productos
export const searchProducts = async (toSearch) => await getDocs(query(productsRef, where('title','array-contains-any',toSearch.split(' '))))

// Funcion para borrar producto
export const deleteProduct = async (product) => await deleteDoc(productRef(product))

// Funcion para editar producto
export const editProductDoc = async (product, changes) => {
  const {id} = product
  await updateDoc(productRef(id),changes)
}

// Funcion para obtener productos por categoria
export const getProductsPerCategory = async (category,max) => {
  return await getDocs(query(productsRef,where('category','==', category),limit(max)))
}

export const getProductsQty = async (item) => {
  let products = 0

  if(!item) {
    const snap = await getDocs(productsRef)
    products = snap.size
  } else {
    const q1 = query(productsRef,where('category','==',item))
    const q2 = query(productsRef,where('type','==',item))

    const [resp1, resp2] = await Promise.all([getDocs(q1),getDocs(q2)])
 
    products = resp1.size + resp2.size
  }

  return products
}

// Funcion para obtener productos en oferta
export const getProductsOffer = async (max) => {
  return getDocs(query(productsRef,limit(max)))
}

export const getFeaturedProducts = async (max) => {
  return getDocs(query(productsRef,limit(max)))
}

// Funcion para obtener productos similares de un producto
export const getSimilarProducts = async (product) => {
  const { id, type } = product

  const products = await getDocs(query(productsRef, where('type', '==', type), limit(8)))

  return products.docs
    .filter(doc => doc.id !== id)
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
}
