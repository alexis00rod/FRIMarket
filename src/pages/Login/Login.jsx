import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <div className="w-full max-w-xl px-2 py-2 mx-auto flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
      <h2 className="px-3 py-3 text-xl font-semibold">Iniciar sesion</h2>
      <form className="py-2 flex flex-col gap-2">
        <div className="px-2 py-2 flex flex-col">
          <label htmlFor='email' className="px-1 text-sm font-medium">Email</label>
          <input 
          type="text"
          name='email'
          id='email'
          className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none" 
          />
        </div>
        <div className="px-2 py-2 flex flex-col">
          <label htmlFor='password' className="px-1 text-sm font-medium">Contraseña</label>
          <input 
          type="password"
          name='password'
          id='password'
          className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none" 
          />
        </div>
        <div className="w-full px-2 flex flex-col gap-2">
          <div className="w-full px-2 mb-2  flex justify-between">
            <Link to='/' className="text-sm hover:text-yellow-500">¿Olvidaste tu contraseña?</Link>
            <Link to='/' className="text-sm hover:text-yellow-500">Crear cuenta</Link>
          </div>
          <button className="w-full h-8 flex justify-center items-center bg-blue-500 text-white text-sm rounded md">
            Iniciar sesion
          </button>
        </div>
      </form>
    </div>
  )
}
