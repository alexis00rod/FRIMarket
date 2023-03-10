import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage()

// Referencias
const productThumbRef = (user,name) => ref(storage, `${user}/products/${name}`)
const userPhotoRef = (user,name) => ref(storage, `${user}/photo/${name}`)

export const uploadThumb = async (user,file) => {
  const {email} = user
  const {name} = file

  await uploadBytes(productThumbRef(email,name),file)
  const url = await getDownloadURL(userPhotoRef(email,name))
  return url
}

export const uploadUserPhoto = async (user,file) => {
  const {email} = user
  const {name} = file

  await uploadBytes(userPhotoRef(email,name),file)
  const url = await getDownloadURL(userPhotoRef(email,name))
  return url
}