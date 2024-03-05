import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { updateUserDisplayName } from "../../services/auth"
import { updateDataUser } from "../../services/user"
import { formatCapitalize } from "../../services/format"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputText, Loader, Notification } from "../../components"

export const EditProfileData = () => {
  const {profile} = useProfile()
  const [data, setData] = useState({})
  const [dataError, setDataError] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    profile &&
      setData({
        name: profile.name,
        lastName: profile.lastName
      })
  },[profile])

  const submitData = async e => {
    e.preventDefault()
    setDataLoading(true)
    const err = []

    if(!data.name) {
      err.push('name')
    }
    if(!data.lastName) {
      err.push('lastName')
    }
    setDataError(err)
    if (err.length === 0) {
      const dataFormatted = {
        name: formatCapitalize(data.name),
        lastName: formatCapitalize(data.lastName)
      }

      try {
        await updateUserDisplayName(dataFormatted)
        await updateDataUser(profile.email,dataFormatted)
        navigate('/editProfile')
      } catch (err) {
        alert(err)
      }
    } else {
      setDataLoading(false)
    }
  }

  if(!profile) return <Loader />

  return (
    <section className="editProfile">
      <div className="editProfile-form">
        <div className="editProfile-form-header">
          <h3>Datos personales</h3>
          <Link to='/editProfile' className="btn btn-m btn-blue btn-text">Volver</Link>
        </div>
        <div className="editProfile-form-inputs">
          <div className="editProfile-form-input">
            <InputText 
            label='Nombre'
            name='name'
            id={data?.name || ''}
            value={data?.name || ''}
            onChange={({target:{value}}) => setData({...data,name:value})}
            />
            {dataError && dataError.includes('name') && 
              <Notification message='Completa este campo.'/>}
          </div>
          <div className="editProfile-form-input">
            <InputText 
            label='Apellido'
            name='lastName'
            id={data?.lastName || ''}
            value={data?.lastName || ''}
            onChange={({target:{value}}) => setData({...data,lastName:value})}
            />
            {dataError && dataError.includes('lastName') && 
              <Notification message='Completa este campo.'/>}
          </div>
        </div>
        <div className="editProfile-form-buttons">
          {dataLoading
          ? <ButtonLoader />
          : <button className="btn btn-m btn-blue btn-text" onClick={submitData}>Continuar</button>}
        </div>
      </div>
    </section>
  )
}
