import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginContext } from "./context/LoginContext.jsx"
import { getSnapUser, getSnapUserById } from "../../services/user.js"
import { ButtonLoader, InputText, Notification } from "../../components/index.js"

export const Login = () => {
  const { setUserToLogin } = useLoginContext()
  const [userToFind, setUserToFind] = useState()
  const [userToFindLoader, setUserToFindLoader] = useState()
  const [userToFindError, setUserToFindError] = useState(false)
  const navigate = useNavigate()

  const findUser = async e => {
    e.preventDefault()
    setUserToFindLoader(true)
    if(userToFind.includes('@')) {
      try {
        const user = await getSnapUser(userToFind)
        if(user.exists()) {
          setUserToLogin({
            id: user.id,
            ...user.data()
          })
          navigate('/login/enter-pass')
        } else {
          setUserToFindLoader(false)
          setUserToFindError('Revisa el e-mail.')
        }
      } catch (err) {
        setUserToFindLoader(false)
        setUserToFindError('Ocurrió un error, inténtalo más tarde.')
      }
    } else {
      try {
        const user = await getSnapUserById(userToFind)
        if(!user) {
          setUserToFindLoader(false)
          setUserToFindError('Revisa el nombre de usuario.')
        } else {
          setUserToLogin({
            id: user.id,
            ...user.data()
          })
          navigate('/login/enter-pass')
        }
      } catch (err) {
        setUserToFindLoader(false)
        setUserToFindError('Ocurrió un error, inténtalo más tarde.')
      }
    }
  }

  return (
    <section className="login">
      <div className="login-form">
        <h2>Ingresá tu e‑mail o usuario de FRIMarket</h2>
        <div className="login-inputs">
          <div className="login-input">
            <InputText 
            size='input-l'
            label='E‑mail o usuario'
            id='user'
            name='user'
            value={userToFind || ''} 
            onChange={({target:{value}}) => setUserToFind(value)}
            required
            />
            {userToFindError &&
              <Notification message={userToFindError}/>}
          </div>
        </div>
        <div className="login-buttons">
          {userToFindLoader
          ? <ButtonLoader />
          : <button 
            onClick={findUser} 
            className="btn btn-m btn-blue btn-text"
            disabled={!userToFind}
            >
              Continuar
            </button>}
          <Link to='/registration' className="btn btn-text-blue btn-m btn-text">
            Crear cuenta
          </Link>
        </div>
      </div>
    </section>
  )

}
