import { app } from "./firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const auth = getAuth(app)

export const registerEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

// Funcion para iniciar sesio usando email y contraseña
export const loginEmailPass = (email,password) => signInWithEmailAndPassword(auth,email,password)

// Funcion para detectar el estado de la autenticacion
export const stateAuth = (set) => {
  const unsubuscribe = onAuthStateChanged(auth, currentUser => {set(currentUser)})
  return () => unsubuscribe()
}

// Funcion para cerrar sesion
export const logout = () => signOut(auth)

// Funcion para actualizar displayName
export const updateDisplayName = async ({name, lastName}) => {
  const user = auth.currentUser
  await updateProfile(user,{
    displayName: `${name} ${lastName}`
  })
}