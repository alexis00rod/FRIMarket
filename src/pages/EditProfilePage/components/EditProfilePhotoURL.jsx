import { useState } from "react"
import { Loader } from "../../../components"
import { uploadPhotoProfile } from "../../../services/storage"
import { updatePhotoURL } from "../../../services/user"

export const EditProfilePhotoURL = ({profile}) => {
  const {photoURL, id} = profile
  const [photoError, setPhotoError] = useState()
  const [photo, setPhoto] = useState(photoURL)

  const handlePhotoURL = async ({target:{files}}) => {
    const file = files[0]
    setPhoto(false)
    if (file) {
      const fileSize = file.size / (1024 * 1024)
      if (fileSize > 1) {
        setPhotoError('La imagen es demasiado grande.')
        setPhoto(photoURL)
        return
      } 
      if (!file.type.startsWith('image/')) {
        setPhotoError('El archivo seleccionado no es una imagen.');
        setPhoto(photoURL)
        return
      }
      setPhotoError('')

      try {
        const url = await uploadPhotoProfile(id,file)
        await updatePhotoURL(id,url)
        setPhoto(url)
      } catch (err) {
        setPhotoError("Hubo un error al subir la imagen. Por favor, inténtalo de nuevo.")
        setPhoto(photoURL)
      }
    }
  }

  return (
    <div className="w-[80px] h-[80px] flex flex-none">
      {photo
      ? <>
          <input 
          type="file" 
          name="photoURL" 
          id="photoURL" 
          accept="image/*"
          className="hidden"
          onChange={handlePhotoURL}
          />
          <label htmlFor="photoURL" className="relative w-full h-full flex cursor-pointer">
            <img src={photo} alt={id} className="w-full h-full object-cover rounded-full border border-gray-300" />
            <div className="absolute -bottom-1 -right-1 z-20 w-[30px] h-[30px] flex items-center justify-center flex-none bg-white border border-gray-300 rounded-full">
              <i className="fa-solid fa-camera text-gray-500"></i>
            </div>
            {photoError && 
              <p className="absolute -bottom-1 left-full w-max pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="pl-2 font-medium">{photoError}</span>
              </p>}
          </label>
        </>
      : <Loader />}
    </div>
  )
}
