import { useState, useEffect, createContext, useContext } from 'react'
import { stateAuth } from '../../services/auth'
import { getUser } from '../../services/firestore'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [userLogged, setUserLogged] = useState()
  const [userLoggedProfile, setUserLoggedProfile] = useState({})

  useEffect(() => {
    stateAuth(setUserLogged)
  },[])
  
  useEffect(() => {
    userLogged &&
    getUser(userLogged.email,setUserLoggedProfile)
  },[userLogged])

  return (
    <AuthContext.Provider value={{userLogged, userLoggedProfile}}>
      {children}
    </AuthContext.Provider>
  )
}
