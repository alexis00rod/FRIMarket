export const CategoryCard = ({variant, active, category, post, ...props}) => {
  const {idCategory, name, icon, products} = category

  return (
    <div className='categoryCard'>
      <input type="radio" name="category" id={idCategory} className="hidden" {...props} />
      <label 
      htmlFor={idCategory} 
      className={`categoryCard-input ${variant === 'slider' ? 'categoryCard-slider' : 'categoryCard-post'} ${active === idCategory && 'categoryCard-active'}`}
      >
        <div className="categoryCard-icon">
          <i className={`fa-solid fa-${icon}`}></i>
        </div>
        <h4 className="categoryCard-title">
          {name}
        </h4>
        {variant === 'slider' && 
        <div className="categoryCard-products">
          <span>{products} productos</span>
        </div>}
      </label>
    </div>
  )
}
