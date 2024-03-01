import { useState } from "react"
import { Link } from "react-router-dom"
import { useShopContext } from "../context/ShopContext.jsx"
import { useCategories } from "../../../hooks/useCategories.jsx"
import { useLocations } from "../../../hooks/useLocations.jsx"
import { Accordion, Loader, Modal, ShopPriceRange } from "../../../components/index.js"

export const ShopFilter = () => {
  const {filters, cleanFilters, setFilters} = useShopContext()
  const {categories} = useCategories()
  const {locations} = useLocations()
  const [filterMenu, setFilterMenu] = useState(false)

  const brands = categories && filters.category && categories.find(e => e.idCategory === filters.category)?.brands

  if(!categories && !locations) return <Loader />

  return (
    <>
    <button className="w-max h-[40px] px-2 flex items-center gap-2 hover:text-blue-500" onClick={() => setFilterMenu(!filterMenu)}>
      <i className="fa-solid fa-sliders"></i>
      <span className="text-sm font-medium">Filtros</span>
    </button>
    {filterMenu &&
      <Modal title='Filtros' size='modal-m' position='left' handle={setFilterMenu} >
        <div className="w-full h-full flex flex-col gap-4 items-center">
          <div className="w-full flex flex-col gap-4">
            <Link to='/shop' className="w-max px-2 text-sm font-medium hover:text-yellow-500">Ver todos los productos</Link>
            {/* Categorias */}
            {categories
            ? <Accordion title='Categorias'>
                <div className="flex flex-col gap-2">
                  {categories.map(categ =>
                    <Accordion key={categ.id} title={categ.name} open={filters.category === categ.idCategory ? true : false}>
                      {categ.types.map((typ,i) =>
                        <Link key={i} to={`/shop/${categ.idCategory}/${typ}`} className={`duration-150 hover:text-yellow-500 ${filters.type === typ && 'text-yellow-500 font-medium'}`} >
                          {typ}
                        </Link>
                        )}
                      <Link to={`/shop/${categ.idCategory}`} className={`duration-150 hover:text-yellow-500 ${categ.idCategory === filters.category && !filters.type && 'text-yellow-500 font-medium'}`}>Ver todo</Link>
                    </Accordion>)}
                </div>
              </Accordion>
            : <Loader />}
            {/* Marcas */}
            {categories && filters.category &&
              <Accordion title='Marcas'>
                {brands && brands.map((brand,i) => 
                  <div key={i} className="px-1">
                    <input 
                    type="radio" 
                    name='brand' 
                    id={brand} 
                    defaultValue={brand}
                    checked={filters.brand === brand}
                    onChange={({target:{id}}) => setFilters({...filters,brand:id})}
                    className="hidden"
                    onClick={({target:{checked}}) => checked && setFilters({...filters, brand: ''})}
                    />
                    <label htmlFor={brand} className={`px-1 capitalize hover:text-yellow-500 cursor-pointer ${filters.brand === brand && 'text-yellow-500 font-medium'}`}>
                      {brand}
                    </label>
                  </div>)}
              </Accordion>}
            {/* Ubicacion */}
            {locations &&
              <Accordion title='Ubicacion'>
                {locations.map((location,i) => 
                  <div key={i} className="px-1">
                    <input 
                    type="radio" 
                    name='location' 
                    id={location.idProvince} 
                    defaultValue={location.idProvince}
                    checked={filters.location === location.idProvince}
                    onChange={({target:{id}}) => setFilters({...filters, location:id})}
                    onClick={({target:{checked}}) => checked && setFilters({...filters, location: ''})}
                    className="hidden"
                    />
                    <label htmlFor={location.idProvince} className={`px-1 capitalize hover:text-yellow-500 cursor-pointer ${location.idProvince === filters.location && ' text-yellow-500 font-medium'}`}>
                      {location.nameProvince}
                    </label>
                </div>
                )}
              </Accordion>}
            {/* Precio */}
            <Accordion title='Precio' open={false}>
              <ShopPriceRange />
            </Accordion>
          </div>
          {/* Limpiar filtro */}
          <button onClick={cleanFilters} className="btn btn-blue btn-l">
            <span className="text-sm font-medium">Limpiar filtros</span>
          </button>
        </div>
      </Modal>}
    </>
  )
}
