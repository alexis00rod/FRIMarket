import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"

export const ProfileInfo = ({user}) => {
  const {userLogged} = useAuthContext()
  const {photoURL, displayName, idUser, email, posts, sales, bio} = user

  return (
    <ul className="w-full divide-y divide gray-300">
      <li className="px-2 pt-2 pb-4 flex items-center grow">
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex">
            <img src={photoURL} alt={displayName} className='w-12 h-12 object-cover rounded-md' />
            <div className="px-2 flex flex-col grow">
              <h2 className="text-lg font-semibold leading-5">{displayName}</h2>
              <h3 className="text-sm leading-4">@{idUser}</h3>
            </div>
            {userLogged && userLogged.email === email &&
            <Link to='/settings/profile' className="w-8 h-8 flex items-center justify-center hover:text-yellow-500">
              <i className="fa-solid fa-pen"></i>
            </Link>}
          </div>
          {bio && <p className="w-full px-1 py-1 text-sm text-gray-500 line-clamp-4">{bio}</p>}
        </div>
      </li>
      <li className="px-2 py-2 flex items-center grow">
        <span className="font-medium">Publicaciones:</span>
        <span className="text-xl px-2 py-1 font-semibold">{posts ? posts : 0}</span>
      </li>
      <li className="px-2 py-2 flex items-center grow">
        <span className="font-medium">Ventas:</span>
        <span className="text-xl px-2 py-1 font-semibold">{sales ? sales : 0}</span>
      </li>
    </ul>
  )
}
