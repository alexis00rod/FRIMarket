import { app } from "./firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const auth = getAuth(app)

// Funcion para  crear usuario con email y contraseña
export const signupEmailPass = ({name,email,password}) => {
  return createUserWithEmailAndPassword(auth, email, password)
  .then(credential => {
    updateProfile(auth.currentUser,{displayName:name})
  })
}

// Funcion para iniciar sesio usando email y contraseña
export const loginEmailPass = ({email,password}) => signInWithEmailAndPassword(auth,email,password)

// Funcion para detectar el estado de la autenticacion
export const stateAuth = (set) => {
  const unsubuscribe = onAuthStateChanged(auth, currentUser => {set(currentUser)})
  return () => unsubuscribe()
}

// Funcion para cerrar sesion
export const logout = () => signOut(auth)