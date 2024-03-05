import { useState } from "react"
import { Link } from "react-router-dom"
import { addLocationToUser, deleteLocationToUser } from "../../services/user"
import { formatCapitalize } from "../../services/format"
import { useLocations } from "../../hooks/useLocations"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputNumber, InputText, Loader, Notification, Select, SelectItem } from "../../components"

export const EditProfileLocation = () => {
  const {profile} = useProfile()
  const {locations} = useLocations()
  const [addLocation, setAddLocation] = useState(false)
  const [locationToAdd, setLocationToAdd] = useState()
  const [locationToAddError, setLocationToAddError] = useState([])
  const [addLocationLoading, setAddLocationLoading] = useState(false)

  const submitAddLocation = async e => {
    e.preventDefault()
    setAddLocationLoading(true)
    const err = []
    if(!locationToAdd?.province?.id) {
      err.push('province')
    }
    if(!locationToAdd?.city?.id) {
      err.push('city')
    }
    if(!locationToAdd.street) {
      err.push('street')
    }
    if(!locationToAdd.number) {
      err.push('number')
    }
    if(!locationToAdd.postalCode) {
      err.push('postalCode')
    }
    setLocationToAddError(err)
    if(err.length === 0) {
      try {
        await addLocationToUser(profile, locationToAdd)
        setAddLocationLoading(false)
        setAddLocation(false)
        setLocationToAdd()
      } catch (err) {
        alert(err)
      }
    }
  }

  const deleteLocation = async (user,location) => {
    try {
      await deleteLocationToUser(user,location)
    } catch (err) {
      alert(err)
    }
  }

  if(!profile || !locations) return <Loader />

  return (
    <section className="editProfile">
      <div className="editProfile-form">
        <div className="editProfile-form-header">
          <h3>Domicilios</h3>
          <Link to='/editProfile' className="btn btn-m btn-blue btn-text">Volver</Link>
        </div>
        {addLocation
        ? <>
            <div className="editProfile-form-inputs">
              <div className="editProfile-form-input">
                <Select 
                label='Provincia'
                selected={locationToAdd?.province?.name || ''}
                >
                  {locations.map(e => 
                    <SelectItem
                    key={e.idProvince}
                    name='province'
                    id={e.nameProvince}
                    onChange={() => setLocationToAdd({...locationToAdd,province:{id:e.idProvince,name:e.nameProvince},city:{}})}
                    >
                      {e.nameProvince}
                    </SelectItem>)}
                </Select>
                {locationToAddError && locationToAddError.includes('province') && 
                  <Notification message='Completa este campo.'/>}
              </div>
              {locationToAdd?.province?.id &&
                <div className="editProfile-form-input">
                  <Select
                  label='Ciudad'
                  selected={locationToAdd?.city?.name || ''}
                  >
                    {locations.find(e => e.idProvince === locationToAdd.province.id).cities.map(city => 
                      <SelectItem
                      key={city.idCity}
                      name='city'
                      id={city.nameCity}
                      onChange={() => setLocationToAdd({...locationToAdd,city:{id:city.idCity,name:city.nameCity}})}
                      >
                        {city.nameCity}
                      </SelectItem>)}
                  </Select>
                  {locationToAddError && locationToAddError.includes('city') && 
                    <Notification message='Completa este campo.'/>}
                </div>}
              <div className="editProfile-form-input">
                <InputText 
                label='Calle'
                size='input-m'
                name='street'
                id='street'
                value={locationToAdd?.street || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,street:value})}
                />
                {locationToAddError && locationToAddError.includes('street') && 
                  <Notification message='Completa este campo.'/>}
              </div>
              <div className="editProfile-form-input">
                <InputNumber
                label='Número de casa o apartamento'
                size='input-m'
                name='number'
                id='number'
                value={locationToAdd?.number || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,number:value})}
                />
                {locationToAddError && locationToAddError.includes('number') && 
                  <Notification message='Completa este campo.'/>}
              </div>
              <div className="editProfile-form-input">
                <InputText
                label='Piso (opcional)'
                size='input-m'
                name='apartment'
                id='apartment'
                value={locationToAdd?.apartment || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,apartment:value})}
                />
              </div>
              <div className="editProfile-form-input">
                <InputNumber
                label='Código postal'
                size='input-m'
                name='postalCode'
                id='postalCode'
                value={locationToAdd?.postalCode || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,postalCode:value})}
                />
                {locationToAddError && locationToAddError.includes('postalCode') && 
                  <Notification message='Completa este campo.'/>}
              </div>
            </div>
            <div className="editProfile-form-buttons">
              {addLocationLoading
                ? <ButtonLoader />
                : <>
                    <button onClick={submitAddLocation} className="btn btn-m btn-blue btn-text" >Agregar</button>
                    <button onClick={() => setAddLocation(false)} className="btn btn-m btn-red btn-text" >Cancelar</button>
                  </>}
            </div>
          </>
        : <>
            <ul className="editProfile-form-list">
              {profile.locations.map((e,i) => 
                <li key={i} className="editProfile-form-item">
                  <i className='editProfile-icon fa-solid fa-home'></i>
                  <div className="editProfile-form-item-summary">
                    <p>{formatCapitalize(`${e.street} ${e.number} ${e.apartment ? e.apartment : ''}`)}</p>
                    <p>Codigo postal {e.postalCode}</p>
                    <p>{e.province.name} - {e.city.name}</p>
                  </div>
                  <button className="btn btn-s btn-text-red" onClick={() => deleteLocation(profile,e)}>
                    <i className="fa-solid fa-x"></i>
                  </button>
                </li>)}
            </ul>
            <div className="editProfile-form-buttons">
              <button className="btn btn-m btn-blue btn-text" onClick={() => setAddLocation(true)}>
                <i className="fa-solid fa-plus"></i>
                Agregar nuevo domicilio
              </button>
            </div>
          </>}
      </div>
    </section>
  )
}
