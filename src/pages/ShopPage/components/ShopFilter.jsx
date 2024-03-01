import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useShopContext } from "../context/ShopContext.jsx"
import { useCategories } from "../../../hooks/useCategories.jsx"
import { useLocations } from "../../../hooks/useLocations.jsx"
import { Accordion, InputCheckbox, Loader, Modal, ShopPriceRange } from "../../../components/index.js"
import { ShopItemQty } from "./ShopItemQty.jsx"

export const ShopFilter = () => {
  const {idCategory, idType} = useParams()
  const {filters, cleanFilters, setFilters} = useShopContext()
  const {categories} = useCategories()
  const {locations} = useLocations()
  const [filterMenu, setFilterMenu] = useState(false)

  const categorySelected = idCategory && categories.find(e => e.idCategory === idCategory)

  return (
    <>
    <button className="btn-shopFilter" onClick={() => setFilterMenu(!filterMenu)}>
      <i className="fa-solid fa-sliders"></i>
      Filtros
    </button>
    {filterMenu &&
      <Modal title='Filtros' size='modal-m' position='left' handle={setFilterMenu} >
        {!categories.length && !locations 
          ? <Loader />
          : <div className="w-full h-full flex flex-col gap-4 items-center">
              <div className="w-full flex flex-col gap-4">
                <Accordion title='Categorías'>
                {categorySelected 
                  ? <>
                      {/* Ver todas la categorias */}
                      <div className="shopFilter-link">
                        <Link to='/shop'>Todas las categorías</Link> 
                        <ShopItemQty />
                      </div>
                      {/* Subcategorias */}
                      <h5 className="shopFilter-link">
                        <Link to={`/shop/${categorySelected.idCategory}`} className="font-medium underline">{categorySelected.name}</Link>
                        <ShopItemQty item={categorySelected.idCategory}/>
                      </h5>
                      <div className="pl-2">
                        {categorySelected.types.map((type,i) => 
                          <div key={i} className="shopFilter-link">
                            <Link to={`/shop/${categorySelected.idCategory}/${type}`} className={`${idType === type && 'underline'}`}>{type}</Link>
                            <ShopItemQty item={type}/>
                          </div>)}
                      </div>
                    </>
                  : <>
                      {categories.map(category => 
                        <div key={category.id} className="shopFilter-link">
                          <Link to={`/shop/${category.idCategory}`}>{category.name}</Link>
                          <ShopItemQty item={category.idCategory}/>
                        </div>)}
                    </>}
                </Accordion>
                {/* Marcas */}
                {categorySelected &&
                  <Accordion title='Marcas'>
                    {categorySelected.brands.map((brand,i) => 
                      <InputCheckbox 
                      key={i}
                      name='brand'
                      id={brand}
                      onChange={({target:{id,checked}}) => setFilters({
                        ...filters,
                        brands: checked
                        ?  [...(filters.brands || []), id]
                        :  filters.brands.filter(brandId => brandId !== id)
                      })}
                      checked={filters.brands?.includes(brand) || ''}
                      >
                        {brand}
                      </InputCheckbox>)}
                  </Accordion>}
                {/* Ubicacion */}
                <Accordion title='Ubicacion'>
                  {locations.map((location,i) => 
                    <InputCheckbox 
                    key={i}
                    name='location'
                    id={location.idProvince}
                    onChange={({target:{id,checked}}) => setFilters({
                      ...filters,
                      locations: checked
                       ?  [...(filters.locations || []), id]
                       :  filters.locations.filter(locationId => locationId !== id)
                    })}
                    checked={filters.locations?.includes(location.idProvince) || ''}
                    >
                      {location.nameProvince}
                    </InputCheckbox>
                  )}
                </Accordion>
                {/* Precio */}
                <Accordion title='Precio' open={false}>
                  <ShopPriceRange />
                </Accordion>
              </div>
              {/* Limpiar filtro */}
              <button onClick={cleanFilters} className="btn btn-blue btn-l btn-text">
                Limpiar filtros
              </button>
            </div>}
      </Modal>}
    </>
  )
}
