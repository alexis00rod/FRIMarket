import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage()

// Referencias
const productThumbRef = (user,name) => ref(storage, `${user}/products/${name}`)
const productToPostImageRef = (user,name) => ref(storage, `${user}/products/${name}`)
const userPhotoRef = (user,name) => ref(storage, `${user}/photo/${name}`)

const productImageRef = (user,product,name) => ref(storage, `${user}/products/${product}/$${name}`)

export const uploadProductImage = async (user,product, file) => {
  await uploadBytes(productImageRef(user,product,file.name),file)
  const url = await getDownloadURL(productImageRef(user,product,file.name))
  return {name: file.name,url}
}

export const uploadThumb = async (user,file) => {
  const {email} = user
  const {name} = file

  await uploadBytes(productThumbRef(email,name),file)
  const url = await getDownloadURL(productThumbRef(email,name))
  return url
}

export const uploadProductToPostImage = async (user,file) => {
  await uploadBytes(productToPostImageRef(user, file.name),file)
  const url = await getDownloadURL(productToPostImageRef(user, file.name))
  return {name: file.name, url}
}

export const deleteProductToPostImage = async (user, name) => {
  await deleteObject(productToPostImageRef(user, name))
  return name
}

// Funcion para subir foto de perfil
export const uploadPhotoProfile = async (user, file) => {
  await uploadBytes(userPhotoRef(user,file.name),file)
  const url = await getDownloadURL(userPhotoRef(user,file.name))
  return url
}