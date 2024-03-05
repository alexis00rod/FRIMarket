import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { existsIdUser, updateDataUser, updateUser } from "../../services/user"
import { updateUserEmail } from "../../services/auth"
import { formatIdUser } from "../../services/format"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputNumber, InputPassword, InputText, Loader, Modal, Notification } from "../../components"

export const EditProfileAccount = () => {
  const {profile} = useProfile()
  const [account, setAccount] = useState({})
  const [accountError, setAccountError] = useState()
  const [accountLoading, setAccountLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    profile &&
      setAccount({
        email: profile.email,
        phone: profile.phone,
        idUser: profile.idUser
      })
  },[profile])

  const submitAccount = async e => {
    e.preventDefault()
    setAccountLoading(true)
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const err = []

    if(!account.email) {
      err.push('email')
    }
    if(!emailFormat.test(account.email)) {
      err.push('email-format')
    }
    if(!account.idUser) {
      err.push('id')
    }
    setAccountError(err)
    
    if(err.length === 0) {
      try {
        const existsUser = account.idUser !== profile.idUser && await existsIdUser(account.idUser)
        if(existsUser) {
          err.push('id-exists')
        } else {
          const accountDocs = {
            email: account.email,
            idUser: account.idUser
          }
          if(account.phone !== undefined) {
            accountDocs.phone = account.phone
          }
          if(account.email !== profile.email) {
            await updateUserEmail(account.email)
            await updateUser(profile, accountDocs)
            navigate('/editProfile')
          } else {
            await updateDataUser(profile.email,accountDocs)
            navigate('/editProfile')
          }
        }
        setAccountLoading(false)
      } catch (err) {
        setAccountLoading(false)
      }
    } else {
      setAccountLoading(false)
    }
  }

  if(!profile) return <Loader />

  return (
    <section className="editProfile">
      <div className="editProfile-form">
        <div className="editProfile-form-header">
          <h3>Datos de tu cuenta</h3>
          <Link to='/editProfile' className="btn btn-m btn-blue btn-text">Volver</Link>
        </div>
        <div className="editProfile-form-inputs">
          <div className="editProfile-form-input">
            <InputText 
            label='Email'
            name='email'
            id={account?.email || ''}
            value={account?.email || ''}
            onChange={({target:{value}}) => setAccount({...account,email:value})}
            />
            {accountError && accountError.includes('email') &&  
              <Notification message='Completa este campo.'/>}
            {accountError && accountError.includes('email-format') && !accountError.includes('email') && 
              <Notification message='Usá el formato nombre@ejemplo.com.'/>}
          </div>
          <div className="editProfile-form-input">
            <InputNumber 
            label='Teléfono de contacto'
            name='phone'
            id={account.phone || ''}
            value={account.phone || ''}
            onChange={({target:{value}}) => setAccount({...account,phone:value})}
            />
          </div>
          <div className="editProfile-form-input">
            <InputText 
            label='Nombre de usuario'
            name='idUser'
            id={account.idUser || ''}
            value={account.idUser || ''}
            onChange={({target:{value}}) => setAccount({...account,idUser: formatIdUser(value)})}
            />
            {accountError && accountError.includes('id') &&  
              <Notification message='Completa este campo.'/>}
            {accountError && accountError.includes('id-exists') &&  
              <Notification message='El usuario ya existe.'/>}
          </div>
        </div>
        <div className="editProfile-form-buttons">
          {accountLoading
          ? <ButtonLoader />
          : <button className="btn btn-m btn-blue btn-text" onClick={submitAccount}>Continuar</button>}
        </div>
      </div>
    </section>
  )
}
