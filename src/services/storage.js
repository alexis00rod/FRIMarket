import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage()

// Referencias
const productThumbRef = (user,name) => ref(storage, `${user}/products/${name}`)
const productToPostImageRef = (user,name) => ref(storage, `${user}/products/${name}`)
const userPhotoRef = (user,name) => ref(storage, `${user}/photo/${name}`)

export const uploadThumb = async (user,file) => {
  const {email} = user
  const {name} = file

  await uploadBytes(productThumbRef(email,name),file)
  const url = await getDownloadURL(productThumbRef(email,name))
  return url
}

export const uploadUserPhoto = async (user,file) => {
  const {email} = user
  const {name} = file

  await uploadBytes(userPhotoRef(email,name),file)
  const url = await getDownloadURL(userPhotoRef(email,name))
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