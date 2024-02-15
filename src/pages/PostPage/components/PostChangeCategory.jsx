import { useState } from "react"
import { usePostContext } from "../context/PostContext"
import { Select, SelectItem } from "../../../components"

export const PostChangeCategory = ({categories, category}) => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const [changeCategory, setChangeCategory] = useState(false)
  const {type} = productToPost

  const handleType = ({target:{id}}) => {
    setProductToPost({
      ...productToPost,
      type: id
    })
    setChangeCategory(false)
  }

  return (
    <div className="mt-6 mb-1.5">
      <div className="w-full flex items-center">
        <h3 className="py-3 text-lg grow font-medium">Categoría</h3>
          {!changeCategory &&
            <button className="btn btn-m btn-text-yellow" onClick={() => setChangeCategory(true)}>
              <i className="fa-solid fa-pen"></i>
              <span className="hidden md:flex text-sm font-medium">Modificar</span>
            </button>}
      </div>
      <div className="relative">
        {!changeCategory &&
          <p className="text-gray-500 font-medium">
            <span className="underline">{category && category.name}</span> {'>'} {type}
          </p>}
        {changeCategory &&
          <div className="flex flex-wrap gap-4">
            <Select selected={category && category.name}>
              {categories.map(e => 
              <SelectItem
              key={e.id}
              name='category' 
              id={e.idCategory} 
              onChange={({target: {id}}) => setProductToPost({...productToPost,category:id,type:'',brand: ''})}
              >
                {e.name}
              </SelectItem>)}
            </Select>
            <Select selected={type}>
              {category && category.types.map((e,i) => 
                <SelectItem
                key={i}
                name='type'
                id={e}
                onChange={handleType}
                >
                  {e}
                </SelectItem>)}
            </Select>
          </div>}
        {productToPostError.includes('type')  &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Completa a qué categoría pertenece el producto.</span>
          </p>}
      </div>
    </div>
  )
}
