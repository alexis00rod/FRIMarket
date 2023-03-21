import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addProduct, updatePostsUser } from "../../services/firestore"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { uploadThumb } from "../../services/storage"
import { PostBrand, PostType, PostThumb, PostCategory, PostName, PostDescription, PostPrice, PostStock, Loader } from "../../components"
import { serverTimestamp } from "firebase/firestore"
import { useCategories } from "../../hooks/useCategories"

export const Post = () => {
  const {categories} = useCategories()
  const [productToPost, setProductToPost] = useState({})
  const navigate = useNavigate()
  const {userLoggedProfile} = useAuthContext()

  const handleCategory = ({target: {name,id}}) => {
    setProductToPost({
      ...productToPost,
      [name]: id
    })
  }

  const handleThumb = ({target: {files}}) => {
    uploadThumb(userLoggedProfile,files[0])
    .then(resp => setProductToPost({...productToPost,thumb:resp}))
  }

  const postProduct = e => {
    e.preventDefault()
    addProduct({
      ...productToPost,
      timestamp: serverTimestamp(),
      idProduct:productToPost.name.toLowerCase().replace(' ','-'),
      idUser: userLoggedProfile.email,
      province: userLoggedProfile.province
    })
    updatePostsUser(userLoggedProfile,'add')
    navigate(`/profile/${userLoggedProfile.idUser}`)
  }

  const category = categories && categories.find(e => e.idCategory === productToPost.category)

  if(!categories) return <Loader />

  return (
    <div className="w-full max-w-screen-md mx-auto flex flex-col">
      {!productToPost.category
      ? <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
          <h2 className="px-3 py-3 text-xl font-semibold">Elegir categoria</h2>
          <div className="px-2 py-4 grid grid-cols-3 gap-4">
            {categories.map(e => <PostCategory key={e.id} category={e} onChange={handleCategory} />)}
          </div>
        </div>
      : <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
          <div className="px-3 py-3 flex items-center gap-2">
            <h2 className="text-xl font-semibold capitalize">{category.name}</h2>
            <button onClick={() => setProductToPost({})} className='px-2 text-sm text-yellow-500 font-medium hover:underline'>Cambiar categoria</button>
          </div>
          <form className="w-full py-2 flex flex-col gap-2 divide-y divide-gray-300" onSubmit={postProduct}>
            <div className="mb-2">
              {/* Post Name */}
              <PostName onChange={({target:{value}}) => setProductToPost({...productToPost,name:value})} />
              {/* Post Description */}
              <PostDescription onChange={({target:{value}}) => setProductToPost({...productToPost,description:value})} />
            </div>
            <div className="mb-2">
              {/* Post Price */}
              <PostPrice onChange={({target:{value}}) => setProductToPost({...productToPost,price:parseFloat(value)})} />
              {/* Post Stock */}
              <PostStock onChange={({target:{value}}) => setProductToPost({...productToPost,stock:parseFloat(value)})} />
            </div>
            {/* Post Thumb */}
            <PostThumb
            selected={productToPost.thumb}
            onChange={handleThumb}
            />
            <div className="mb-2">
              {/* Post Type */}
              <PostType 
              selected={productToPost.type} 
              category={category}
              onChange={({target:{id}}) => setProductToPost({...productToPost,type:id})}
              />
              {/* Post Brand */}
              <PostBrand 
              selected={productToPost.brand}
              category={category}
              onChange={({target:{id}}) => setProductToPost({...productToPost,brand:id})}
              />
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
