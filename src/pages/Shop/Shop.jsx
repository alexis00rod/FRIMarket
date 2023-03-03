import { useEffect, useState } from "react"
import { Link, NavLink, useParams } from "react-router-dom"
import { Accordion, ProductsLayout } from "../../components"
import { getCategories, getProducts } from "../../services/firestore"

const SidebarLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `w-full flex items-center justify-between gap-2 hover:text-yellow-500 ${isActive && "text-yellow-500"}`}
      >
      {children}
    </NavLink>
  )
}

export const Shop = () => {
  const { idCategory } = useParams()
  const [products, setProducts] = useState(false)
  const [categories, setCategories] = useState(false)
  const [filters, setFilters] = useState({
    type: 'allTypes',
    brand: 'allBrands',
    minPrice: 0,
    maxPrice: 9999999999,
  })
  const [productsLayout, setProductsLayout] = useState('grid')

  useEffect(() => {
    getCategories(setCategories)
  },[])

  useEffect(() => {
    setFilters({
      ...filters,
      type: 'allTypes',
      brand: 'allBrands'
    })
  },[idCategory])

  useEffect(() => {
    getProducts(idCategory,filters)
      .then(resp => setProducts(resp.docs.map(element => ({
        id: element.id,
        ...element.data()
      }))))
  },[idCategory,filters])

  const handlePrice = ({target: {name,value}}) => {
    const price = name === 'minPrice'
      ? value === '' ? 0 : parseFloat(value)
      : value === '' ? 9999999999 : parseFloat(value)

    setFilters({
      ...filters,
      [name]: price
    })
  }

  const handleFilter = ({target: {name,value}}) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }

  return (
    <div className="grow flex gap-2">
      <aside className="w-full max-w-xs h-max px-2 py-2 flex flex-col flex-none bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
        <Link to='/shop/all' className="px-2 py-2 font-medium hover:text-yellow-500">Todos los productos</Link>
        {/* Categorias */}
        <Accordion title="Categorias">
          {categories && categories.map(category => (
            <SidebarLink 
            key={category.id} 
            to={`/shop/${category.idCategory}`}>
              {category.name}
            </SidebarLink>
          ))}
        </Accordion>
        {/* Tipo */}
        {categories && idCategory !== 'all' &&
          <Accordion title='Tipo'>
            <div className="px-1 py-1">
              <input type="radio" name="type" id="allTypes" defaultValue='allTypes' onChange={handleFilter} checked={filters.type === 'allTypes'} />
              <label htmlFor="allTypes" className="px-1">Todos los tipos</label>
            </div>
            {categories.find(category => category.idCategory === idCategory).types.map(type => (
              <div key={type} className="px-1 py-1">
                <input type="radio" name="type" id={type} onChange={handleFilter} defaultValue={type} checked={filters.type === type} />
                <label htmlFor={type} className='px-1'>{type}</label>
              </div>
            ))}
          </Accordion>
        }
        {/* Marcas */}
        {categories && idCategory !== 'all' &&
          <Accordion title="Marcas">
            <div className="px-1 py-1">
              <input type="radio" name="brand" id="allBrands" defaultValue='allBrands' onChange={handleFilter} checked={filters.brand === 'allBrands'} />
              <label htmlFor="allBrands" className="px-1">Todas las marcas</label>
            </div>
            {categories.find(category => category.idCategory === idCategory).brands.map(brand => (
              <div key={brand} className="px-1 py-1">
                <input type="radio" name="brand" id={brand} onChange={handleFilter} defaultValue={brand} checked={filters.brand === brand} />
                <label htmlFor={brand} className='px-1 capitalize'>{brand}</label>
              </div>
            ))}
          </Accordion>
        }
        {/* Precio */}
        <Accordion title='Precio'>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Escoge un rango</span>
            <div className="flex items-center ">
              <input 
              type="text"
              name="minPrice"
              onChange={handlePrice}
              className="w-2/5 h-8 px-2 flex flex-none border border-gray-300 outline-none rounded-md"
              placeholder="min." />
              <span className="w-1/5 flex justify-center">a</span>
              <input 
              type="text"
              name="maxPrice"
              onChange={handlePrice}
              className="w-2/5 h-8 px-2 flex flex-none border border-gray-300 outline-none rounded-md"
              placeholder="max." />
            </div>
          </div>
        </Accordion>
      </aside>
      <section className="w-full flex flex-col gap-4 px-2">
        {/* Sort */}
        <div className="w-full px-2 py-2 flex items-center gap-2 bg-white border border-gray-300 rounded-md">
          <div className="px-2 grow">
            {products && <span>Mostrando {products.length} resultados</span>}
          </div>
          {/* <div className="px-2 py-2 flex gap-2">
            <label htmlFor="sort">Ordenar por:</label>
            <select id='sort' onChange={handleSort} defaultValue='timestamp'>
              <option value="timestamp">Fecha de publicacion</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="lowPrice">Menor precio</option>
              <option value="highPrice">Mayor precio</option>
            </select>
          </div> */}
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
