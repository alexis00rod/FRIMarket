export const SignupUserID = ({...props}) => {
  return (
    <div className="w-full max-w-lg px-2 py-2 flex flex-col">
      <label htmlFor='idUser' className="px-1 text-sm font-medium">Nombre de usuario</label>
      <div className="w-full h-8 flex items-center border border-gray-300 rounded-md">
        <span className="w-8 h-full flex items-center justify-center text-gray-400">@</span>
        <input 
        type="text" 
        name="idUser" 
        id="idUser" 
        className="h-full px-1 grow outline-none"
        {...props}
        />
      </div>
    </div>
  )
}
