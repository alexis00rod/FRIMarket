import { Loader, ProductCard } from "../index.js"

export const ProductsLayout = ({products, layout}) => {

  if(!products) return <Loader />

  return (
    <div className={`w-full grid ${layout === 'grid' ? 'grid-cols-5' : 'grid-cols-1'} gap-4`}>
      {products.map(element => <ProductCard key={element.id} content={element} style={layout} />)}
    </div>
  )
}
