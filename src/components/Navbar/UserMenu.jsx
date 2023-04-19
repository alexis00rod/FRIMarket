import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { logout } from "../../services/auth"
import { useProfile } from "../../hooks/useProfile"
import { Button, ButtonLink, Loader, Menu } from "../index.js"

export const UserMenu = () => {
  const {userLogged} = useAuthContext()
  const [menu, setMenu] = useState(false)
  const {profile} = useProfile()

  return (
    <div className="h-full relative flex items-center">
      <Button icon='user' color='btn-blue' size='btn-s' onClick={() => setMenu(!menu)} />
      <Menu expand={menu} onClick={() => setMenu(false)} position='right'>
      {userLogged
        ? <>
            {profile
            ? <div className="w-full px-2 py-2 flex items-center gap-2">
                <Link to={`/profile/${profile.idUser}`} className='w-12 h-12 rounded-md overflow-hidden'>
                  <img src={profile.photoURL} alt={profile.displayName} className="w-full h-full object-cover" />
                </Link>
                <div className="flex flex-col grow">
                  <Link to={`/profile/${profile.idUser}`} className='w-max px-2 hover:text-yellow-500'>
                    <span className="font-medium line-clamp-1">{profile.displayName}</span>
                  </Link>
                  <ButtonLink to='editProfile' size='btn-m' color='btn-text-yellow' style='btn-text' >Editar perfil</ButtonLink>
                </div>
              </div>
            : <div className="w-full px-2 py-2"><Loader /></div>}
            <Link to='/post' className="btn btn-black btn-m">
              <i className="fa-solid fa-shop"></i>
              <span>Vender</span>
            </Link>
            <Link to='/wishlist' className="btn btn-black btn-m">
              <i className="fa-solid fa-heart"></i>
              <span>Mis favoritos</span>
            </Link>
            <Link to='/orders' className="btn btn-black btn-m">
              <i className="fa-solid fa-calendar"></i>
              <span>Mis compras</span>
            </Link>
            <Button icon='right-from-bracket' color='btn-black' size='btn-m' onClick={() => logout()} >
              Cerrar sesion  
            </Button>
          </>
        : <>
            <Link to='/login' className="btn btn-black btn-m">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Iniciar sesion</span>
            </Link>
            <Link to='/signup' className="btn btn-black btn-m">
              <i className="fa-solid fa-plus"></i>
              <span>Crear cuenta</span>
            </Link>
          </>}
      </Menu>
    </div>
  )
}
