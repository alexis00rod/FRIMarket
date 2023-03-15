import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductsLayout, ShopFiltersMenu } from "../../components"
import { useShopContext } from "../../context/ShopContext/ShopContext"
import { getProducts } from "../../services/firestore"

export const Shop = () => {
  const { idCategory } = useParams()
  const {filters, setFilters, categories} = useShopContext()
  const [products, setProducts] = useState(false)
  const [productsLayout, setProductsLayout] = useState('grid')
  const [filterMenu, setFilterMenu] = useState(false)

  useEffect(() => {
    setFilters({
      ...filters,
      type: 'allTypes',
      brand: 'allBrands',
      province: 'allProvinces'
    })
  },[idCategory])

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
      {filterMenu && <ShopFiltersMenu handle={setFilterMenu} category={category} />}
      <section className="w-full flex flex-col gap-4 px-2">
        <div className="w-full px-2 py-2 flex items-center gap-2 bg-white border border-gray-300 rounded-md">
          <button className="w-max h-8 px-2 flex items-center gap-2 hover:text-blue-500" onClick={() => setFilterMenu(!filterMenu)}>
            <i className="fa-solid fa-sliders"></i>
            <span className="text-sm">Filtros</span>
          </button>
          <div className="px-2 grow">
            {products && <span>Mostrando {products.length} resultados</span>}
          </div>
          <div className="px-1 py-1 flex">
            <button 
            className={`w-8 h-8 flex items-center justify-center ${productsLayout === 'grid' ? 'text-blue-500' : 'text-gray-500'}`}
            title="Cuadricula"
            onClick={() => setProductsLayout('grid')}
            >
              <i className="fa-solid fa-table-cells"></i>
            </button>
            <button
            className={`w-8 h-8 flex items-center justify-center ${productsLayout === 'list' ? 'text-blue-500' : 'text-gray-500'}`}
            title="Lista"
            onClick={() => setProductsLayout('list')}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>
        {/* Products list */}
        <ProductsLayout products={products} layout={productsLayout} />
      </section>
    </div>
  )
}
