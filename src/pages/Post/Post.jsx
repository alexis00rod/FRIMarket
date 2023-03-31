import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addProduct, updatePostsUser } from "../../services/firestore"
import { uploadThumb } from "../../services/storage"
import { useCategories } from "../../hooks/useCategories"
import { useProfile } from "../../hooks/useProfile"
import { Loader, Breadcrumb, Button, PostProductDetail, PostProductPrice, PostProductThumb, PostProductLocation, PostProductUser, PostProductCategory } from "../../components"

export const Post = () => {
  const {categories} = useCategories()
  const {profile} = useProfile()
  const [productToPost, setProductToPost] = useState({})
  const navigate = useNavigate()

  const handlePost = ({target: {name,value,id}}) => {
    let key = name === 'category' 
              || name === 'type' 
              || name === 'brand' 
              || name === 'province' 
              || name === 'city'
              ? id :value 

    setProductToPost({
      ...productToPost,
      [name]: key
    })
  }

  const handleThumb = ({target: {name,files}}) => {
    uploadThumb(profile,files[0])
    .then(resp => setProductToPost({...productToPost,[name]:resp}))
  }

  const submitProductToPost = e => {
    e.preventDefault()
    console.log(productToPost)
    // addProduct({
    //   ...productToPost,
    //   idProduct:productToPost.name.toLowerCase().replace(' ','-'),
    //   idUser: userLoggedProfile.email,
    //   province: userLoggedProfile.province
    // })
    // updatePostsUser(userLoggedProfile,'add')
    // navigate(`/profile/${userLoggedProfile.idUser}`)
  }

  const category = categories && categories.find(e => e.idCategory === productToPost.category)

  if(!categories && !profile) return <Loader />

  // console.log(productToPost)

  return (
    <>
    <Breadcrumb />
    <main>
      <div className="box box-form flex flex-col">
        <div className="box-header flex items-center gap-4">
          {!productToPost.category
          ? <h2 className="text-lg font-medium">Elegir categoria</h2>
          : <>
              <h2 className="text-lg font-medium">{category.name}</h2>
              <Button size='btn-m' color='btn-black' onClick={() => setProductToPost({})}>
                <span className="text-sm font-medium">Cambiar categoria</span>
              </Button>
            </>}
        </div>
        <form className="box-body flex flex-col items-center gap-4" onSubmit={submitProductToPost}>
          {!productToPost.category
          ? <PostProductCategory categories={categories} handle={handlePost} />
          : <>
              <div className="w-full flex flex-col divide-y divide-gray-300">
                <PostProductDetail category={category} product={productToPost} handle={handlePost} />
                <PostProductPrice product={productToPost} handle={handlePost} />
                <PostProductThumb product={productToPost} handle={handleThumb} />
                <PostProductLocation profile={profile} product={productToPost} handle={handlePost} />
                <PostProductUser profile={profile} product={productToPost} handle={handlePost} />
              </div>
              <Button type='submit' icon='check' size='btn-l' color='btn-green' >
                <span className="text-sm font-medium">Publicar producto</span>
              </Button>
            </>}
        </form>
      </div>
    </main>
    </>
  )
}
