import {useState, useEffect} from 'react'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { getUser } from '../services/firestore.js'

export const useProfile = () => {
  const [profile, setProfile] = useState()
  const {userLogged} = useAuthContext()
  
  useEffect(() => {
    getUser(userLogged.email,setProfile)

  },[userLogged])

  return {profile}
}
