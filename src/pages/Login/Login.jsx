import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginContext } from "../../context/LoginContext/LoginContext.jsx"
import { getSnapUser, getSnapUserById } from "../../services/user.js"
import { InputText } from "../../components/index.js"

export const Login = () => {
  const { setUserToLogin } = useLoginContext()
  const [userToFind, setUserToFind] = useState('')
  const [loader, setLoader] = useState()
  const [userToFindError, setUserToFindError] = useState()
  const navigate = useNavigate()

  const findUser = async e => {
    e.preventDefault()
    setLoader(true)
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
          setLoader()
          setUserToFindError('Revisa el e-mail.')
        }
      } catch (err) {
        setLoader()
        setUserToFindError('Ocurrió un error, inténtalo más tarde.')
      }
    } else {
      try {
        const user = await getSnapUserById(userToFind)
        if(!user) {
          setLoader()
          setUserToFindError('Revisa el nombre de usuario.')
        } else {
          setUserToLogin({
            id: user.id,
            ...user.data()
          })
          navigate('/login/enter-pass')
        }
      } catch (err) {
        setLoader()
        setUserToFindError('Ocurrió un error, inténtalo más tarde.')
      }
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
          <h2 className="mt-6 md:mt-0 text-2xl font-medium">Ingresá tu e‑mail o usuario de FRIMarket</h2>
          <div className="relative mt-6">
            <InputText 
            size='input-l'
            label='E‑mail o usuario'
            id='user'
            name='user'
            value={userToFind} 
            onChange={e => setUserToFind(e.target.value)}
            required
            />
            {userToFindError &&
              <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="pl-2 font-medium">{userToFindError}</span>
              </p>
            }
          </div>
          <div className="mt-6 flex">
            <button onClick={findUser} className="mr-4 btn btn-m btn-blue">
              <span className="text-sm font-medium">Continuar</span>
            </button>
            <Link to='/registration' className="btn btn-text-blue btn-m">
              <span className="text-sm font-medium">Crear cuenta</span>
            </Link>
          </div>
        </section>}
    </main>
  )
}
