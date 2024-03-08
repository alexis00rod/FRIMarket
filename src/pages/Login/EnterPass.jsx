import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginContext } from "./context/LoginContext"
import { loginEmailPass } from "../../services/auth"
import { ButtonLoader, InputPassword, Notification } from "../../components"

export const EnterPass = () => {
  const {userToLogin} = useLoginContext()
  const {email, photoURL, idUser} = userToLogin
  const [pass, setPass] = useState()
  const [loginError, setLoginError] = useState()
  const [loginLoader, setLoginLoader] = useState(false)
  const navigate = useNavigate()

  const submitLogin =  async e => {
    e.preventDefault()
    setLoginLoader(true)
    try {
      await loginEmailPass(userToLogin.email, pass)
      navigate('/')
    } catch (err) {
      setLoginError(`${err.code.replace("auth/","")}`)
      setLoginLoader(false)
    }
  }

  return (
    <section className="login">
      <div className="login-form">
        <h2>Ingresá tu contraseña de FRIMarket</h2>
        <div className="login-inputs">
          <div className="login-user">
            <img src={photoURL} alt={idUser}/>
            <div className="flex flex-col grow text-xs">
              <span>{email}</span>
              <Link to='/login' className="w-max text-blue-500">Cambiar cuenta</Link>
            </div>
          </div>
          <div className="login-input">
            <InputPassword 
            label='Contraseña'
            value={pass || ''}
            id='password'
            name='password'
            onChange={({target:{value}}) => setPass(value)}
            required
            />
            {loginError &&
              <Notification message={loginError}/>}
          </div>
        </div>
        <div className="login-buttons">
          {loginLoader
          ? <ButtonLoader />
          : <button 
            onClick={submitLogin} 
            disabled={!pass}
            className="btn btn-m btn-blue btn-text"
            >
              Iniciar sesion
            </button>}
        </div>
      </div>
    </section>
  )
}
