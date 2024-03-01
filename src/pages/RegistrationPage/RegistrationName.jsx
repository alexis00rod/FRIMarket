import { useState } from "react"
import { InputText, Notification } from "../../components"
import { useRegistrationContext } from "./context/RegistrationContext"
import { useNavigate } from "react-router-dom"

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
    <section className="section section-xs">
      {!validateLoader
      ? <div className="form">
          <h2 className="form-title">Elegí cómo querés que te llamemos</h2>
          {/* Nombre */}
          <div className="form-item">
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
          {/* Apellido */}
          <div className="form-item form-item-last">
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
          {/* Boton elegir nombre */}
          <div className="form-handle">
            <button onClick={submitValidateName} className="btn btn-text btn-blue">Continuar</button>
          </div>
        </div>
      : <div className="form form-result">
          <div className="form-result-icon text-white bg-green-500">
            <i className="fa-solid fa-check"></i>
          </div>
          <p className="form-result-message">Nombre elegido</p>
        </div>}
    </section>
  )
}
