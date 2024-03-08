import { useState } from "react"
import { usePostContext } from "../context/PostContext"

export const PostCategory = ({categories}) => {
  const {productToPost, setProductToPost} = usePostContext()
  const [searchCategory, setSearchCategory] = useState()

  return (
    <div className="post-category">
      <div className="post-category-search">
        <input 
        type="text" 
        name="search" 
        id="search" 
        value={searchCategory || ''}
        onChange={({target: {value}}) => setSearchCategory(value)}
        className="navbar-search-input"
        placeholder='Buscar categoría'
        />
        <button className="btn btn-gray btn-s" >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <ul className="post-category-list">
        {searchCategory
        ? categories.filter(e => e.name.toLowerCase().includes(searchCategory.toLowerCase())).map(category => (
          <li
            key={category.id}
            className="post-category-item"
            onClick={() => setProductToPost({...productToPost,category:category.idCategory})}
            >
              {category.name}
            </li>
        ))
        : categories.map(category => (
            <li
            key={category.id}
            className="post-category-item"
            onClick={() => setProductToPost({...productToPost,category:category.idCategory})}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  )
}
