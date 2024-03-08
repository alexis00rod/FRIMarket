import { useState } from "react"
import { usePostContext } from "../context/PostContext"
import { InputRadio, Notification, Select, SelectItem } from "../../../components"

export const PostUserLocation = ({profileLocations,locations}) => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const [addLocation, setAddLocation] = useState(false)
  const [locationToAdd,setLocationToAdd] = useState()
  const [newLocation, setNewLocation] = useState()

  const handleCancelAddLocation = () => {
    setAddLocation(false)
    setLocationToAdd()
  }

  const handleAddLocation = () => {
    setNewLocation({
      province: locationToAdd.province,
      city: locationToAdd.city
    })
    setProductToPost({
      ...productToPost,
      user: {
        ...productToPost.user,
        province: locationToAdd.province,
        city: locationToAdd.city
      }
    })
    setAddLocation(false)
    setLocationToAdd()
  }

  return (
    <div className="post-input">
      <h3>Ubicación</h3>
      {addLocation
        ? <>
            <div className="flex flex-col gap-2">
              <Select
              label='Provincia'
              selected={locationToAdd?.province?.name || ''}
              >
                {locations.map(e => 
                  <SelectItem
                  key={e.idProvince}
                  id={e.nameProvince}
                  onChange={() => setLocationToAdd({...locationToAdd,province:{id:e.idProvince,name:e.nameProvince},city:{}})}
                  >
                    {e.nameProvince}
                  </SelectItem>)}
              </Select>
              {locationToAdd?.province?.id &&
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
                </Select>}
            </div>
            <div className="mt-2 flex gap-4">
              <button className="btn btn-s btn-red" onClick={handleCancelAddLocation} title="Cancelar">
                <i className="fa-solid fa-x"></i>
              </button>
              {locationToAdd?.city?.id &&
                <button 
                className="btn btn-green btn-s" 
                title="Agregar ubicación" 
                onClick={handleAddLocation}
                >
                  <i className="fa-solid fa-check"></i>
                </button>}
            </div>
          </>
        : <>
            {profileLocations.map(e => 
            <InputRadio
            key={e.idLocation}
            name='location'
            id={e.idLocation}
            checked={productToPost.user.province.id === e.province.id}
            onChange={() => setProductToPost({...productToPost, user: {...productToPost.user,province: e.province,city: e.city}})}
            >
              {e.province.name}, {e.city.name}
            </InputRadio>)}
            {newLocation && 
              <InputRadio
              id={newLocation.idLocation}
              name='location'
              checked={productToPost.user.province.id === newLocation.province.id}
              onChange={() => setProductToPost({...productToPost, user: {...productToPost.user,province: newLocation.province,city: newLocation.city}})}
              >
                {newLocation.province.name}, {newLocation.city.name}
              </InputRadio>}
            <button 
            className="w-max flex items-center text-sm text-yellow-500 duration-200 hover:text-yellow-700"
            onClick={() => setAddLocation(true)}
            >
              <i className="w-[22px] h-[22px] mr-2 flex items-center justify-center flex-none fa-solid fa-plus"></i>
              Agregar ubicación
            </button>
          </>}
      {productToPostError.includes('city')  &&
        <Notification message='Agrega tu ubicación'/>}
    </div>
  )
}
