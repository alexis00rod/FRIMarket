import { usePostContext } from "../context/PostContext"

export const PostCategory = ({categories}) => {
  const {productToPost, setProductToPost} = usePostContext()

  return (
    <ul className="flex flex-col border-y border-slate-300 divide-y divide-slate-300">
      {categories.map(category => (
        <li 
        key={category.id} 
        onClick={() => setProductToPost({...productToPost,category:category.idCategory})}
        className="py-2 flex items-center cursor-pointer duration-150 hover:bg-yellow-500 hover:text-white"
        >
          <i className={`w-10 flex items-center justify-center flex-none fa-solid fa-${category.icon}`}></i>
          <h4 className="grow line-clamp-1">{category.name}</h4>
          <i className="w-10 flex items-center justify-center fa-solid fa-chevron-right"></i>
        </li>
      ))}
    </ul>
  )
}
