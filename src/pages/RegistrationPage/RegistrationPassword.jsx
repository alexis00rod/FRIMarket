import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegistrationContext } from "./context/RegistrationContext"
import { loginEmailPass, registerEmailPassword } from "../../services/auth"
import { addProfile } from "../../services/user"
import { formatCapitalize, generateDisplayName, generateIdUser } from "../../services/format"
import { ButtonLoader, InputPassword, Notification } from "../../components"

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
            name: formatCapitalize(userToRegister.name),
            lastName: formatCapitalize(userToRegister.lastName),
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
    <section className="registration">
      {!validateLoader
      ? <div className="registration-form">
          <h2>Creá tu contraseña</h2>
          <div className="registration-inputs">
            <div className="registration-input">
              <InputPassword 
              label='Ingresá tu contraseña' 
              id='password' 
              name='password'
              value={userToRegister.password || ''}
              onChange={({target:{value}}) => setUserToRegister({...userToRegister, password: value})} 
              required
              />
              {userToRegisterError.includes('password') &&
                <Notification message='Escribe la contraseña.' />}
              {!userToRegisterError.includes('password') && userToRegisterError.includes('password-format') &&
                <Notification message='Mínimo 8 caracteres con letras y números.' />}
            </div>
            <div className="registration-input">
              <InputPassword 
              label='Confirmá tu contraseña' 
              id='confirmPassword' 
              name='confirmPassword' 
              value={userToRegister.confirmPassword || ''}
              onChange={({target:{value}}) => setUserToRegister({...userToRegister, confirmPassword: value})}  
              required
              />
              {userToRegisterError.includes('password-confirm') &&
                <Notification message='Las contraseñas no coinciden.' />}
            </div>
          </div>
          <div className="registration-buttons">
            {validateLoader === 'loading' && validateLoader !== 'add' && validateLoader !== 'finish'
            ? <ButtonLoader />
            : <button 
              onClick={submitPasswordToValidate} 
              className="btn btn-text btn-blue"
              disabled={!userToRegister.password || !userToRegister.confirmPassword}
              >
                Continuar
              </button>}
          </div>
        </div>
      : <div className="registration-loading">
          {validateLoader === 'add' && 
          <>
            <i className="text-white bg-green-500 fa-solid fa-check"></i>
            <p>Contraseña creada</p>
          </>}
          {validateLoader === 'processing' &&
            <p>Procesando datos...</p>}
          {validateLoader === 'finish' &&
          <>
            <i className="text-yellow-500 fa-solid fa-hands-clapping"></i>
            <p>Datos completados! Creaste tu cuenta!</p>
          </>}
        </div>}
      
    </section>
  )
}
