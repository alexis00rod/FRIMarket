import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginContext } from "../../context/LoginContext/LoginContext"
import { loginEmailPass } from "../../services/auth"
import { InputPassword } from "../../components"

export const EnterPass = () => {
  const {userToLogin} = useLoginContext()
  const {email, photoURL, idUser} = userToLogin
  const [pass, setPass] = useState('')
  const [loginError, setLoginError] = useState()
  const [loader, setLoader] = useState()
  const navigate = useNavigate()

  const submitLogin =  async e => {
    e.preventDefault()
    setLoader(true)
    try {
      await loginEmailPass(userToLogin.email, pass)
      navigate('/')
    } catch (err) {
      setLoginError(`${err.code.replace("auth/","")}`)
      setLoader()
    }
  }
  
  return (
    <main className="grow flex flex-col">
      {loader
      ? <div className="grow flex items-center justify-center">
          <div
            className="inline-block h-14 w-14 animate-spin rounded-full text-blue-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
          </div>
        </div>
      : <section className="w-full md:max-w-[33rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
          <h2 className="mt-6 md:mt-0 text-2xl font-medium">Ingresá tu contraseña de FRIMarket</h2>
          <div className="w-max mt-4 px-2 py-2 flex items-center border border-slate-300 rounded-full">
            <img src={photoURL} alt={idUser} className="w-8 h-8 flex flex-none rounded-full"/>
            <div className="px-2 flex flex-col grow text-xs">
              <span>{email}</span>
              <Link to='/login' className="w-max text-blue-500">Cambiar cuenta</Link>
            </div>
          </div>
          <div className="relative mt-6">
            <InputPassword 
            label='Contraseña'
            value={pass}
            id='password'
            name='password'
            onChange={({target:{value}}) => setPass(value)}
            required
            />
            {loginError &&
              <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="pl-2 font-medium">{loginError}</span>
              </p>
            }
          </div>
          <div className="mt-6 flex">
            <button onClick={submitLogin} className="mr-4 btn btn-m btn-blue">
              <span className="text-sm font-medium">Iniciar sesion</span>
            </button>
          </div>
        </section>}
    </main>
  )
}
