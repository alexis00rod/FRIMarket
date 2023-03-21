import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductsLayout, ProductsList, ProductsSort, ShopFiltersMenu } from "../../components"
import { useShopContext } from "../../context/ShopContext/ShopContext"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { getProducts } from "../../services/firestore"

export const Shop = () => {
  const { idCategory } = useParams()
  const {filters, categories} = useShopContext()
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()
  const [products, setProducts] = useState(false)
  const [filterMenu, setFilterMenu] = useState(false)

  useEffect(() => {
    getProducts(idCategory,filters)
      .then(resp => setProducts(resp.docs.map(element => ({
        id: element.id,
        ...element.data()
      }))))
  },[idCategory,filters])

  const category = categories && categories.find(category => category.idCategory === idCategory)

  return (
    <div className="grow flex gap-2">
      <section className="w-full flex flex-col gap-4 px-2">
        <div className="w-full px-2 py-2 flex items-center gap-2 bg-white border border-gray-300 rounded-md">
          {/* Products filter btn */}
          <button className="w-max h-8 px-2 flex items-center gap-2 hover:text-blue-500" onClick={() => setFilterMenu(!filterMenu)}>
            <i className="fa-solid fa-sliders"></i>
            <span className="text-sm">Filtros</span>
          </button>
          {/* Products length */}
          {products && <h2 className="px-2 py-1 grow">Mostrando {products.length} resultados</h2>}
          {/* Products sort */}
          <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)}/>
          {/* Products layout */}
          <ProductsLayout size={cardSize}  onChange={({target:{id}}) => setCardSize(id)} />
        </div>
        {/* Products list */}
        <ProductsList products={products} sort={productsSort} size={cardSize} maxCols={5}  />
      </section>
      {filterMenu && <ShopFiltersMenu handle={setFilterMenu} category={category} />}
    </div>
  )
}
