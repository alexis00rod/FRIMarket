import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage()

// Referencias
const productThumbRef = (name) => ref(storage, `products/${name}`)
const userPhotoRef = (name) => ref(storage, `users/${name}`)


export const uploadThumb = async (file) => {
  await uploadBytes(productThumbRef(file.name),file)
  const url = await getDownloadURL(productThumbRef(file.name))
  return url
}

export const uploadToStorage = async (file) => {
  const {name} = file
  await uploadBytes(userPhotoRef(name),file)
  const url = await getDownloadURL(userPhotoRef(name))
  return url
}