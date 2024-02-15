import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { usePostContext } from "../context/PostContext"
import { deleteProductToPostImage, uploadProductToPostImage } from "../../../services/storage"

export const PostImages = ({profile}) => {
  const {productToPost, setProductToPost} = usePostContext()
  const {images} = productToPost

  const onDrop = useCallback(async acceptedFiles => {
    try {
      for (const file of acceptedFiles) {
        const email = profile.email
        const img = await uploadProductToPostImage(email,file)
        setProductToPost(docs => ({
          ...productToPost,
          images: [...(docs.images || []), img]
        }))
      }
    } catch (err) {
      console.log(err)
    }
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleDeleteProductToPostImage = async (user,name) =>{
    try {
      await deleteProductToPostImage(user,name)
      setProductToPost(docs => ({
        ...productToPost,
        images: (docs.images || []).filter((img) => img.name !== name)
      }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Sube Fotos</h3>
      <div className="flex gap-4 flex-wrap">
        {images?.map((img,i) => 
          <picture 
          key={i} 
          className={`relative ${i === 0 ? 'w-52 h-52' : 'w-32 h-32'} flex items-center justify-center flex-none border border-slate-300 rounded-md overflow-hidden`}
          >
            <img src={img.url} alt={img.name} className="" />
            <button 
            onClick={() => handleDeleteProductToPostImage(profile.email,img.name)}
            className="absolute top-1 right-1 z-20 w-8 h-8 flex items-center justify-center text-white bg-red-500 rounded-full duration-150 hover:bg-red-700">
              <i className="fa-solid fa-trash"></i>
            </button>
          </picture>)}
        <div {...getRootProps()} 
        className={`${images?.length ? 'w-32 h-32' : 'w-full h-52'} flex flex-col items-center justify-center text-slate-300 ${isDragActive ? 'border-2' : 'border'} border-dashed border-slate-300 rounded-md cursor-pointer duration-150 hover:border-blue-500 hover:text-blue-500`}
        >
          <input {...getInputProps()} />
          {isDragActive 
          ? <p className="text-center text-lg font-medium">Arrastra tu fotos aquí para cargarlos</p> 
          : <>
              <i className="text-3xl fa-solid fa-camera"></i>
              <p className="flex flex-col text-center text-sm font-medium">Cargar fotos <span className="text-xs font-regular"> o arrastrar y soltar aquí</span></p>
            </>}
        </div>
      </div>
    </div>
  )
}
