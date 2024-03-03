import { Link } from "react-router-dom"
import { logout } from "../../services/auth"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useNavbarContext } from "../../context/NavbarContext/NavbarContext"
import { useProfile } from "../../hooks/useProfile"

export const NavbarMenu = () => {
  const {userLogged} = useAuthContext()
  const {profile} = useProfile()
  const {menu, closeMenu, handleMenu} = useNavbarContext()

  const defaultPhoto = {
    url: 'https://firebasestorage.googleapis.com/v0/b/frimarket-f4864.appspot.com/o/default-photo.jpg?alt=media&token=3e1260ff-94b2-4aac-ad45-777e4ce704c1',
    name: 'Default Photo'
  }

  const logoutUser = () => {
    logout()
    closeMenu()
  }

  const MenuLink = ({children,...props}) => {
    return (
      <Link {...props} onClick={closeMenu}>
        {children}
      </Link>
    )
  }

  const links = [
    {href:'/',name:'Inicio',icon:'home'},
    {href:'/shop',name:'Tienda',icon:'cart-shopping'},
    {href:'/post',name:'Vender',icon:'truck-fast'},
    {href:'/wishlist',name:'Mis favoritos',icon:'heart'},
    {href:'/orders',name:'Mis compras',icon:'calendar'}
  ]

  return (
    <>
      <button className={`btn-burger ${menu && 'btn-burger-active'}`} onClick={handleMenu}>
        <span></span><span></span><span></span>
      </button>
      <div className={`navbar-menu ${menu ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="navbar-menu-user">
          {userLogged
          ? profile &&
            <>
              <MenuLink to={`/profile/${profile.idUser}`}>
                <img src={profile.photoURL} alt={profile.idUser} className="navbar-menu-user-photo"/>
              </MenuLink>
              <div className="navbar-menu-user-info">
                <MenuLink to={`/profile/${profile.idUser}`}>
                  <h4>{`${profile.name} ${profile.lastName}`}</h4>
                </MenuLink>
                <MenuLink to='/editProfile' className="text-sm text-yellow-500 hover:underline">Editar perfil</MenuLink>
              </div>
            </>
          : <>
            <img src={defaultPhoto.url} alt={defaultPhoto.name} className="navbar-menu-user-photo" />
            <div className="navbar-menu-user-info">
              <h4>Bienvenido</h4>
              <p>Ingresa a tu cuenta para ver tus compras, favoritos, etc.</p>
              <div className="mt-4 flex gap-4">
                <MenuLink to='/login' className='btn btn-m btn-yellow btn-text'>
                  Iniciar sesion
                </MenuLink>
                <MenuLink to='/registration' className='btn btn-m btn-white btn-text'>
                  Crear cuenta
                </MenuLink>
              </div>
            </div>
            </>}
        </div>
        <div className="navbar-menu-links">
          {links.map((e,i) => 
            <MenuLink
            key={i}
            to={e.href}
            className='navbar-menu-link'
            >
              <i className={`fa-solid fa-${e.icon}`}></i>
              {e.name}
            </MenuLink>)}
          {userLogged &&
            <button onClick={logoutUser} className='navbar-menu-link'>
              <i className="fa-solid fa-right-from-bracket"></i>
              Cerrar sesión
            </button>}
        </div>
      </div>
    </>
  )
}
