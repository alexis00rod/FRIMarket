import { useState } from "react"
import { InputText } from "../../components"
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
    <main className="grow flex flex-col">
      {!validateLoader && 
        <section className="w-full md:max-w-[26rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
          <h2 className="mt-6 md:mt-0 text-2xl font-medium">Elegí cómo querés que te llamemos</h2>
            {/* Input - Nombre */}
            <div className="relative mt-6">
              <InputText 
              size='input-l' 
              label='Nombre' 
              id='name' 
              name='name'
              value={userToRegister.name || ''}
              onChange={({target: {value}}) => setUserToRegister({...userToRegister, name: value})} 
              onKeyPress={handleKeyPress}
              />
              {userToRegisterError.includes('name') &&
                <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="pl-2 font-medium">Escribe tu nombre.</span>
                </p>}
            </div>
            {/* Input - Apellido */}
            <div className="relative mt-6 mb-1.5">
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
                <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="pl-2 font-medium">Escribe tu apellido.</span>
                </p>}
            </div>
            {/* Boton elegir nombre */}
            <div className="mt-6">
              <button onClick={submitValidateName} className="btn btn- btn-blue"><span className="text-sm font-medium">Continuar</span></button>
            </div>
        </section>}
      {validateLoader && 
        <section className="w-full md:max-w-[26rem] md:h-[26rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col items-center justify-center grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
          <div className="w-14 h-14 flex items-center justify-center flex-none text-2xl text-white bg-green-500 rounded-full">
            <i className="fa-solid fa-check"></i>
          </div>
          <p className="mt-6 text-center text-2xl font-medium">Nombre elegido</p>
        </section>}
    </main>
  )
}
