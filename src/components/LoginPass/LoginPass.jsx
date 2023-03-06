export const LoginPass = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='password' className="px-1 text-sm font-medium">Contraseña</label>
      <input 
      type="password" 
      name="password" 
      id="password" 
      className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
      {...props}
      />
    </div>
  )
}
