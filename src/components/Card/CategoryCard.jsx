export const CategoryCard = ({category, post, ...props}) => {
  const {idCategory, name, icon, products} = category

  return (
    <div className='categoryCard'>
      <input type="radio" name="category" id={idCategory} className="hidden" {...props} />
      <label 
      htmlFor={idCategory} 
      className={`categoryCard-input ${post ? 'categoryCard-post' : 'categoryCard-slider' }`}
      >
        <div className="categoryCard-icon">
          <i className={`fa-solid fa-${icon}`}></i>
        </div>
        <h4 className="categoryCard-title">
          {name}
        </h4>
        {!post && 
        <div className="categoryCard-products">
          <span>{products} productos</span>
        </div>}
      </label>
    </div>
  )
}
