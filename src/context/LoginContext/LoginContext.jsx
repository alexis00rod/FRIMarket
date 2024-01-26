import { useState, createContext, useContext } from 'react'

const LoginContext = createContext()
export const useLoginContext = () => useContext(LoginContext)

export const LoginContextProvider = ({children}) => {
  const [userToLogin, setUserToLogin] = useState()

  return (
    <LoginContext.Provider value={{userToLogin, setUserToLogin}}>
      {children}
    </LoginContext.Provider>
  )
}
