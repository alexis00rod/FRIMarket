import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegistrationContext } from "./context/RegistrationContext"
import { InputText, Notification } from "../../components"

export const RegistrationName = () => {
  const {step, userToRegister, setUserToRegister, nextStep, validateName, userToRegisterError} = useRegistrationContext()
  const [validateLoader, setValidateLoader] = useState()
  const navigate = useNavigate()

  const handleKeyPress = e => {
    const key = e.which || e.keyCode
    if (((key < 65 || key > 90) && (key < 97 || key > 122)) && key !== 32 ) {
      e.preventDefault()
    }
  }

  const submitValidateName = async e => {
    e.preventDefault()
    const validate = await validateName()

    if(validate) {
      setValidateLoader(true)
      setTimeout(() => {
        if(step === 1) nextStep()
        navigate('/registration')
      }, 1000)
    }
  }
  return (
    <section className="registration">
      {!validateLoader
      ? <div className="registration-form">
          <h2>Elegí cómo querés que te llamemos</h2>
          <div className="registration-inputs">
            <div className="registration-input">
              <InputText 
              size='input-l' 
              label='Nombre' 
              id='name' 
              name='name'
              value={userToRegister.name || ''}
              onChange={({target: {value}}) => setUserToRegister({...userToRegister, name: value})} 
              onKeyPress={handleKeyPress}
              />
              {/* Error nombre */}
              {userToRegisterError.includes('name') &&
                <Notification message='Escribe tu nombre.'/>}
            </div>
            <div className="registration-input">
              <InputText 
              size='input-l' 
              label='Apellido' 
              id='lastName' 
              name='lastName' 
              value={userToRegister.lastName || ''}
              onChange={({target: {value}}) => setUserToRegister({...userToRegister, lastName: value})}
              onKeyPress={handleKeyPress}
              />
              {userToRegisterError.includes('lastName') &&
                <Notification message='Escribe tu apellido.' />}
            </div>
          </div>
          <div className="registration-buttons">
            <button 
            onClick={submitValidateName} 
            className="btn btn-text btn-blue"
            disabled={!userToRegister.name || !userToRegister.lastName}
            >
              Continuar
            </button>
          </div>
        </div>
      : <div className="registration-loading">
          <i className="text-white bg-green-500 fa-solid fa-check"></i>
          <p>Nombre elegido</p>
        </div>}
    </section>
  )
}
