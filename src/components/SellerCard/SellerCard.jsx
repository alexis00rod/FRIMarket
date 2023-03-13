import { Link } from "react-router-dom"

export const SellerCard = ({seller}) => {
  const {idUser, photoURL, displayName, bio, posts, sales} = seller

  return (
    <Link 
      to={`/profile/${idUser}`} 
      className="px-2 py-2 flex flex-col bg-white rounded-md border border-gray-300 divide-y divide-gray-300 hover:shadow-lg cursor-pointer"
      >
        <div className="px-2 pt-2 pb-4 flex">
          <img src={photoURL} alt={displayName} className='w-24 h-24 object-cover rounded-md' />
          <div className="px-2 py-2 flex flex-col">
            <h3 className='text-lg font-semibold leading-5'>{displayName}</h3>
            <h4 className='mb-1 text-sm text-gray-500'>@{idUser}</h4>
            {bio && <p className='text-xs line-clamp-2'>{bio}</p>}
          </div>
        </div>
        <div className="px-2 pt-2 flex flex-col">
          <p className="flex items-center gap-2 font-medium">
            Publicaciones:
            <span>{posts ? posts : 0}</span>
          </p>
          <p className="flex items-center gap-2 font-medium">
            Ventas:
            <span>{sales ? sales : 0}</span>
          </p>
        </div>
      </Link>
  )
}
