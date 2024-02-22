import { useState, createContext, useContext } from 'react'
import { existsUser } from '../../../services/user'

const RegistrationContext = createContext()
export const useRegistrationContext = () => useContext(RegistrationContext)

export const RegistrationContextProvider = ({children}) => {
  const [step, setStep] = useState(0)
  const [userToRegister, setUserToRegister] = useState({})
  const [userToRegisterError, setUserToRegisterError] = useState([])

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
      stepId: 'password',
      title:'Creá tu contraseña',
      successTitle: 'Contraseña creada',
      description:'Mantendrás tu cuenta protegida.',
      icon:'lock',
      href:'password-validation'
    }
  ]

  const validateEmail = async () => {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const err = []
    
    if (!emailFormat.test(userToRegister.email)) {
      err.push('email-format')
    }

    if (!userToRegister.conditions) {
      err.push('conditions')
    }
    
    const userExists = await existsUser(userToRegister.email);
    if (userExists) {
      err.push('email-exists')
    }

    setUserToRegisterError(err)
    return err.length === 0
  }

  const validateName = async () => {
    const err = []
    
    if(!userToRegister.name) {
      err.push('name')
    }

    if(!userToRegister.lastName) {
      err.push('lastName')
    }

    setUserToRegisterError(err)
    return err.length === 0
  }

  const validatePassword = async () => {
    const err = []
    const passwordFormat = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

    if(!userToRegister.password) { 
      err.push('password')
    }

    if(!passwordFormat.test(userToRegister.password)) {
      err.push('password-format')
    }

    if(userToRegister.password !== userToRegister.confirmPassword) {
      err.push('password-confirm')
    }

    setUserToRegisterError(err)
    return err.length === 0
  }
  
  return (
    <RegistrationContext.Provider value={{userToRegister, setUserToRegister, steps, step, nextStep, validateEmail, validateName, validatePassword, userToRegisterError, setUserToRegisterError}}>
      {children}
    </RegistrationContext.Provider>
  )
}
