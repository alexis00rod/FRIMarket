import { useState } from "react"
import { InputText } from "../../components"
import { useRegistrationContext } from "../../context/RegistrationContext/RegistrationContext"
import { useNavigate } from "react-router-dom"
import { generateDisplayName, generateIdUser } from "../../services/format"

export const NameValidation = () => {
  const {userToRegister, setUserToRegister, nextStep} = useRegistrationContext()
  const [nameToValidate,setNameToValidate] = useState()
  const [validateLoader, setValidateLoader] = useState()
  const navigate = useNavigate()

  const handleKeyPress = e => {
    const key = e.which || e.keyCode
    if (((key < 65 || key > 90) && (key < 97 || key > 122)) && key !== 32 ) {
      e.preventDefault();
    }
  }

  const handleNameValidate = ({target:{name,value}}) => {
    setNameToValidate({
      ...nameToValidate,
      [name]:value
    })
  }

  const submitValidateName = e => {
    e.preventDefault()
    setUserToRegister({
      ...userToRegister,
      displayName: generateDisplayName(nameToValidate),
      idUser: generateIdUser(nameToValidate)
    })
    setValidateLoader(true)
    setTimeout(() => {
      nextStep()
      navigate('/registration')
    }, 1000)
  }

  return (
    <main className="grow flex flex-col">
      {!validateLoader && 
        <section className="w-full md:max-w-[26rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
          <h2 className="mt-6 md:mt-0 text-2xl font-medium">Elegí cómo querés que te llamemos</h2>
            {/* Input - Nombre */}
            <div className="mt-6">
              <InputText 
              size='input-l' 
              label='Nombre' 
              id='name' 
              name='name' 
              onChange={e => handleNameValidate(e)} 
              onKeyPress={handleKeyPress}
              />
            </div>
            {/* Input - Apellido */}
            <div className="mt-6 mb-1.5">
              <InputText 
              size='input-l' 
              label='Apellido' 
              id='lastName' 
              name='lastName' 
              onChange={e => handleNameValidate(e)} 
              onKeyPress={handleKeyPress}
              />
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
