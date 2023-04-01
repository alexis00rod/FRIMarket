import { NavLink } from "react-router-dom"
import { useShopContext } from "../../context/ShopContext/ShopContext.jsx"
import { Accordion, Button, Loader, Modal } from "../index.js"

const SidebarLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `w-full px-1 flex items-center justify-between gap-2 hover:text-yellow-500 ${isActive && " font-medium text-yellow-500"}`}
      >
      {children}
    </NavLink>
  )
}

export const ShopFilter = ({handle, category}) => {
  const {categories, locations, filters, handleFilter, handlePrice, cleanFilters} = useShopContext()

  return (
    <Modal title='Filtros' size='modal-m' position='left' handle={handle} >
      <div className="w-full h-full flex flex-col gap-4 items-center">
        <div className="w-full flex flex-col gap-4">
          {/* Categorias */}
          <Accordion title='Categorias'>
            <SidebarLink 
            to='/shop/all'
            onClick={cleanFilters}
            >
              Todas las categorias
            </SidebarLink>
            {categories
            ? categories.map(category => (
              <SidebarLink 
              key={category.id} 
              to={`/shop/${category.idCategory}`}
              onClick={cleanFilters}
              >
                  {category.name}
                </SidebarLink>
              ))
              : <Loader />}
          </Accordion>
          {category &&
          <>
          {/* Tipo */}
          <Accordion title='Tipo' open={false}>
            <div className="px-1">
              <input 
              type="radio" 
              name='type' 
              id='allTypes' 
              defaultValue='allTypes'
              checked={filters.type === 'allTypes'}
              onChange={handleFilter}
              />
              <label htmlFor='allTypes' className='px-1 capitalize checked:text-yellow-500 cursor-pointer'>
                Todos los tipos
              </label>
            </div>
            {category.types.map(type => (
              <div key={type} className="px-1">
                <input 
                type="radio" 
                name='type' 
                id={type} 
                defaultValue={type}
                checked={filters.type === type}
                onChange={handleFilter}
                />
                <label htmlFor={type} className='px-1 capitalize checked:text-yellow-500 cursor-pointer'>
                  {type}
                </label>
              </div>
            ))}
          </Accordion>
          {/* Marcas */}
          <Accordion title='Marcas' open={false}>
            <div className="px-1">
              <input 
              type="radio" 
              name='brand' 
              id='allBrands' 
              defaultValue='allBrands'
              checked={filters.brand === 'allBrands'}
              onChange={handleFilter}
              />
              <label htmlFor='allBrands' className='px-1 capitalize checked:text-yellow-500 cursor-pointer'>
                Todas las marcas
              </label>
            </div>
            {category.brands.map(brand => (
              <div key={brand} className="px-1">
                <input 
                type="radio" 
                name='brand' 
                id={brand} 
                defaultValue={brand}
                checked={filters.brand === brand}
                onChange={handleFilter}
                />
                <label htmlFor={brand} className='px-1 capitalize checked:text-yellow-500 cursor-pointer'>
                  {brand}
                </label>
              </div>
            ))}
          </Accordion>
          </>}
          {/* Ubicacion */}
          <Accordion title='Ubicacion' open={false}>
          <div className="px-1 flex">
            <input 
              type="radio" 
              name='province' 
              id='allProvinces' 
              defaultValue='allProvinces'
              onChange={handleFilter}
              checked={filters.province === 'allProvinces'}
              />
              <label htmlFor='allProvinces' className='px-1 truncate capitalize checked:text-yellow-500 cursor-pointer'>
                Todas las ubicaciones
              </label>
            </div>
            {locations
            ? locations.map(e => (
              <div key={e.id} className="px-1 flex">
                <input 
                type="radio" 
                name='province' 
                id={e.id} 
                defaultValue={e.id}
                onChange={handleFilter}
                checked={filters.province === e.id}
                />
                <label htmlFor={e.id} className='px-1 truncate capitalize checked:text-yellow-500 cursor-pointer'>
                  {e.nombre}
                </label>
              </div>
              ))
            : <Loader />
            }
          </Accordion>
          {/* Precio */}
          <Accordion title='Precio' open={false}>
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
        </div>
        {/* Limpiar filtro */}
        <Button color='btn-blue' style='btn-form' size='btn-l' onClick={cleanFilters} >Limpiar filtros</Button>
      </div>
    </Modal>
  )
}