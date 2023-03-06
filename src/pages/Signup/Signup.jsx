import { useState } from "react"
import { Link } from "react-router-dom"
import { SignupEmail, SignupName, SignupPass } from "../../components/index.js"

export const Signup = () => {
  const [signupUser, setSignupUser] = useState({})

  const signup = e => {
    e.preventDefault()
    console.log(signupUser)
  }

  return (
    <div className="w-full max-w-xl px-2 py-2 mx-auto flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
      <div className="px-3 py-3 flex items-center gap-2">
        <h2 className="text-xl font-semibold capitalize">Crear usuario</h2>
        <Link className="px-2 text-sm text-yellow-500 font-medium hover:underline">Iniciar sesion</Link>
      </div>
      <form className="py-2 flex flex-col gap-2" onSubmit={signup}>
        <SignupName onChange={({target:{value}}) => setSignupUser({...signupUser,name:value})} />
        <SignupEmail onChange={({target:{value}}) => setSignupUser({...signupUser,email:value})} />
        <SignupPass onChange={({target:{value}}) => setSignupUser({...signupUser,password:value})} />
        <div className="w-full px-2 py-2 flex flex-col gap-2">
          <button type="submit" className="w-full h-8 flex justify-center items-center bg-blue-500 text-white text-sm rounded md">
            Crear usuario
          </button>
        </div>
      </form>
    </div>
  )
}
