import { Link } from "react-router-dom"
import { useCategories } from "../../../hooks/useCategories"

export const DetailCategory = ({category,type}) => {
  const {categories} = useCategories()

  const productCategory = categories && categories.find(e => e.idCategory === category)

  if(productCategory) {
    return (
      <div className="detail-category">
        <Link to={`/shop/${productCategory.idCategory}`} className='detail-category-link'>{productCategory.name}</Link>
        <span>,</span>
        <Link to={`/shop/${productCategory.idCategory}/${type}`} className='detail-category-link'>{type}</Link>
      </div> 
    )
  }
}
