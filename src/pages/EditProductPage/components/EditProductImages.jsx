import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { uploadProductImage } from "../../../services/storage"
import { editProductDoc } from "../../../services/shop"
import { ButtonLoader } from "../../../components"

export const EditProductImages = ({user,product}) => {
  const [editProduct, setEditProduct] = useState(false)
  const [imagesProduct, setImagesProduct] = useState(product.images)
  const [imagesProductLoader, setImagesProductLoader] = useState(false)

  const onDrop = useCallback(async acceptedFiles => {
    try {
      const images = []
      for (const file of acceptedFiles) {
        const idProduct = product.id
        const img = await uploadProductImage(user,idProduct,file)
        images.push(img)
      }
      setImagesProduct(prev => [...prev, ...images])
    } catch (err) {
      alert(err)
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleSubmitImagesProduct = async () => {
    setImagesProductLoader(true)
    try {
      await editProductDoc(product,{images: imagesProduct})
      setImagesProductLoader(false)
      setEditProduct(false)
    } catch (err) {
      alert(err)
      setImagesProductLoader(false)
    }
  }

  const handleDeleteImage = (img) => {
    setImagesProduct(imagesProduct.filter(e => e.url !== img.url))
  }

  const disabledEditImages = (array1, array2) => {
    if (array1.length !== array2.length) {
      return false
    }

    const sortedArray1 = array1.slice().sort()
    const sortedArray2 = array2.slice().sort()

    for (let i = 0; i < sortedArray1.length; i++) {
      const obj1String = JSON.stringify(sortedArray1[i])
      const obj2String = JSON.stringify(sortedArray2[i])
  
      if (obj1String !== obj2String) {
        return false
      }
    }
  
    return true
  }

  return (
    <div className="editProduct-accordion">
      <div className="editProduct-accordion-handle" onClick={() => setEditProduct(!editProduct)}>
        <div className="editProduct-accordion-title">
          <span>Fotos</span>
          <h4>
            {editProduct
            ? 'Suma fotos de tu producto'
            : `Hay ${product.images.length} fotos`}
          </h4>
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      {editProduct &&
        <div className="editProduct-accordion-expand">
          <div className="editProduct-item flex flex-wrap gap-4">
            {imagesProduct.map((img,i) => 
              <picture 
              key={i} 
              className={`relative w-32 h-32 flex items-center justify-center flex-none border border-slate-300 rounded-md overflow-hidden`}
              >
                <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
                <button 
                onClick={() => handleDeleteImage(img)}
                className="absolute top-1 right-1 z-20 btn btn-s btn-red"
                disabled={imagesProduct.length === 1}
                title={imagesProduct.length === 1 ? 'Tu producto debe tener almenos una foto' : ''}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </picture>)}
              <div {...getRootProps()} 
              className={`w-32 h-32 flex flex-col items-center justify-center text-slate-300 ${isDragActive ? 'border-2' : 'border'} border-dashed border-slate-300 rounded-md cursor-pointer duration-150 hover:border-blue-500 hover:text-blue-500`}
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
          <div className="editProduct-buttons">
            <button 
            className="btn btn-text-blue btn-text btn-m"
            onClick={() => setImagesProduct(product.images)}
            disabled={disabledEditImages(product.images, imagesProduct)}
            >
              Cancelar
            </button>
            {imagesProductLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-blue btn-text btn-m"
              onClick={handleSubmitImagesProduct}
              disabled={disabledEditImages(product.images, imagesProduct)}
              >
                Confirmar
              </button>}
          </div>
        </div>}
    </div>
  )
}
