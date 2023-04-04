import { CategoryCard, Loader } from "../index.js"

export const PostProductCategory = ({categories, handle}) => {
  
  if(!categories) return <Loader />

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map(e => <CategoryCard key={e.id}  category={e} onChange={handle} />)}
    </div>
  )
}