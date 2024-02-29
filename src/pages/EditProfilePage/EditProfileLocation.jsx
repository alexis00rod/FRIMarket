import { useState } from "react"
import { Link } from "react-router-dom"
import { addLocationToUser, deleteLocationToUser } from "../../services/user"
import { formatCapitalize } from "../../services/format"
import { useLocations } from "../../hooks/useLocations"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputNumber, InputText, Loader, Select, SelectItem } from "../../components"

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


  if(!profile && !locations) return <Loader />

  return (
    <div className="w-full p-6 md:p-12 flex flex-col bg-white border border-gray-300 rounded-md">
      <div className="w-full flex items-center">
        <h3 className="grow text-lg font-medium">Domicilios</h3>
        <Link to='/editProfile' className="btn btn-m btn-blue btn-text">Volver</Link>
      </div>
      <div className="flex flex-col">
        {addLocation
        ? <>
            <div className="relative mt-6 mb-1.5">
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
                <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="pl-2 font-medium">Completa este campo.</span>
                </p>}
            </div>
            {locationToAdd?.province?.id &&
              <div className="relative mt-6 mb-1.5">
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
                <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="pl-2 font-medium">Completa este campo.</span>
                </p>}
              </div>}
            <div className="relative mt-6 mb-1.5">
              <InputText 
              label='Calle'
              size='input-m'
              name='street'
              id='street'
              value={locationToAdd?.street || ''}
              onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,street:value})}
              />
              {locationToAddError && locationToAddError.includes('street') && 
                <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="pl-2 font-medium">Completa este campo.</span>
                </p>}
            </div>
            <div className="relative mt-6 mb-1.5">
              <InputNumber
              label='Número de casa o apartamento'
              size='input-m'
              name='number'
              id='number'
              value={locationToAdd?.number || ''}
              onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,number:value})}
              />
              {locationToAddError && locationToAddError.includes('number') && 
                <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="pl-2 font-medium">Completa este campo.</span>
                </p>}
            </div>
            <div className="relative mt-6 mb-1.5">
              <InputText
              label='Piso (opcional)'
              size='input-m'
              name='apartment'
              id='apartment'
              value={locationToAdd?.apartment || ''}
              onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,apartment:value})}
              />
            </div>
            <div className="relative mt-6 mb-1.5">
              <InputNumber
              label='Código postal'
              size='input-m'
              name='postalCode'
              id='postalCode'
              value={locationToAdd?.postalCode || ''}
              onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,postalCode:value})}
              />
              {locationToAddError && locationToAddError.includes('postalCode') && 
                <p className="top-full left-0 absolute w-full pl-2 pt-0.5 flex items-center text-[0.8rem] text-red-500">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="pl-2 font-medium">Completa este campo.</span>
                </p>}
            </div>
            <div className="mt-6 flex gap-4">
              {addLocationLoading
              ? <ButtonLoader />
              : <>
                  <button onClick={submitAddLocation} className="btn btn-m btn-blue btn-text" >Agregar</button>
                  <button onClick={() => setAddLocation(false)} className="btn btn-m btn-red btn-text" >Cancelar</button>
                </>}
            </div>
          </>
        : <>
            {profile.locations && profile.locations.length >= 1 &&
              <ul className="w-full mt-6 mb-1.5 flex flex-col gap-4">
                {profile.locations.map((e,i) => 
                  <li key={i} className="w-full flex items-center">
                    <div className="w-[50px] h-[50px] flex items-center justify-center flex-none text-blue-500 rounded-full border border-gray-300">
                      <i className='text-xl fa-solid fa-home'></i>
                    </div>
                    <div className="ml-4 flex flex-col grow">
                      <p className="text-lg">{formatCapitalize(`${e.street} ${e.number} ${e.apartment ? e.apartment : ''}`)}</p>
                      <p className="text-[.8rem] leading-4">Codigo postal {e.postalCode}</p>
                      <p className="text-[.8rem] leading-4">{e.province.name} - {e.city.name}</p>
                    </div>
                    <button className="btn btn-s btn-text-red" onClick={() => deleteLocation(profile,e)}>
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </li>)}
              </ul>}
            <div className="mt-6">
              <button className="btn btn-m btn-blue btn-text" onClick={() => setAddLocation(true)}>
                <i className="fa-solid fa-plus"></i>
                Agregar nuevo domicilio
              </button>
            </div>
          </>}
      </div>
    </div>
  )
}
