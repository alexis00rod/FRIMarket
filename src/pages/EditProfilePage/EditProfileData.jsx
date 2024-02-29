import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { formatCapitalize } from "../../services/format"
import { updateUserDisplayName } from "../../services/auth"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputText, Loader } from "../../components"
import { updateDataUser } from "../../services/user"

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
    <div className="w-full p-12 flex flex-col bg-white border border-gray-300 rounded-md">
      <div className="w-full flex items-center">
        <h3 className="grow text-lg font-medium">Datos personales</h3>
        <Link to='/editProfile' className="btn btn-m btn-blue btn-text">Volver</Link>
      </div>
      <div className="w-full flex flex-col">
        <div className="relative mt-6 mb-1.5">
          <InputText 
          label='Nombre'
          name='name'
          id={data?.name || ''}
          value={data?.name || ''}
          onChange={({target:{value}}) => setData({...data,name:value})}
          />
          {dataError && dataError.includes('name') && 
            <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="pl-2 font-medium">Completa este campo.</span>
            </p>}
        </div>
        <div className="relative mt-6 mb-1.5">
          <InputText 
          label='Apellido'
          name='lastName'
          id={data?.lastName || ''}
          value={data?.lastName || ''}
          onChange={({target:{value}}) => setData({...data,lastName:value})}
          />
          {dataError && dataError.includes('lastName') && 
            <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="pl-2 font-medium">Completa este campo.</span>
            </p>}
        </div>
        <div className="mt-6" >
          {dataLoading
          ? <ButtonLoader />
          : <button className="btn btn-m btn-blue btn-text" onClick={submitData}>Continuar</button>}
        </div>
      </div>
    </div>
  )
}
