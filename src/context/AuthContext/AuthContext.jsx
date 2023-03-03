import { useState, useEffect, createContext, useContext } from 'react'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [userLogged, setUserLogged] = useState('rodalrd')

  return (
    <AuthContext.Provider value={userLogged}>
      {children}
    </AuthContext.Provider>
  )
}
