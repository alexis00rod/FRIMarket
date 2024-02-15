import { usePostContext } from "../context/PostContext"

export const PostType = ({category}) => {
  const {productToPost, setProductToPost} = usePostContext()

  return (
    <ul className="ul border-y border-slate-300 divide-y divide-slate-300">
      <li className="py-2 flex items-center">
        <h4 
        onClick={() => setProductToPost({...productToPost,category: ''})}
        className="px-2 w-max line-clamp-1 duration-150 text-blue-500 cursor-pointer hover:text-blue-700"
        >
        {category.name}
        </h4>
      </li>
      {category.types.map((type,i) => 
        <li 
        key={i} 
        onClick={() => setProductToPost({...productToPost,type:type})} 
        className="py-2 flex items-center cursor-pointer duration-150 hover:bg-yellow-500 hover:text-white"
        >
          <h4 className="px-2 grow line-clamp-1">{type}</h4>
          <i className="w-10 flex items-center justify-center fa-solid fa-chevron-right"></i>
        </li>
      )}
    </ul>
  )
}
