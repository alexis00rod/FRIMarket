import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { logout } from "../../services/auth"
import { getUser } from "../../services/firestore"
import { Loader } from "../Loader/Loader"

export const UserMenu = ({handle}) => {
  const {userLogged} = useAuthContext()
  const [userProfile, setUserProfile] = useState()

  useEffect(() => {
    userLogged && 
      getUser(userLogged.email)
        .then(resp => setUserProfile({
          id: resp.id,
          ...resp.data()
        }))
    
  }, [userLogged])

  const MenuLink = ({icon,children,...props}) => {
    return (
      <Link
      className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500"
      onClick={() => handle(false)}
      {...props}
        >
          {icon && <i className={`w-7 h-7 flex items-center justify-center fa-solid fa-${icon}`}></i>}
          {children}
      </Link>
    )
  }

  return (
    <div className="fixed top-24 left-0 bottom-0 z-10 w-full flex justify-end bg-gray-900/25" onClick={() => handle(false)}>
      <div className="w-full max-w-md h-full flex flex-col bg-white border-l border-gray-500 divide-y divide-gray-300 overflow-y-scroll" onClick={e => e.stopPropagation()}>
          {userLogged
          ? <>
              {userProfile
                ? <MenuLink to={`/profile/${userProfile.idUser}`}>
                    <img src={userProfile.photoURL} alt={userProfile.displayName} className='w-10 h-10 object-cover rounded-md' />
                    <div className="flex flex-col">
                      <span className="text-lg font-medium">{userProfile.displayName}</span>
                      <span className="text-xs leading-3">{userProfile.email}</span>
                    </div>
                  </MenuLink>
                : <div className="py-2">
                    <Loader />
                  </div>  }
              <MenuLink to='/post' icon='shop'>
                Vender
              </MenuLink>
              <MenuLink to='/wishlist' icon='heart'>
                Mis favoritos
              </MenuLink>
              <button 
              onClick={() => {
                logout()
                handle(false)
              }}
              className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500"
              >
                <i className="w-7 h-7 flex items-center justify-center fa-solid fa-right-from-bracket"></i>
                Cerrar sesion
              </button>
            </>
          : <>
              <MenuLink to='/login' icon='right-to-bracket'>
                Iniciar sesion
              </MenuLink>
              <MenuLink to='/signup' icon='plus'>
                Crear usuario
              </MenuLink>
            </>}
      </div>
    </div>
  )
}
