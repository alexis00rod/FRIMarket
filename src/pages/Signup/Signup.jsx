import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupEmail, SignupName, SignupPass, SignupPhoto, SignupUserID } from "../../components/index.js"
import { signupEmailPass } from "../../services/auth.js"
import { addProfile } from "../../services/firestore.js"
import { uploadUserPhoto } from "../../services/storage.js"

export const Signup = () => {
  const [signupUser, setSignupUser] = useState({})
  const [signupError, setSignupError] = useState()
  const navigate = useNavigate()

  const signup = async e => {
    e.preventDefault()
    setSignupError("")
    try {
      await signupEmailPass(signupUser)
      await addProfile(signupUser)
      navigate('/login')
    } catch (err) {
      setSignupError(`${err.code.replace("auth/","")}`)
    }
  }

  const handleUserPhoto = ({target:{files}}) => {
    setSignupUser({...signupUser,photoURL:false})
    uploadUserPhoto(signupUser,files[0])
      .then(resp => setSignupUser({...signupUser,photoURL:resp}))
  }

  return (
    <div className="w-full max-w-xl px-2 py-2 mx-auto flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
      <div className="px-3 py-3 flex items-center gap-2">
        <h2 className="text-xl font-semibold capitalize">Crear usuario</h2>
        <Link to='/login' className="px-2 text-sm text-yellow-500 font-medium hover:underline">Iniciar sesion</Link>
      </div>
      <form className="py-2 flex flex-col gap-2" onSubmit={signup}>
        {signupError && <p className="px-2 py-2 text-sm text-red-500">{signupError}</p>}
        <SignupEmail onChange={({target:{value}}) => setSignupUser({...signupUser,email:value})} />
        <SignupPass onChange={({target:{value}}) => setSignupUser({...signupUser,password:value})} />
        <div className="flex gap-2">
          <SignupPhoto selected={signupUser.photoURL} onChange={handleUserPhoto} />
          <div className="flex flex-col grow">
            <SignupName onChange={({target:{value}}) => setSignupUser({...signupUser,displayName:value})} />
            <SignupUserID onChange={({target:{value}}) => setSignupUser({...signupUser, idUser: value})} />
          </div>
        </div>
        <div className="w-full px-2 py-2 flex flex-col gap-2">
          <button type="submit" className="w-full h-8 flex justify-center items-center bg-blue-500 text-white text-sm rounded md">
            Crear usuario
          </button>
        </div>
      </form>
    </div>
  )
}
