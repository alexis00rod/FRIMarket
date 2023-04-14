import { deleteDoc, getDocs, limit, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { productRef, productsRef } from "./firestore";

// Funcion para obtener productos
// Corregir filtro provincia
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
    products = query(productsRef,where('location','array-contains',province),where('price','>=',minPrice),where('price','<=',maxPrice))
    // products = query(productsRef,where('province','==',province),where('price','>=',minPrice),where('price','<=',maxPrice))
  }
  if(category !== 'all' && province !== 'allProvinces') {
    products = query(productsRef,where('category','==',category),where('location','array-contains',province),where('price','>=',minPrice),where('price','<=',maxPrice))
    // products = query(productsRef,where('category','==',category),where('province','==',province),where('price','>=',minPrice),where('price','<=',maxPrice))
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
    products = query(productsRef,where('type','==',type),where('brand','==',brand),where('location','array-contains',province),where('price','>=',minPrice),where('price','<=',maxPrice))
    // products = query(productsRef,where('type','==',type),where('brand','==',brand),where('province','==',province),where('price','>=',minPrice),where('price','<=',maxPrice))
  }

  return await getDocs(products)
}

// Funcion para actualizar producto
export const updateProduct = (products) => {
  products.forEach(async e => {
    const {id, qty, stock, sales} = e
    return await updateDoc(productRef(id),{
      sales: sales ? sales + qty : qty,
      stock: stock - qty
    })
  })
}

// Funcion para obtener detalles del producto
export const getProductDetail = (id,obs) => {
  onSnapshot(productRef(id),(snap => {
    obs({id:snap.id,...snap.data()})
  }))
}

// Funcion para obtener publicaciones de un usuario
export const getUserProducts = ({displayName,email,idUser,phone}) => {
  const userDoc = {displayName,email,idUser,phone}
  const q = query(productsRef,where('user','==',userDoc))
  return getDocs(q)
}

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

// Funcion para borrar producto
export const deleteProduct = async (product) => await deleteDoc(productRef(product))

// Funcion para editar producto
export const editProduct = async (product, changes) => {
  const {id} = product
  await updateDoc(productRef(id),changes)
}

// Funcion para obtener productos destacados
export const getFeaturedProducts = async (category) => {
  const q = query(productsRef,where('category','==',category),orderBy('price','desc'),limit(7))
  return await getDocs(q)
}

export const getSimilarProducts = async (product) => {
  const {idProduct, type} = product
  const q = query(productsRef,where('type','==',type),where('idProduct','!=',idProduct),limit(5))
  return await getDocs(q)
}

export const getSpecialProducts = async () => {
  const q = query(productsRef,orderBy('price','asc'),limit(4))
  return await getDocs(q)
}