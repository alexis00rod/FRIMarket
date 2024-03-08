import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegistrationContext } from "./context/RegistrationContext"
import { ButtonLoader, InputCheckbox, InputEmail, Notification } from "../../components"

export const RegistrationEmail = () => {
  const {step, nextStep, userToRegister, setUserToRegister, validateEmail, userToRegisterError} = useRegistrationContext()
  const [validateLoader, setValidateLoader] = useState()
  const navigate = useNavigate()

  const submitEmailToValidate = async e => {
    e.preventDefault()
    setValidateLoader('loading')
    const validate = await validateEmail()

    if(validate) {
      setValidateLoader('add')
      setTimeout(() => {
        if(step === 0) nextStep()
        navigate('/registration')
      }, 1000)
    } else {
      setValidateLoader()
    }
  }

  return (
    <section className="registration">
      {validateLoader !== 'add'
      ? <div className="registration-form">
          <h2>Ingresá tu e-mail</h2>
          <div className="registration-inputs">
            <div className="registration-input">
              <InputEmail
                size="input-l"
                value={userToRegister.email || ""}
                onChange={({target:{value}}) => setUserToRegister({ ...userToRegister, email: value })}
                required
              />
              {/* Error email formato */}
              {userToRegisterError.includes('email-format') &&
                <Notification message='Usá el formato nombre@ejemplo.com.' />}
              {/* Error email existente */}
              {userToRegisterError.includes("email-exists") && 
                <Notification message='El email elegido ya esta en uso.' />}
            </div>
            <div className="registration-input">
              <InputCheckbox 
              name='conditions'
              id='conditions'
              checked={userToRegister.conditions || false}
              onChange={({target:{checked}}) => setUserToRegister({ ...userToRegister, conditions: checked })}
              >
                Acepto los
                <span className="ml-1 text-blue-500 duration-150 hover:underline hover:text-blue-700">
                Términos y condiciones
                </span>
              </InputCheckbox>
              {userToRegisterError.includes("conditions") && 
                <Notification message='Acepta los terminos y condiciones.' />}
            </div>
          </div>
          <div className="registration-buttons">
            {validateLoader === 'loading' && validateLoader !== 'add' 
              ? <ButtonLoader />
              : <button 
                onClick={submitEmailToValidate} 
                className="btn btn-l btn-blue btn-text"
                disabled={!userToRegister.email || !userToRegister.conditions}
                >
                  Continuar
                </button>}
          </div>
        </div>
      : <div className="registration-loading">
          <i className="bg-green-500 text-white fa-solid fa-check"></i>
          <p>Email agregado</p>
        </div>}
    </section>
  )
}
