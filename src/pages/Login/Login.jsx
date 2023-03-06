import { useState } from "react"
import { Link } from "react-router-dom"
import { LoginEmail, LoginPass } from "../../components"

export const Login = () => {
  const [loginUser, setLoginUser] = useState({})

  const login = e => {
    e.preventDefault()
    console.log(loginUser)
  }

  return (
    <div className="w-full max-w-xl px-2 py-2 mx-auto flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
      <div className="px-3 py-3 flex items-center gap-2">
        <h2 className="text-xl font-semibold capitalize">Iniciar sesion</h2>
        <Link to='/signup' className="px-2 text-sm text-yellow-500 font-medium hover:underline">Crear usuario</Link>
      </div>
      <form className="py-2 flex flex-col gap-2" onSubmit={login}>
        <LoginEmail onChange={({target:{value}}) => setLoginUser({...loginUser, email:value})} />
        <LoginPass onChange={({target:{value}}) => setLoginUser({...loginUser, password:value})}/>
        <div className="w-full px-2 flex flex-col gap-2">
          <div className="w-full px-2 mb-2  flex justify-between">
            <Link to='/' className="text-sm hover:text-yellow-500">¿Olvidaste tu contraseña?</Link>
          </div>
          <button className="w-full h-8 flex justify-center items-center bg-blue-500 text-white text-sm rounded md">
            Iniciar sesion
          </button>
        </div>
      </form>
    </div>
  )
}
