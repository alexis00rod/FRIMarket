import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { logout } from "../../services/auth"

export const UserMenu = ({handle}) => {
  const {userLogged} = useAuthContext()

  return (
    <div className="fixed top-24 left-0 bottom-0 z-10 w-full flex justify-end bg-gray-900/25" onClick={() => handle(false)}>
      <div className="w-full max-w-md h-full flex flex-col bg-white border-l border-gray-500 divide-y divide-gray-300 overflow-y-scroll" onClick={e => e.stopPropagation()}>
        {userLogged
        ? <>
            <Link to='/' className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500">
              <i className="fa-solid fa-user"></i>
              <div className="flex flex-col">
                <span className="text-lg font-medium">{userLogged.displayName}</span>
                <span className="text-xs leading-3">{userLogged.email}</span>
              </div>
            </Link>
            <button 
            onClick={logout}
            className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Cerrar sesion
            </button>
          </>
        : <>
            <Link 
            to='/login' 
            className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500"
            onClick={() => handle(false)}
            >
              <i className="fa-solid fa-right-to-bracket"></i>Iniciar sesion
            </Link>
            <Link 
            to='/signup' 
            className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500"
            onClick={() => handle(false)}
            >
              <i className="fa-solid fa-plus"></i>Crear usuario
            </Link>
          </>}
        {/* {userLogged
        ? <>
            <Link to={`/profile`} className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500">
              {userLogged}
            </Link>
          </>
        : <>
            <Link 
            to='/login' 
            className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500"
            onClick={() => handle(false)}
            >
              <i className="fa-solid fa-right-to-bracket"></i>Iniciar sesion
            </Link>
            <Link 
            to='/signup' 
            className="px-3 py-3 flex items-center gap-2 hover:text-yellow-500"
            onClick={() => handle(false)}
            >
              <i className="fa-solid fa-plus"></i>Crear usuario</Link>
          </>} */}
      </div>
    </div>
  )
}
