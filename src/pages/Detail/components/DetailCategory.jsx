import { Link } from "react-router-dom"
import { useCategories } from "../../../hooks/useCategories"

export const DetailCategory = ({category,type}) => {
  const {categories} = useCategories()

  const productCategory = categories && categories.find(e => e.idCategory === category)

  if(productCategory) {
    return (
      <div className="flex flex-wrap px-2">
        <Link to={`/shop/${productCategory.idCategory}`} className='w-max text-sm hover:text-yellow-500'>{productCategory.name}</Link>
        <span className='ml-[2px] mr-[5px]'>,</span>
        <Link to={`/shop/${productCategory.idCategory}/${type}`} className='w-max text-sm hover:text-yellow-500'>{type}</Link>
      </div> 
    )
  }
}
