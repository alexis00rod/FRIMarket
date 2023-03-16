import { Loader, ProductCard } from "../index.js"

export const ProductsLayout = ({products, layout, sort}) => {

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
    <div className={`w-full grid ${layout === 'grid' ? 'grid-cols-5' : 'grid-cols-1'} gap-4`}>
      {products.sort(order).map(element => <ProductCard key={element.id} content={element} style={layout} />)}
    </div>
  )
}
