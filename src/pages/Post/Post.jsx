import { useState, useEffect } from "react"
import { PostBrand } from "../../components"
import { getCategories } from "../../services/firestore"

export const Post = () => {
  const [categories, setCategories] = useState([])
  const [productToPost, setProductToPost] = useState({})

  useEffect(() => {
    getCategories(setCategories)
  },[])

  const handleCategory = ({target: {name,id}}) => {
    setProductToPost({
      ...productToPost,
      [name]: id
    })
  }

  const category = categories.find(e => e.idCategory === productToPost.category)

  return (
    <div className="w-full max-w-screen-md mx-auto flex flex-col">
      {!productToPost.category
      ? <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
          <h2 className="px-3 py-3 text-xl font-semibold">Elegir categoria</h2>
          <div className="px-2 py-4 grid grid-cols-3 gap-4">
            {categories.map(e => (
              <div key={e.id}>
                <input type="radio" name="category" id={e.idCategory} onChange={handleCategory} className='hidden' />
                <label 
                htmlFor={e.idCategory}
                className='w-full h-36 px-2 py-2 flex flex-col justify-center items-center bg-yellow-500 text-white rounded-md cursor-pointer'
                >
                  <i className={`w-full h-2/3 flex items-center justify-center flex-none text-4xl fa-solid fa-${e.icon}`}></i>
                  <span className="grow font-medium text-center">{e.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      : <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
          <div className="px-3 py-3 flex items-center gap-2">
            <h2 className="text-xl font-semibold capitalize">{category.name}</h2>
            <button onClick={() => setProductToPost({})} className='px-2 text-sm text-yellow-500 font-medium hover:underline'>Cambiar categoria</button>
          </div>
          <form className="w-full py-2 flex flex-col gap-2 divide-y divide-gray-300">
            <div className="debug mb-2">
              {/* Post Name */}
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='name' className="px-1 text-sm font-medium">Nombre</label>
                <input 
                type="text"
                name='name'
                id='name'
                className="w-full max-w-xs h-8 px-2 border border-gray-300 rounded-md outline-none" 
                />
              </div>
              {/* Post Description */}
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='description' className="px-1 text-sm font-medium">Descripcion</label>
                <textarea 
                name='description' 
                id='description' 
                className="w-full max-w-xs h-24 px-2 py-2 border border-gray-300 rounded-md outline-none resize-none" 
                ></textarea>
              </div>
            </div>
            <div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor="price" className="px-1 text-sm font-medium">Precio:</label>
                <input type="text" name="price" id="price" className="w-full max-w-xs h-8 px-2 border border-gray-300 rounded-md outline-none" />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor="stock" className="px-1 text-sm font-medium">Cantidad:</label>
                <input type="number" name="stock" id="stock" className="w-full max-w-xs h-8 px-2 border border-gray-300 rounded-md outline-none" />
              </div>
            </div>
            {/* Post Thumb */}
            <div className="px-2 py-2 flex flex-col">
              <span className="px-1 text-sm font-medium">Foto</span>
              <input type="file" name='thumb' id='thumb' className="hidden" />
              <label htmlFor='thumb' className="w-20 h-20 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
                <i className="fa-solid fa-camera"></i>
              </label>
            </div>
            <div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor="type" className="px-1 text-sm font-medium">Tipo:</label>
                <select name="type" id="type" className="w-full max-w-xs h-8 px-2 border border-gray-300 rounded-md outline-none">
                {category.types.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
                </select>
              </div>
              {/* Post Brand */}
              <PostBrand 
              selected={productToPost.brand}
              category={category}
              onChange={({target:{id}}) => setProductToPost({...productToPost,brand:id})}
              />
            </div>
            <div className="px-2 py-2 flex flex-col">
              <label htmlFor="location" className="px-1 text-sm font-medium">Ubicacion:</label>
              <select name="location" id="location" className="w-full max-w-xs h-8 px-2 border border-gray-300 rounded-md outline-none">
                <option value="">Tipo 1</option>
                <option value="">Tipo 2</option>
                <option value="">Tipo 3</option>
              </select>
            </div>
            <button className="w-full max-w-btn h-8 px-2 ml-2 flex items-center justify-center gap-2 bg-green-500 text-white rounded-md">
              <i className="fa-solid fa-check"></i>
              <span className="text-sm">Vender producto</span>
            </button>
          </form>
        </div>}
    </div>
  )
}
