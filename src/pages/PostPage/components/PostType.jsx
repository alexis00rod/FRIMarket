import { usePostContext } from "../context/PostContext"

export const PostType = ({category}) => {
  const {productToPost, setProductToPost} = usePostContext()

  return (
    <div className="post-category">
      <h4 onClick={() => setProductToPost({...productToPost,category: ''})}>{category.name}</h4>
      <ul className="post-category-list">
        {category.types.map((type,i) => 
          <li 
          key={i} 
          onClick={() => setProductToPost({...productToPost,type:type})} 
          className="post-category-item"
          >
            {type}
          </li>
        )}
      </ul>
    </div>
  )
}
