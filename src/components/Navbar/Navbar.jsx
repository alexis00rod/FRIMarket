import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext.jsx"
import { useCartContext } from "../../context/CartContext/CartContext.jsx"
import { useScrollActive } from "../../hooks/useScrollActive.jsx"
import { useProfile } from "../../hooks/useProfile.jsx"
import { BtnCart, Logo, NavbarCart, NavbarMenu, NavbarSearch, NavbarUser } from "../index.js"

export const Navbar = () => {
  const {scrollActive} = useScrollActive()
  const {userLogged} = useAuthContext()
  const {profile} = useProfile()
  const {cartQty} = useCartContext()

  const categories = [
    {id: 'electronic',name: 'Electronica', types:['TV - Audio - Video','Computadoras - Notebooks','Videojuegos - Consolas','Camaras y accesorios']},
    {id: 'phones',name: 'Telefonos-Tablets', types:['Celulares - Telefonos','Accesorios para celulares','Tablets']},
    {id: 'fashion',name: 'Moda - Belleza', types:['Ropa y Calzado','Relojes - Joyas - Accesorios','Salud - Belleza']}
  ]

  return (
    <header className={`navbar ${scrollActive && 'navbar-scroll'}`}>
      <div className="lg:hidden bg-blue-500 text-white">
        <div className="navbar-container">
          <NavbarSearch />
          <NavbarMenu />
          <BtnCart qty={cartQty} />
        </div>
      </div>
      <div className="hidden lg:flex bg-white">
        <div className="navbar-container">
          <Logo />
          <NavbarSearch />
        </div>
      </div>
      <div className="hidden lg:flex bg-blue-500">
        <div className="navbar-container">
          <div className="h-full flex grow gap-2">
            <div className="h-full flex grow items-center gap-2">
              <Link to='/' className="navbar-link">Inicio</Link>
              <Link to='/shop' className="navbar-link">Tienda</Link>
              {categories.map(category => 
                <div className="navbar-expand" key={category.id}>
                  <Link to={`/shop/${category.id}`} className="navbar-link">{category.name}</Link>
                  <ul className="navbar-expand-open open-left">
                    {category.types.map((type,i) => 
                      <li key={i} className="navbar-expand-item">
                        <Link key={i} to={`/shop/${category.id}/${type}`}>
                          {type}
                        </Link>
                      </li>)}
                  </ul>
                </div>)}
              <Link to='/wishlist' className="navbar-link">Favoritos</Link>
              <Link to='/post' className="navbar-link">Vender</Link>
            </div>
            <NavbarUser user={userLogged} profile={profile} />
          </div>
          <NavbarCart />
        </div>
      </div>
    </header>
  )
}