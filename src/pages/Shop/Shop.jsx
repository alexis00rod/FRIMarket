import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbLink, Button, ProductsLayout, ProductsList, SelectProductsSort, ShopFiltersMenu } from "../../components"
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
    <>
      <Breadcrumb>
        {category && <BreadcrumbLink name={category.name} />}
        {filters.type !== 'allTypes' && <BreadcrumbLink name={filters.type} />}
      </Breadcrumb>
      <main>
        <section className="w-full px-1 md:px-2 flex flex-col gap-2 md:gap-4">
          <div className="box flex items-center flex-wrap">
            <Button icon='sliders' size='btn-m' color='btn-white' onClick={() => setFilterMenu(!filterMenu)}  >
              Filtros
            </Button>
            <div className="flex justify-end gap-2 md:gap-4 grow">
              <SelectProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
              <ProductsLayout size={cardSize} handle={setCardSize} />
            </div>
          </div>
          {/* Products list */}
          <ProductsList products={products} sort={productsSort} size={cardSize} maxCols={5}  />
          <div className="box">
            {products && <h2 className="px-2 py-1 grow">Mostrando {products.length} resultados</h2>}
          </div>
        </section>
        {filterMenu && <ShopFiltersMenu handle={setFilterMenu} category={category} />}
      </main>
    </>
  )
}
