import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegistrationContext } from "./context/RegistrationContext"
import { loginEmailPass, registerEmailPassword } from "../../services/auth"
import { addProfile } from "../../services/user"
import { generateDisplayName, generateIdUser } from "../../services/format"
import { InputPassword } from "../../components"

export const RegistrationPassword = () => {
  const {userToRegister, setUserToRegister, validatePassword, userToRegisterError} = useRegistrationContext()
  const [validateLoader, setValidateLoader] = useState()
  const navigate = useNavigate()

  const submitPasswordToValidate = async e => {
    e.preventDefault()
    setValidateLoader('loading')
    const validate = await validatePassword()

    if(validate) {
      setValidateLoader('add')
      setTimeout(async () => {
        try {
          setValidateLoader('processing')
          await registerEmailPassword(userToRegister.email, userToRegister.password)
          await addProfile({
            email: userToRegister.email,
            displayName: generateDisplayName(userToRegister),
            idUser: generateIdUser(userToRegister)
          })
          await loginEmailPass(userToRegister.email, userToRegister.password)
          setValidateLoader('finish')
          setTimeout(() => {
            navigate('/')
            setUserToRegister({})
          }, 1000)
        } catch (err) {
          setValidateLoader()
          alert('Ocurrio un error, por favor intentanlo mas tarde.')
        }
      },1000)
    } else {
      setValidateLoader()
    }
  }

  return (
    <main className="grow flex flex-col">
      {validateLoader === 'loading' 
        ? <div className="grow flex items-center justify-center">
            <div
              className="inline-block h-14 w-14 animate-spin rounded-full text-blue-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
            </div>
          </div>
        : <section className={`w-full md:max-w-[26rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md ${validateLoader && 'md:h-[26rem] items-center justify-center'}`}>
            {!validateLoader &&
            <>
              <h2 className="mt-6 md:mt-0 text-2xl font-medium">Creá tu contraseña</h2>
              {/* Contraseña */}
              <div className="relative mt-6">
                <InputPassword 
                label='Ingresá tu contraseña' 
                id='password' 
                name='password'
                value={userToRegister.password || ''}
                onChange={({target:{value}}) => setUserToRegister({...userToRegister, password: value})} 
                required
                />
                {userToRegisterError.includes('password') &&
                  <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="pl-2 font-medium">Escribe la contraseña.</span>
                  </p>}
                {!userToRegisterError.includes('password') && userToRegisterError.includes('password-format') &&
                  <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="pl-2 font-medium">Mínimo 8 caracteres con letras y números.</span>
                  </p>}
              </div>
              {/* Confirmar contraseña */}
              <div className="relative mt-6 mb-1.5">
                <InputPassword 
                label='Confirmá tu contraseña' 
                id='confirmPassword' 
                name='confirmPassword' 
                value={userToRegister.confirmPassword || ''}
                onChange={({target:{value}}) => setUserToRegister({...userToRegister, confirmPassword: value})}  
                required
                />
                {userToRegisterError.includes('password-confirm') &&
                  <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="pl-2 font-medium">Las contraseñas no coinciden.</span>
                  </p>}
              </div>
              {/* Boton crear contraseña */}
              <div className="mt-6">
                <button onClick={submitPasswordToValidate} className="btn btn- btn-blue"><span className="text-sm font-medium">Continuar</span></button>
              </div>
            </>}
            {validateLoader === 'add' &&
            <>
              <div className="w-14 h-14 flex items-center justify-center flex-none text-2xl text-white bg-green-500 rounded-full">
                <i className="fa-solid fa-check"></i>
              </div>
              <p className="mt-6 text-center text-2xl font-medium">Contraseña creada</p>
            </>}
            {validateLoader === 'processing' && <p className="mt-6 text-center text-2xl font-medium">Procesando datos...</p>}
            {validateLoader === 'finish' &&
            <>
              <div className="w-14 h-14 flex items-center justify-center flex-none text-2xl text-yellow-500">
                <i className="fa-solid fa-hands-clapping"></i>
              </div>
              <p className="mt-6 text-center text-2xl font-medium">Datos completados! Creaste tu cuenta!</p>
            </>}
          </section>}
    </main>
  )
}
