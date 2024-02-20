import { Link, useLocation } from "react-router-dom"

export const BreadcrumbLink = ({name,...props}) => {
  return (
    <Link 
    {...props} 
    className='px-2 text-sm font-medium hover:text-yellow-500'
    >
      {name}
    </Link>
  )
}

export const Breadcrumb = ({children}) => {
  const {pathname} = useLocation()

  return (
    <div className="w-full bg-gray-200">
      <div className="w-full max-w-[1200px] mx-auto px-2 py-4 divide-x divide-gray-400">
        <BreadcrumbLink name='Inicio' to='/' />
        {pathname.includes('shop') && <BreadcrumbLink name='Tienda' to='/shop' />}
        {pathname.includes('sellers') && <BreadcrumbLink name='Vendedores' to='/sellers' />}
        {pathname.includes('profile/') && <BreadcrumbLink name='Vendedores' to='/sellers' />}
        {pathname.includes('product') && <BreadcrumbLink name='Tienda' to='/shop' />}
        {pathname.includes('settings/profile') && <BreadcrumbLink name='Editar perfil' to='/settings/profile' />}
        {pathname.includes('settings/privacity') && <BreadcrumbLink name='Editar privacidad' to='/settings/privacity' />}
        {pathname.includes('wishlist') && <BreadcrumbLink name='Lista de favoritos' to='/wishlist' />}
        {pathname.includes('post') && <BreadcrumbLink name='Vender producto' to='/post' />}
        {pathname.includes('cart') && <BreadcrumbLink name='Carrito' to='/cart' />}
        {pathname.includes('editProfile') && <BreadcrumbLink name='Editar perfil' to='/editProfile' />}
        {pathname.includes('orders') && <BreadcrumbLink name='Mis compras' to='/orders' />}
        {children}
      </div>
    </div>
  )
}
