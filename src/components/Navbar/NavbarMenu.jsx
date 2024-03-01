import { useState } from "react"
import { Link } from "react-router-dom"
import { logout } from "../../services/auth"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useProfile } from "../../hooks/useProfile"

export const NavbarMenu = () => {
  const [menu, setMenu] = useState()
  const {userLogged} = useAuthContext()
  const {profile} = useProfile()

  const defaultPhoto = {
    url: 'https://firebasestorage.googleapis.com/v0/b/frimarket-f4864.appspot.com/o/default-photo.jpg?alt=media&token=3e1260ff-94b2-4aac-ad45-777e4ce704c1',
    name: 'Default Photo'
  }

  const logoutUser = () => {
    logout()
    setMenu(false)
  }

  const handleMenu = () => {
    setMenu(!menu)
    document.body.style.overflow = menu ? 'auto' : 'hidden'
  }

  const NavbarMenuLink = ({children,...props}) => {
    return (
      <Link {...props} onClick={() => setMenu(false)}>
        {children}
      </Link>
    )
  }

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
              <NavbarMenuLink to={`/profile/${profile.idUser}`}>
                <img src={profile.photoURL} alt={profile.idUser} className="navbar-menu-user-photo"/>
              </NavbarMenuLink>
              <div className="navbar-menu-user-info">
                <NavbarMenuLink to={`/profile/${profile.idUser}`}>
                  <h4>{`${profile.name} ${profile.lastName}`}</h4>
                </NavbarMenuLink>
                <NavbarMenuLink to='/editProfile' className="text-sm text-yellow-500 hover:underline">Editar perfil</NavbarMenuLink>
              </div>
            </>
          : <>
            <img src={defaultPhoto.url} alt={defaultPhoto.name} className="navbar-menu-user-photo" />
            <div className="navbar-menu-user-info">
              <h4>Bienvenido</h4>
              <p>Ingresa a tu cuenta para ver tus compras, favoritos, etc.</p>
              <div className="mt-4 flex gap-4">
                <NavbarMenuLink to='/login' className='btn btn-m btn-yellow btn-text'>
                  Iniciar sesion
                </NavbarMenuLink>
                <NavbarMenuLink to='/registration' className='btn btn-m btn-white btn-text'>
                  Crear cuenta
                </NavbarMenuLink>
              </div>
            </div>
            </>}
        </div>
        <div className="navbar-menu-links">
          <NavbarMenuLink to='/' className='navbar-menu-link'>
            <i className="fa-solid fa-home"></i>
            Inicio
          </NavbarMenuLink>
          <NavbarMenuLink to='/shop' className='navbar-menu-link'>
            <i className="fa-solid fa-shop"></i>
            Tienda
          </NavbarMenuLink>
          <NavbarMenuLink to='/post' className='navbar-menu-link'>
            <i className="fa-solid fa-truck-fast"></i>
            Vender
          </NavbarMenuLink>
          <NavbarMenuLink to='/wishlist' className='navbar-menu-link'>
            <i className="fa-solid fa-truck-fast"></i>
            Mis favoritos
          </NavbarMenuLink>
          <NavbarMenuLink to='/orders' className='navbar-menu-link'>
            <i className="fa-solid fa-calendar"></i>
            Mis compras
          </NavbarMenuLink>
          {userLogged &&
            <button onClick={logoutUser} className='navbar-menu-link'>
              <i className="fa-solid fa-right-from-bracket"></i>
              Cerrar sesión
            </button>}
        </div>
      </div>
    </>
  )

  // return (
  //   <div className="navbar-menu">
  //     {/* MOBILE */}
  //     {/* Boton hamburguesa */}
  //     <button className={`ml-2 btn btn-blue btn-s btn-burger ${menu && 'btn-burger-active'} lg:hidden`} onClick={() => setMenu(!menu)}>
  //       <span></span><span></span><span></span>
  //     </button>
  //     {menu && 
  //       <div className="absolute top-full z-30 w-screen p-2 flex flex-col gap-2 bg-white text-black">
  //         {/* Usuario */}
  //         <div className="px-2 pt-2 pb-4 flex border-b border-gray-300">
  //           {userLogged
  //             ? profile &&
  //               <>
  //                 <Link to={`/profile/${profile.idUser}`}>
  //                   <img 
  //                   src={profile.photoURL} 
  //                   alt={profile.idUser} 
  //                   className="w-[50px] h-[50px] flex flex-none object-cover border border-gray-300 rounded-md"
  //                   />
  //                 </Link>
  //                 <div className="ml-4 flex flex-col">
  //                   <Link to={`/profile/${profile.idUser}`}>
  //                     <h4 className="font-medium line-clamp-1">{`${profile.name} ${profile.lastName}`}</h4>
  //                   </Link>
  //                   <Link to='/editProfile' className="text-sm text-yellow-500 hover:underline">Editar perfil</Link>
  //                 </div>
  //               </>
  //             : <>
  //                 <img 
  //                 src="https://firebasestorage.googleapis.com/v0/b/frimarket-f4864.appspot.com/o/default-photo.jpg?alt=media&token=3e1260ff-94b2-4aac-ad45-777e4ce704c1" 
  //                 alt="Default photo" 
  //                 className="w-[50px] h-[50px] flex flex-none object-cover border border-gray-300 rounded-md"
  //                 />
  //                 <div className="ml-4 flex flex-col">
  //                   <h4 className="font-medium">Bienvenido</h4>
  //                   <p className="text-sm">Ingresa a tu cuenta para ver tus compras, favoritos, etc.</p>
  //                   <div className="mt-4 flex gap-4">
  //                     <Link to='/login' className="btn btn-blue btn-m">
  //                       <span className="text-sm font-medium">Iniciar sesión</span>
  //                     </Link>
  //                     <Link to='/registration' className="btn btn-white btn-m">
  //                       <span className="text-sm font-medium">Crear cuenta</span>
  //                     </Link>
  //                   </div>
  //                 </div>
  //               </>}
  //         </div>
  //         {/* Enlaces */}
  //         <Link to='/' className="navbar-menu-item"><i className="fa-solid fa-house"></i>Inicio</Link>
  //         <Link to='/shop' className="navbar-menu-item"><i className="fa-solid fa-shop"></i>Tienda</Link>
  //         <Link to='/post' className="navbar-menu-item"><i className="fa-solid fa-truck-fast"></i>Vender</Link>
  //         <Link to='/wishlist' className="navbar-menu-item"><i className="fa-solid fa-heart"></i>Favoritos</Link>
  //         <Link to='/orders' className="navbar-menu-item"><i className="fa-solid fa-calendar"></i>Mis compras</Link>
  //         {/* Cerrar sesion */}
  //         {userLogged && 
  //           <button className="navbar-menu-item" onClick={() => logout()}>
  //             <i className="fa-solid fa-right-from-bracket"></i>
  //             Cerrar sesión
  //           </button>}
  //       </div>}
  //     {/* DESKTOP */}
  //     <div className="h-full ml-2 hidden lg:flex items-center grow gap-2">
  //       <div className="h-full flex items-center grow gap-2">
  //         {/* Enlaces */}
  //         <Link to='/' className="navbar-menu-item">Inicio</Link>
  //         <Link to='/shop' className="navbar-menu-item">Tienda</Link>
  //         {/* Categorias */}
  //         {featuredCategories && featuredCategories.map(category => (
  //           <div key={category.id} to={`/shop/${category.idCategory}`} className="navbar-menu-expand">
  //             <Link to={`/shop/${category.idCategory}`} className="navbar-menu-item">{category.name}</Link>
  //             <div className="navbar-menu-expand-open open-left">
  //               {category.types.map((type,i) => (
  //                 <Link key={i} to={`/shop/${category.idCategory}/${type}`} className="navbar-expand-item">{type}</Link>
  //               ))}
  //             </div>
  //           </div>))}
  //         <Link to='/post' className="navbar-menu-item">Vender</Link>
  //         <Link to='/wishlist' className="navbar-menu-item">Favoritos</Link>
  //       </div>
  //       {/* Usuario */}
  //       <div className="navbar-menu-expand">
  //         <button className="navbar-menu-expand-button"><i className="fa-solid fa-user"></i></button>
  //         <div className="navbar-menu-expand-open open-right">
  //           {userLogged
  //           ? <>
  //               {profile &&
  //                 <div className="w-full px-2 pt-2 pb-4 flex border-b border-gray-300">
  //                   <Link to={`/profile/${profile.idUser}`}>
  //                     <img 
  //                     src={profile.photoURL} 
  //                     alt={profile.idUser} 
  //                     className="w-[50px] h-[50px] flex flex-none object-cover border border-gray-300 rounded-md"
  //                     />
  //                   </Link>
  //                   <div className="ml-4 flex flex-col">
  //                     <Link to={`/profile/${profile.idUser}`}>
  //                       <h4 className="font-medium line-clamp-1">{`${profile.name} ${profile.lastName}`}</h4>
  //                     </Link>
  //                     <Link to='/editProfile' className="text-sm text-yellow-500 hover:underline">Editar perfil</Link>
  //                   </div>
  //                 </div>}
                
  //               <Link to='/post' className="navbar-expand-item"><i className="fa-solid fa-truck-fast"></i>Vender</Link>
  //               <Link to='/wishlist' className="navbar-expand-item"><i className="fa-solid fa-heart"></i>Favoritos</Link>
  //               <Link to='/orders' className="navbar-expand-item"><i className="fa-solid fa-calendar"></i>Mis compras</Link>
  //               <button className="navbar-expand-item" onClick={() => logout()}>
  //                 <i className="fa-solid fa-right-from-bracket"></i>
  //                 Cerrar sesión
  //               </button>
  //               </>
  //           : <>
  //               <Link to='/login' className="navbar-expand-item">
  //                 <i className="fa-solid fa-right-to-bracket"></i>
  //                 Iniciar sesión
  //               </Link>
  //               <Link to='/registration' className="navbar-expand-item">
  //                 <i className="fa-solid fa-plus"></i>
  //                 Crear cuenta
  //               </Link>
  //             </>}
  //           {/* {userLogged && profile &&
  //             <div className="w-full px-2 pb-4 flex border-b border-gray-300">
  //               <Link to={`/profile/${profile.idUser}`}>
  //                 <img 
  //                 src={profile.photoURL} 
  //                 alt={profile.idUser} 
  //                 className="w-[50px] h-[50px] flex flex-none object-cover border border-gray-300 rounded-md"
  //                 />
  //               </Link>
  //               <div className="ml-4 flex flex-col">
  //                 <Link to={`/profile/${profile.idUser}`}>
  //                   <h4 className="font-medium line-clamp-1">{profile.displayName}</h4>
  //                 </Link>
  //                 <Link to='/editProfile' className="text-sm text-yellow-500 hover:underline">Editar perfil</Link>
  //               </div>
  //             </div>}
  //             <Link to='/post' className="navbar-expand-item"><i className="fa-solid fa-truck-fast"></i>Vender</Link>
  //             <Link to='/wishlist' className="navbar-expand-item"><i className="fa-solid fa-heart"></i>Favoritos</Link>
  //             <Link to='/orders' className="navbar-expand-item"><i className="fa-solid fa-calendar"></i>Mis compras</Link>
  //             {userLogged && 
  //               <button className="navbar-expand-item" onClick={() => logout()}>
  //                 <i className="fa-solid fa-right-from-bracket"></i>
  //                 Cerrar sesión
  //               </button>} */}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
