import { useState, useEffect, createContext, useContext } from 'react'
import { stateAuth } from '../../services/auth'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [userLogged, setUserLogged] = useState()

  useEffect(() => {
    stateAuth(setUserLogged)
  },[])
  
  return (
    <AuthContext.Provider value={{userLogged}}>
      {children}
    </AuthContext.Provider>
  )
}
