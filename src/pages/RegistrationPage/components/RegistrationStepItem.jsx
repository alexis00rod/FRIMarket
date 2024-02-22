import { Link } from "react-router-dom"

export const RegistrationStepItem = ({item:{stepId,icon,title,successTitle,description,href},state,user}) => {

  return (
    <li className={`px-4 py-4 flex items-center gap-4 rounded-md ${!state && 'shadow-lg'}`}>
      <div className="relative w-10 h-10 flex items-center justify-center flex-none text-blue-500 rounded-full border border-gray-300">
        <i className={`text-xl fa-solid fa-${icon}`}></i>
        {state === 'finish' && <i className="absolute -right-0.5 -bottom-0.5 flex items-center justify-center text-green-500 rounded-full fa-solid fa-check-circle"></i>}
      </div>
      <div className="flex flex-col grow">
        <h4>{state !== 'finish' ? title : successTitle}</h4>
        <p className="text-sm font-light line-clamp-2">
          {user 
          ? stepId === 'email'
            ? user.email
            : `${user.name} ${user.lastName}`
          : description}
        </p>
      </div>
      {!state && 
        <Link to={href} className="btn btn-m btn-blue">
          <span className="text-sm font-medium">Agregar</span>
        </Link>}
      {state === 'finish' &&
        <Link to={href} className="btn btn-s btn-text-blue">
          <i className="fa-solid fa-pen"></i>
        </Link>}
    </li>
  )
}
