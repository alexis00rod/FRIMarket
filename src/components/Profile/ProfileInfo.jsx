import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { Element } from "../index.js"

export const ProfileInfo = ({user, posts}) => {
  const {userLogged} = useAuthContext()
  const {photoURL, displayName, idUser, email, sales, bio} = user

  return (
    <Element size='lg:max-w-xs h-max' flex='flex-col flex-none'>
      <div className="box-body flex flex-col">
        <div className="flex items-center">
          <img src={photoURL} alt={displayName} className='w-12 h-12 object-cover rounded-md' />
          <div className="px-2 flex flex-col grow">
            <h2 className="font-medium line-clamp-1">{displayName}</h2>
            <h3 className="text-sm">@{idUser}</h3>
          </div>
          {userLogged && userLogged.email === email && 
          <Link to='/editProfile' className="btn btn-black btn-s">
            <i className="fa-solid fa-pen"></i>
          </Link>}
        </div>
        {bio && <p className="w-full py-2 text-sm text-gray-500 line-clamp-4">{bio}</p>}
      </div>
      <div className="box-body flex flex-col">
        <p>Publicaciones: {posts && posts?.length}</p>
        <p>Ventas: {sales ? sales : 0}</p>
      </div>
    </Element>
  )
}
