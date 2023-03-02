import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage()

// Referencias
const productThumbRef = (name) => ref(storage, `products/${name}`)


export const uploadThumb = async (file) => {
  await uploadBytes(productThumbRef(file.name),file)
  const url = await getDownloadURL(productThumbRef(file.name))
  return url
}