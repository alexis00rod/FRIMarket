import { Link } from "react-router-dom"
import { useCategories } from "../../hooks/useCategories"

export const DetailCategory = ({category}) => {
  const {categories} = useCategories()
  const productCategory = categories.find(e => e.idCategory === category)

  return (
    <p className='flex items-center gap-2 capitalize'>
      <span className='font-medium'>Categoria: </span>
      {productCategory && <Link to={`/shop/${productCategory.idCategory}`} className="duration-200 hover:text-yellow-500">{productCategory.name}</Link>}
    </p>
  )
}
