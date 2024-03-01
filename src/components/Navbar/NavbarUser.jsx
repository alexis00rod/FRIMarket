import { Link } from "react-router-dom"
import { logout } from "../../services/auth"
import { Loader } from "../index"

export const NavbarUser = ({user, profile}) => {

  const defaultPhoto = {
    url: 'https://firebasestorage.googleapis.com/v0/b/frimarket-f4864.appspot.com/o/default-photo.jpg?alt=media&token=3e1260ff-94b2-4aac-ad45-777e4ce704c1',
    name: 'Default Photo'
  }

  const links = [
    {href:'/post',name:'Vender',icon:'truck-fast'},
    {href:'/wishlist',name:'Mis compras',icon:'heart'},
    {href:'/orders',name:'Mis compras',icon:'calendar'}
  ]

  return (
    <div className="navbar-expand">
      <button className="btn btn-s btn-blue"><i className="fa-solid fa-user"></i></button>
      <div className="navbar-expand-open open-right">
        {!user
        ? <div className="navbar-user-login py-2 flex-col">
            <div className="mb-2 w-full flex">
              <img src={defaultPhoto.url} alt={defaultPhoto.name} />
              <div className="ml-2 flex flex-col">
                <h4>Bienvenido</h4>
                <p>Ingresa a tu cuenta para ver tus compras, favoritos, etc.</p>
              </div>
            </div>
            <div className="w-full flex gap-2">
              <Link to='/login' className='btn btn-m btn-blue btn-text'>
                Iniciar sesion
              </Link>
              <Link to='/registration' className='btn btn-m btn-text-blue btn-text'>
                Crear cuenta
              </Link>
            </div>
          </div> 
        : profile
          ? <>
              <div className='navbar-user-login pt-2 pb-4 flex border-b border-gray-300'>
                <Link to={`/profile/${profile.idUser}`}>
                  <img src={profile.photoURL} alt={profile.idUser} />
                </Link>
                <div className="navbar-user-login-info ml-2 flex flex-col">
                  <Link to={`/profile/${profile.idUser}`}>
                    <h4>{`${profile.name} ${profile.lastName}`}</h4>
                  </Link>
                  <Link to='/editProfile' className="w-max text-sm text-yellow-500 hover:underline">Editar perfil</Link>
                </div>
              </div>
              <ul className="navbar-user-links">
                {links.map((e,i) => 
                  <li key={i} className="navbar-expand-item">
                    <Link to={e.href}>
                      <i className={`fa-solid fa-${e.icon}`}></i>
                      {e.name}
                    </Link>
                  </li>)}
                {user &&
                  <li className="navbar-expand-item">
                    <button onClick={() => logout()} className='navbar-expand-item'>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      Cerrar sesión
                    </button>
                  </li>}
              </ul>
            </>
          : <Loader />}
          {/* <>
            {profile 
            ? <>
                <div className='navbar-user-login'>
                  <Link to={`/profile/${profile.idUser}`}>
                    <img src={profile.photoURL} alt={profile.idUser} />
                  </Link>
                  <div className="navbar-user-login-info">
                    <Link to={`/profile/${profile.idUser}`}>
                      <h4>{`${profile.name} ${profile.lastName}`}</h4>
                    </Link>
                    <Link to='/editProfile' className="w-max text-sm text-yellow-500 hover:underline">Editar perfil</Link>
                  </div>
                </div>
              <ul className="navbar-user-links">
                {links.map((e,i) => 
                  <li key={i} className="navbar-expand-item">
                    <Link to={e.href}>
                      <i className={`fa-solid fa-${e.icon}`}></i>
                      {e.name}
                    </Link>
                  </li>)}
                  {user &&
                    <li className="navbar-expand-item">
                      <button onClick={() => logout()} className='navbar-expand-item'>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Cerrar sesión
                      </button>
                    </li>}
                </ul>
                </>
            : <Loader />
          </> */}
        {/* <div className="navbar-user-login">
          {user
          ? profile &&
            <>
              <Link to={`/profile/${profile.idUser}`}>
                <img src={profile.photoURL} alt={profile.idUser} />
              </Link>
              <div className="navbar-user-login-info">
                <Link to={`/profile/${profile.idUser}`}>
                  <h4>{`${profile.name} ${profile.lastName}`}</h4>
                </Link>
                <Link to='/editProfile' className="w-max text-sm text-yellow-500 hover:underline">Editar perfil</Link>
              </div>
            </>
          : <>
              <div className="w-full flex flex-col">
                <div className="mb-2 flex">
                  <img src={defaultPhoto.url} alt={defaultPhoto.name} />
                  <div className="ml-4 flex flex-col">
                    <h4 className="text-lg font-medium">Bienvenido</h4>
                    <p className="text-sm">Ingresa a tu cuenta para ver tus compras, favoritos, etc.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to='/login' className='btn btn-m btn-blue btn-text'>
                    Iniciar sesion
                  </Link>
                  <Link to='/registration' className='btn btn-m btn-text-blue btn-text'>
                    Crear cuenta
                  </Link>
                </div>
              </div>
            </>}
        </div>
        <ul className="navbar-user-links">
          {links.map((e,i) => 
            <li key={i} className="navbar-expand-item">
              <Link to={e.href}>
                <i className={`fa-solid fa-${e.icon}`}></i>
                {e.name}
              </Link>
            </li>)}
            {user &&
              <li className="navbar-expand-item">
                <button onClick={() => logout()} className='navbar-expand-item'>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Cerrar sesión
                </button>
              </li>}
        </ul> */}
      </div>
    </div>
  )
}
