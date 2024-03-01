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
    <section className="section section-xs">
      {!validateLoader 
      ? <div className="form">
          <h2 className="form-title">Creá tu contraseña</h2>
          {/* Contrase;a */}
          <div className="form-item">
            <InputPassword 
            label='Ingresá tu contraseña' 
            id='password' 
            name='password'
            value={userToRegister.password || ''}
            onChange={({target:{value}}) => setUserToRegister({...userToRegister, password: value})} 
            required
            />
            {/* Error contrase;a */}
            {userToRegisterError.includes('password') &&
              <Notification message='Escribe la contraseña.' />}
            {/* Error contrase;a formato */}
            {!userToRegisterError.includes('password') && userToRegisterError.includes('password-format') &&
              <Notification message='Mínimo 8 caracteres con letras y números.' />}
          </div>
          {/* Confirmar contrase;a */}
          <div className="form-item form-item-last">
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
          {/* Boton crear contraseña */}
          <div className="form-handle">
            {validateLoader === 'loading' && validateLoader !== 'add' && validateLoader !== 'finish'
            ? <ButtonLoader />
            : <button onClick={submitPasswordToValidate} className="btn btn-text btn-blue">Continuar</button>}
          </div>
        </div>
      : <div className="form form-result">
          {validateLoader === 'add' &&
            <>
              <div className="form-result-icon text-white bg-green-500">
                <i className="fa-solid fa-check"></i>
              </div>
              <p className="form-result-message">Contraseña creada</p>
            </>}
          {validateLoader === 'processing' &&
            <p className="form-result-message">Procesando datos...</p>}
          {validateLoader === 'finish' &&
            <>
              <div className="form-result-icon text-yellow-500">
                <i className="fa-solid fa-hands-clapping"></i>
              </div>
              <p className="form-result-message">Datos completados! Creaste tu cuenta!</p>
            </>}
        </div>}
    </section>
  )
}
