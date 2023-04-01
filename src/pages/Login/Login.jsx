import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginEmailPass } from "../../services/auth"
import { Button, InputEmail, InputPassword } from "../../components/index.js"

export const Login = () => {
  const [loginUser, setLoginUser] = useState({})
  const [loginError, setLoginError] = useState()
  const navigate = useNavigate()

  const submitLogin = async e => {
    e.preventDefault()
    setLoginError("")
    try {
      await loginEmailPass(loginUser)
      navigate('/')
    } catch (err) {
      setLoginError(`${err.code.replace("auth/","")}`)
    }
  }

  const handleLogin = ({target:{name,value}}) => {
    setLoginUser({
      ...loginUser,
      [name]: value
    })
  }

  return (
    <main>
      <div className="box box-form">
        <h2 className="box-header text-xl font-medium">Iniciar sesion</h2>
        <form className="box-body flex flex-col gap-4" onSubmit={submitLogin}>
          {loginError && <p className="px-2 py-2 text-sm text-red-500">{loginError}</p>}
          <InputEmail 
          label='Email' 
          size='input-l'
          value={loginUser.email} 
          onChange={handleLogin} 
          />
          <InputPassword 
          label='Contraseña' 
          size='input-l'
          id='password' 
          value={loginUser.password} 
          onChange={handleLogin} 
          />
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full flex items-center justify-between flex-wrap">
              <Link to='/' className="link link-black">¿Olvidaste tu contraseña?</Link>
              <Link to='/signup' className="link link-black">Crear usuario</Link>
            </div>
            <Button color='btn-blue' size='btn-l' ><span className="text-sm font-medium">Iniciar sesion</span></Button>
          </div>
        </form>
      </div>
    </main>
  )
}
