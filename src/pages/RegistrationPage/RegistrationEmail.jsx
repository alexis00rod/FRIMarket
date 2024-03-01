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
    <section className="section section-xs">
      {validateLoader !== 'add'
      ? <>
          <div className="form">
            <h2 className="form-title">Ingresá tu e-mail</h2>
            {/* Email */}
            <div className="form-item">
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
            {/* Condiciones y terminos */}
            <div className="form-item">
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
              {/* Error terminos y condiciones */}
              {userToRegisterError.includes("conditions") && 
                <Notification message='Acepta los terminos y condiciones.' />}
            </div>
            {/* Boton agregar email */}
            <div className="form-handle">
              {validateLoader === 'loading' && validateLoader !== 'add' 
                ? <ButtonLoader />
                : <button onClick={submitEmailToValidate} className="btn btn-l btn-blue btn-text">Continuar</button>}
            </div>
          </div>
        </>
      : <div className="form form-result">
          <div className="form-result-icon text-white bg-green-500">
            <i className="fa-solid fa-check"></i>
          </div>
          <p className="form-result-message">Email agregado</p>
        </div>}
    </section>
  )
}
