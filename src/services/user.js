import { getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { userRef, usersRef } from "./firestore"

// Funcion para verificar si existe usuario
export const existsUser = async (email) => {
  const userSnap = await getDoc(userRef(email))
  return userSnap.exists()
}

// Funcion para agregar usuario
export const addProfile = async (profile) => {
  const {email} = profile
  return await setDoc(userRef(email),{
    ...profile,
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/frimarket-f4864.appspot.com/o/default-photo.jpg?alt=media&token=3e1260ff-94b2-4aac-ad45-777e4ce704c1',
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

// Funcion para actualizar contador de publicaciones del usuario
export const updatePostsUser = async ({email,posts},action) => {
  const addPost = posts ? posts + 1 : 1
  const removePost = posts - 1
  await updateDoc(userRef(email),{
    posts : action === 'add' ? addPost : removePost
  })
}

// Funcion para actualizar informacion de usuario
export const updateProfileInfo = async (email,newProfile) => await updateDoc(userRef(email),newProfile)

// Funcion para obtener usuarios
export const getUsers = async (province,sort) => {
  const order = sort === 'sales'
    ? orderBy('sales','desc')
    : sort === 'posts'
      ? orderBy('posts','desc')
      : sort === 'new'
        ? orderBy('joined','desc')
        : orderBy('joined','asc')

  const users = province === 'all'
    ? query(usersRef,order)
    : query(usersRef,where('province','==',province),order)

  return await getDocs(users)
}

// Funcion para obtener ventas de un usuario
export const getUserSales = async (id) => {
  const user = await getDoc(userRef(id))
  const data = await user.data()
  return data.sales ? data.sales : 0
}

// Funcion para actualizar ventas del usuario
export const updateUserSales = (products) => {
  products.forEach(async e => {
    const {user:{email}} = e
    const sales = await getUserSales(email)
    return await updateDoc(userRef(email),{
      sales : sales ? sales + 1 : 1
    })
  })
}