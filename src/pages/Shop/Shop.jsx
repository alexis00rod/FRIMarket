import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useShopContext } from "../../context/ShopContext/ShopContext"
import { getProducts } from "../../services/shop.js"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { Breadcrumb, BreadcrumbLink, Button, Element, ProductsLayout, ProductsList, SelectProductsSort, ShopFilter, Main } from "../../components"

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
      <Main>
        <Element flex='flex-col md:flex-row md:items-center gap-2 md:gap-4'>
          <div className="grow">
            <Button icon='sliders' size='btn-m' color='btn-white' onClick={() => setFilterMenu(!filterMenu)}  >
              Filtros
            </Button>
          </div>
          <SelectProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
          <div className="absolute top-0 right-0 md:static px-2 py-2 ">
            <ProductsLayout size={cardSize} handle={setCardSize} />
          </div>
        </Element>
        <ProductsList products={products} sort={productsSort} size={cardSize} maxCols={5}  />
        <Element>
          {products && <h3 className='box-header grow text-lg font-semibold'>Mostrando {products.length} resultados</h3>}
        </Element>
      {filterMenu && <ShopFilter handle={setFilterMenu} category={category} />}
      </Main>
    </>
  )
}
