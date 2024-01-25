import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegistrationContext } from "../../context/RegistrationContext/RegistrationContext"
import { existsUser } from "../../services/user"
import { InputEmail } from "../../components"

export const EmailValidation = () => {
  const {userToRegister, setUserToRegister, nextStep} = useRegistrationContext()
  const [emailToValidate,setEmailToValidate] = useState()
  const [validateError, setValidateError] = useState()
  const [validateLoader, setValidateLoader] = useState()
  const navigate = useNavigate()
  const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  const validateEmail = async ({email, conditions}) => {
    let emailTest = emailRegexp.test(email)
    !emailTest && setValidateError("Usá el formato nombre@ejemplo.com.")

    let conditionsTest = conditions === 'on' ? true : false
    !conditions && setValidateError('Acepta los terminos y condiciones.')

    return emailTest && conditionsTest
  }

  const handleEmailToValidate = ({target:{name,value}}) => {
    setEmailToValidate({
      ...emailToValidate,
      [name]: value
    })
  }

  const submitEmailToValidate = async e => {
    e.preventDefault()
    setValidateLoader('loading')
    const validate = await validateEmail(emailToValidate)
    const exists = await existsUser(emailToValidate.email) 

    if(validate) {
      if(exists) {
        setValidateLoader()
        setValidateError('El email elegido ya esta en uso.')
      } else {
        setUserToRegister({
          ...userToRegister,
          email: emailToValidate.email
        })
        setValidateLoader('add')
        setTimeout(() => {
          nextStep()
          navigate('/registration')
        }, 1000)
      }
    } else {
      setValidateLoader()
    }
  }

  return (
    <main className="grow flex flex-col">
      {!validateLoader && 
        <section className="w-full md:max-w-[26rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
          <h2 className="mt-6 md:mt-0 text-2xl font-medium">Ingresá tu e-mail</h2>
          {/* Input - email */}
          <div className="relative mt-6">
            <InputEmail 
            size='input-l'
            value={userToRegister.email} 
            onChange={e => handleEmailToValidate(e)}
            required
            />
            {validateError &&
              <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span className="pl-2 font-medium">{validateError}</span>
              </p>
            }
          </div>
          {/* Input - Condiciones y terminos */}
          <div className="mt-6 p-1 flex">
            <input 
            type="checkbox" 
            name="conditions" 
            id="conditions"  
            onChange={e => handleEmailToValidate(e)}
            />
            <label htmlFor="conditions" className="pl-2 text-sm font-light cursor-pointer">Acepto los <span className="text-blue-500 duration-150 hover:underline hover:text-blue-700">Términos y condiciones</span></label>
          </div>
          {/* Boton agregar email */}
          <div className="mt-6">
            <button onClick={submitEmailToValidate} className="btn btn- btn-blue"><span className="text-sm font-medium">Continuar</span></button>
          </div>
        </section>}
      {validateLoader === 'loading' && 
        <div className="grow flex items-center justify-center">
          <div
            className="inline-block h-14 w-14 animate-spin rounded-full text-blue-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
          </div>
        </div>}
      {validateLoader === 'add' && 
        <section className="w-full md:max-w-[26rem] md:h-[26rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col items-center justify-center grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
          <div className="w-14 h-14 flex items-center justify-center flex-none text-2xl text-white bg-green-500 rounded-full">
            <i className="fa-solid fa-check"></i>
          </div>
          <p className="mt-6 text-center text-2xl font-medium">Email agregado</p>
        </section>}
    </main>
  )
}
