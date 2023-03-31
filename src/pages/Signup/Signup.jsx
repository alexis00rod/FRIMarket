import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, InputEmail, InputPassword, InputPhoto, InputText, SelectCity, SelectProvince } from "../../components/index.js"
import { signupEmailPass } from "../../services/auth.js"
import { addProfile } from "../../services/firestore.js"
import { uploadUserPhoto } from "../../services/storage.js"

export const Signup = () => {
  const [signupUser, setSignupUser] = useState({})
  const [singupProfile, setSingupProfile] = useState(false)
  const [signupError, setSignupError] = useState()
  const navigate = useNavigate()

  const handleUserPhoto = ({target:{files}}) => {
    setSignupUser({...signupUser,photoURL:false})
    uploadUserPhoto(signupUser,files[0])
      .then(resp => setSignupUser({...signupUser,photoURL:resp}))
  }

  const handleSignup = ({target: {name,value,id}}) => {
    setSignupUser({
      ...signupUser,
      [name]: name === 'province' || name === 'city' ? id : value
    })
  }

  const nextStep = async e => {
    e.preventDefault()
    try {
      await signupEmailPass(signupUser)
      setSingupProfile(true)
    } catch (err) {
      setSignupError(`${err.code.replace("auth/","")}`)
    }
  }

  const submitSignup = async e => {
    e.preventDefault()
    setSignupError("")
    await addProfile(signupUser)
    navigate('/login')
  }

  return (
    <main>
      <div className="box box-form">
        <h2 className="box-header text-xl font-medium">Crear usuario</h2>
        <form className="box-body flex flex-col gap-4" onSubmit={submitSignup}>
          <div className="w-full flex flex-col items-center gap-4">
            {!singupProfile
            ? <>
                {signupError && <p className="px-2 py-2 text-sm text-red-500">{signupError}</p>}
                <InputEmail label='Email' value={signupUser.email} onChange={handleSignup} />
                <InputPassword label='Contraseña' id='password' value={signupUser.password} onChange={handleSignup} />
                <InputPassword label='Repetir contraseña' id='confirmPassword' value={signupUser.confirmPassword} onChange={handleSignup} />
              </>
            : <>
                <div className="w-full flex gap-4">
                  <div className="w-full flex flex-col justify-between">
                    <InputText label='Nombre y apellido' id='displayName' name='displayName' onChange={handleSignup} />
                    <InputText label='Nombre de usuario' id='idUser' name='idUser' onChange={handleSignup} />
                  </div>
                  <InputPhoto id='photoURL' label='Foto' photo={signupUser.photoURL} onChange={handleUserPhoto} />
                </div>
                <div className="w-full flex flex-wrap gap-4">
                  <SelectProvince label='Provincia' selected={signupUser.province} onChange={handleSignup} />
                  <SelectCity label='Ciudad' province={signupUser.province} selected={signupUser.city} onChange={handleSignup} />
                </div>
              </>}
            <div className="w-full flex items-center justify-between flex-wrap">
              <Link to='/login' className="link link-black">Iniciar sesion</Link>
              <Link to='/shop/all' className="link link-black">Volver a la tienda</Link>
            </div>
            {!singupProfile
            ? <Button color='btn-blue' size='btn-l' onClick={nextStep}><span className="text-sm font-medium">Siguiente</span></Button>
            : <Button type='submit' color='btn-blue' size='btn-l' ><span className="text-sm font-medium">Crear usuario</span></Button>}
          </div>
        </form>
      </div>
    </main>
  )
}
