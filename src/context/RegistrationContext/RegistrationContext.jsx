import { useState, createContext, useContext } from 'react'
import { registerEmailPassword } from '../../services/auth'

const RegistrationContext = createContext()
export const useRegistrationContext = () => useContext(RegistrationContext)

export const RegistrationContextProvider = ({children}) => {
  const [step, setStep] = useState(0)
  const [userToRegister, setUserToRegister] = useState({})

  const nextStep = () => setStep(step + 1)

  const steps = [
    {
      id:0,
      stepId:'email',
      title:'Agregá tu email',
      successTitle: 'Email agregado',
      description:'Recibirás información de tu cuenta.',
      icon:'envelope',
      href:'email-validation'
    },
    {
      id:1,
      title:'Elegí tu nombre',
      stepId:'displayName',
      successTitle: 'Nombre elegido',
      description:'Contanos cómo querés que te llamemos.',
      icon:'clipboard-user',
      href:'name-validation'
    },
    {
      id:2,
      title:'Creá tu contraseña',
      successTitle: 'Contraseña creada',
      description:'Mantendrás tu cuenta protegida.',
      icon:'lock',
      href:'password-validation'
    }
  ]
  
  return (
    <RegistrationContext.Provider value={{userToRegister, setUserToRegister, steps, step, nextStep}}>
      {children}
    </RegistrationContext.Provider>
  )
}
