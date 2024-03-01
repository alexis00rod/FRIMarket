import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useShopContext } from "./context/ShopContext.jsx"
import { getProducts } from "../../services/shop.js"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { ProductsLayout, ProductsList, ShopFilter, Loader, ProductsSort } from "../../components"

export const Shop = () => {
  const { idCategory, idType } = useParams()
  const {filters, setFilters} = useShopContext()
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()
  const [products, setProducts] = useState()

  useEffect(() => {
    setFilters({
      ...filters,
      category: idCategory,
      type: idType,
    })
  },[idCategory,idType])

  useEffect(() => {
    getProducts(filters)
      .then(resp => setProducts(resp.docs.map(product => ({
        id: product.id,
        ...product.data()
      }))))
  },[filters])

  if(!products) return <Loader />

  return (
    <section className="section section-xl">
      {/* Productos controlador */}
      <div className="products-controls wrapper">
        {/* Productos filtro */}
        <div className="grow">
          <ShopFilter />
        </div>
        {/* Productos orden */}
        <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
        {/* Productos layout */}
        <div className="products-controls-layout">
          <ProductsLayout size={cardSize} handle={setCardSize} />
        </div>
      </div>
      {/* Lista de Productos */}
      <ProductsList products={products} sort={productsSort} size={cardSize} maxCols={5}  />
      <div className="w-full px-2 py-4 bg-white border border-slate-300 rounded-md">
        <h3 className="px-2 text-lg font-medium">Mostrando {products.length} productos</h3>
      </div>
    </section>
  )
}
