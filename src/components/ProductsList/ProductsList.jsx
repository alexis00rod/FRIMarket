import { Loader, ProductCard } from "../index.js"

export const ProductsList = ({products, sort, size, maxCols}) => {
  const order = (a, b) => {
    if(sort === 'highPrice') {
      if(a.price < b.price) return 1
      if(a.price > b.price) return -1
      return 0
    }
    if(sort === 'lowPrice') {
      if(a.price > b.price) return 1
      if(a.price < b.price) return -1
      return 0
    }
    if(sort === 'postDate') {
      if(a.timestamp < b.timestamp) return 1
      if(a.timestamp > b.timestamp) return -1
      return 0
    }
  }

  if(!products) return <Loader />

  return (
    <div className={`w-full
      grid ${size !== 'l' 
      ? `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
          ${maxCols === 5 && 'lg:grid-cols-5'}` 
      : 'grid-cols-1'}
      gap-4
    `}>
      {products.sort(order).map(element => <ProductCard key={element.id} content={element} size={size} />)}
    </div>
  )
}
