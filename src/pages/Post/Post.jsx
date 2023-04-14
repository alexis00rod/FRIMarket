import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addProduct } from "../../services/post"
import { uploadThumb } from "../../services/storage"
import { useCategories } from "../../hooks/useCategories"
import { useProfile } from "../../hooks/useProfile"
import { Loader, Breadcrumb, Button, PostProductDetail, PostProductPrice, PostProductThumb, PostProductLocation, PostProductUser, PostProductCategory, Main, Element } from "../../components"

export const Post = () => {
  const {categories} = useCategories()
  const {profile} = useProfile()
  const [productToPost, setProductToPost] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    profile &&
    setProductToPost({
      ...productToPost,
      user:{
        email: profile. email,
        idUser: profile.idUser,
        displayName: profile.displayName,
        phone: profile.phone,
      },
      location: {
        province: profile.province,
        city: profile.city,
      }
    })
  },[profile])

  const handlePost = ({target: {name,value,id}}) => {
    let key = name === 'category' 
              || name === 'type' 
              || name === 'brand' 
              || name === 'province' 
              || name === 'city'
              ? id 
              : name === 'price'
                || name === 'stock'
                || name === 'phone'
                  ? parseFloat(value)
                  : value 

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
    addProduct(productToPost)
    navigate(`/profile/${profile.idUser}`)
  }

  const category = categories && categories.find(e => e.idCategory === productToPost.category)

  if(!categories && !profile) return <Loader />

  return (
    <>
    <Breadcrumb />
    <Main size='main-size-medium'>
      <Element flex='flex-col'>
        <div className="box-header box-header-underline flex items-center gap-4">
          {!productToPost.category
          ? <h2 className="text-lg font-medium">Elegir categoria</h2>
          : <>
              <h2 className="text-lg font-medium">{category.name}</h2>
              <Button size='btn-m' color='btn-text-yellow' style='btn-text' onClick={() => setProductToPost({})}>
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
                {productToPost.user 
                ? <>
                  <PostProductLocation user={productToPost.location} handle={handlePost} />
                  <PostProductUser user={productToPost.user} handle={handlePost} />
                  </>
                : <Loader />}
              </div>
              <Button icon='check' size='btn-l' color='btn-green' >
                <span className="text-sm font-medium">Publicar producto</span>
              </Button>
            </>}
        </form>
      </Element>
    </Main>
    </>
  )
}
