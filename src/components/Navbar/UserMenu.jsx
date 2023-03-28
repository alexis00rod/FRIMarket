import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useProfile } from "../../hooks/useProfile"
import { logout } from "../../services/auth"
import { Button, Loader } from "../index.js"

export const UserMenu = ({handle}) => {
  const {userLogged} = useAuthContext()
  const [menu, setMenu] = useState(false)
  const {profile} = useProfile()

  return (
    <div className="relative">
      <Button icon='user' color='btn-blue' onClick={() => setMenu(!menu)} />
      {menu &&
      <ul className="menu menu-right">
        {userLogged
        ? <>
            {profile
            ? <li className="menu-item">
                <Link to={`/profile/${profile.idUser}`} className="menu-link">
                  <img src={profile.photoURL} alt={profile.displayName} className='w-10 h-10 object-cover rounded-md' />
                  <div className="flex flex-col grow">
                    <span className="font-medium">{profile.displayName}</span>
                    <span className="text-xs leading-3">{profile.email}</span>
                  </div>
                </Link>
                <Link className="btn btn-black" title="Editar perfil">
                  <i className="fa-solid fa-pen"></i>
                </Link>
              </li>
            : <div className="w-full px-2 py-2"><Loader /></div>}
            <li className="menu-item">
              <Link to='/post' className="menu-link">
                <i className="fa-solid fa-shop"></i>
                <span>Vender</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to='/wishlist' className="menu-link">
                <i className="fa-solid fa-heart"></i>
                <span>Mis favoritos</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to='/settings' className="menu-link">
                <i className="fa-solid fa-gear"></i>
                <span>Configuraciones</span>
              </Link>
            </li>
            <li className="menu-item">
              <button 
              className="menu-link"
              onClick={() => logout()}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Cerrar sesion
              </button>
            </li>
          </>
        : <>
            <li className="menu-item">
              <Link to='/login' className="menu-link">
                <i className="fa-solid fa-right-to-bracket"></i>
                <span>Iniciar sesion</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to='/signup' className="menu-link">
                <i className="fa-solid fa-plus"></i>
                <span>Crear cuenta</span>
              </Link>
            </li>
          </>}
      </ul>}
    </div>
  )
}
