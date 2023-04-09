import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Main, Element, SignupUser, SignupProfile } from "../../components/index.js"
import { signupEmailPass } from "../../services/auth.js"
import { addProfile } from "../../services/firestore.js"
import { uploadUserPhoto } from "../../services/storage.js"

export const Signup = () => {
  const [signupUser, setSignupUser] = useState({})
  const [singupProfile, setSingupProfile] = useState(false)
  const [signupError, setSignupError] = useState()
  const navigate = useNavigate()

  const regexp = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,12}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }

  const validateEmailPassword = async (user) => {
    const {email,password,confirmPassword,conditions} = user

    let emailTest = regexp.email.test(email)
    !emailTest && setSignupError("Email error")

    let passwordTest = regexp.password.test(password)
    !passwordTest && setSignupError("Contraseña error")
    
    let confirmPasswordTest = password === confirmPassword
    !confirmPasswordTest && setSignupError('Las contraseñas no coinciden')

    let conditionsTest = conditions === 'on' ? true : false
    !conditions && setSignupError('Acepta los terminos y condiciones')

    return emailTest && passwordTest && confirmPasswordTest && conditionsTest
  }

  const handleUserPhoto = ({target:{files}}) => {
    setSignupUser({...signupUser,photoURL:false})
    uploadUserPhoto(signupUser,files[0])
      .then(resp => setSignupUser({...signupUser,photoURL:resp}))
  }

  const handleSignup = ({target: {name,value,id}}) => {
    const val = name === 'province' || name === 'city' ? id : name === 'phone' ? parseFloat(value) : value 
    
    setSignupUser({
      ...signupUser,
      [name]: val
    })
  }

  const submitUser = async e => {
    e.preventDefault()
    const validate = await validateEmailPassword(signupUser)

    if(validate) {
      try {
        await signupEmailPass(signupUser)
        setSingupProfile(true)
      } catch (err) {
        setSignupError(`${err.code.replace("auth/","")}`)
      }
    }
  }

  const submitProfile = async e => {
    e.preventDefault()
    const {idUser,email,displayName,city,province, photoURL,phone} = signupUser
    setSignupError("")
    await addProfile({idUser,email,displayName,city,province, photoURL,phone})
    navigate('/login')
  }

  return (
    <Main size='main-size-medium'>
      <Element flex='flex-col'>
        <h2 className="box-header text-xl font-medium">Crear usuario</h2>
        <form className="box-body flex flex-col gap-4" onSubmit={submitProfile}>
          <div className="w-full flex flex-col items-center gap-4">
          {!singupProfile
          ? <>
              <SignupUser user={signupUser} err={signupError} onChange={handleSignup} />
              <div className="w-full flex items-center justify-between flex-wrap">
                <Link to='/login' className="link link-black">Iniciar sesion</Link>
                <Link to='/shop/all' className="link link-black">Volver a la tienda</Link>
              </div>
              <Button color='btn-blue' size='btn-l' onClick={submitUser}><span className="text-sm font-medium">Siguiente</span></Button>
            </>
          : <>
              <SignupProfile user={signupUser} photo={handleUserPhoto} onChange={handleSignup}/>
              <Button color='btn-blue' size='btn-l' onClick={submitProfile} ><span className="text-sm font-medium">Crear usuario</span></Button>
            </>}
          </div>
        </form>
      </Element>
    </Main>
  )
}
