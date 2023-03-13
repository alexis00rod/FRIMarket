import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { deleteProduct, editProduct, updatePostsUser } from "../../services/firestore"
import { PostPrice } from "../PostPrice/PostPrice"
import { PostStock } from "../PostStock/PostStock"

export const EditProduct = ({product, handle}) => {
  const {userLoggedProfile} = useAuthContext()
  const {id, name, stock, price} = product
  const [changes, setChanges] = useState({})
  const navigate = useNavigate()

  const submitChanges = e => {
    e.preventDefault()
    editProduct(product,changes)
    handle(false)
  }

  const handleDeleteProduct = e => {
    e.preventDefault()
    deleteProduct(id)
    updatePostsUser(userLoggedProfile,'remove')
    navigate('/shop/all')
  }

  return (
    <div className="fixed top-24 left-0 bottom-0 z-10 w-full flex justify-center items-center bg-gray-900/25" onClick={() => handle(false)}>
      <div  className="w-full max-w-screen-md h-max px-2 py-2 flex flex-col bg-white divide-y divide-gray-300 rounded-md" onClick={e => e.stopPropagation()}>
        <div className="w-full px-2 py-2 flex items-center">
          <h2 className='grow text-xl font-medium line-clamp-1'>{name}</h2>
          <button className="w-8 h-8 flex items-center justify-center" onClick={() => handle(false)}>
            <i className="fa solid fa-x"></i>
          </button>
        </div>
        <form className="px-2 py-2" onSubmit={submitChanges}>
          <PostStock defaultValue={stock} onChange={({target: {name,value}}) => setChanges({...changes,[name]:parseFloat(value)})} />
          <PostPrice defaultValue={price} onChange={({target: {name,value}}) => setChanges({...changes,[name]:parseFloat(value)})} />
          <div className="px-2 py-2 flex gap-2">
            <button 
            className="w-full max-w-btn h-8 flex justify-center items-center gap-2 bg-red-500 text-white rounded-md"
            title="Eliminar producto"
            onClick={handleDeleteProduct}
            >
              <i className="fa-solid fa-trash"></i>
              <span className="text-sm">Eliminar producto</span>
            </button>
            <button 
            type="submit" 
            className="w-full max-w-btn h-8 flex justify-center items-center gap-2 bg-green-500 text-white rounded-md"
            title="Guardar cambios"
            >
              <i className="fa-solid fa-check"></i>
              <span className="text-sm">Guardar cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
