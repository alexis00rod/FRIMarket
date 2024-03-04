import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCheckoutContext } from "./context/CheckoutContext"
import { formatCapitalize } from "../../services/format"
import { addLocationToUser } from "../../services/user"
import { useLocations } from "../../hooks/useLocations"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputNumber, InputRadio, InputText, Loader, Select, SelectItem } from "../../components"

export const CheckoutShipping = () => {
  const navigate = useNavigate()
  const {checkoutOrder, setCheckoutOrder} = useCheckoutContext()
  const {profile} = useProfile()
  const {locations} = useLocations()
  const [addLocation, setAddLocation] = useState(false)
  const [locationToAdd, setLocationToAdd] = useState()
  const [locationToAddLoader,setLocationToAddLoader] = useState(false)

  const submitCheckoutShipping = async e => { 
    e.preventDefault()
    navigate('/checkout/payment')
  }

  const submitAddLocation = async e => {
    e.preventDefault()
    setLocationToAddLoader(true)
    try {
      const locationDoc = {
        shipping: {
          id: locationToAdd.idLocation,
          address: {
            street: locationToAdd.street,
            number: locationToAdd.number,
            postalCode: locationToAdd.postalCode,
          },
          province: {
            id: locationToAdd.province.id,
            name: locationToAdd.province.name
          },
          city: {
            id: locationToAdd.city.id,
            name: locationToAdd.city.name
          }
        }
      }
      if(locationToAdd.apartment) {
        locationDoc.shipping.address.apartment = locationToAdd.apartment
      }
      const location = await addLocationToUser(profile, locationToAdd)
      setCheckoutOrder({
        ...checkoutOrder,
        shipping: location
      })
      navigate('/checkout/payment')
      setLocationToAddLoader(false)
    } catch (err) {
        alert(err)
        setLocationToAddLoader(false)
    }
  }

  const handleCancelAddLocation = () => {
    setAddLocation(false)
    setLocationToAdd()
  }

  const handleLocation = (location) => {
    const locationDoc = {
      shipping: {
        idLocation: location.idLocation,
        address: {
          street: location.street,
          number: location.number,
          postalCode: location.postalCode,
        },
        province: {
          id: location.province.id,
          name: location.province.name
        },
        city: {
          id: location.city.id,
          name: location.city.name
        }
      }
    }
    if(location.apartment) {
      locationDoc.shipping.address.apartment = location.apartment
    }
    setCheckoutOrder({...checkoutOrder,...locationDoc})
  }

  if(!profile || !locations) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <h3>Datos de envío</h3>
      {addLocation
      ? <>
          <div className="checkout-inputs">
            <div className="checkout-input">
              <Select
              label='Provincia'
              selected={locationToAdd?.province?.name || ''}
              >
                {locations.map(e => 
                  <SelectItem
                  key={e.idProvince}
                  name='province'
                  id={e.idProvince}
                  onChange={() => setLocationToAdd({...locationToAdd,province: {id:e.idProvince,name:e.nameProvince},city:{}})}
                  >
                    {e.nameProvince}
                  </SelectItem>)}
              </Select>
            </div>
            {locationToAdd?.province.id &&
              <div className="checkout-input">
                <Select
                label='Ciudad'
                selected={locationToAdd?.city?.name || ''}
                >
                  {locations.find(e => e.idProvince === locationToAdd.province.id).cities.map(e => 
                    <SelectItem
                    key={e.idCity}
                    name='city'
                    id={e.idCity}
                    onChange={() => setLocationToAdd({...locationToAdd,city: {id:e.idCity,name:e.nameCity}})}
                    >
                      {e.nameCity}
                    </SelectItem>)}
                </Select>
              </div>}
            <div className="checkout-input">
              <InputText 
                label='Calle'
                size='input-m'
                name='street'
                id='street'
                value={locationToAdd?.street || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,street:value})}
                />
            </div>
            <div className="checkout-input">
              <InputNumber
                label='Número de casa o apartamento'
                size='input-m'
                name='number'
                id='number'
                value={locationToAdd?.number || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,number:value})}
                />
            </div>
            <div className="checkout-input">
              <InputText
                label='Piso (opcional)'
                size='input-m'
                name='apartment'
                id='apartment'
                value={locationToAdd?.apartment || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,apartment:value})}
                />
            </div>
            <div className="checkout-input">
              <InputNumber
                label='Código postal'
                size='input-m'
                name='postalCode'
                id='postalCode'
                value={locationToAdd?.postalCode || ''}
                onChange={({target:{value}}) => setLocationToAdd({...locationToAdd,postalCode:value})}
                />
            </div>
          </div>
          <div className="checkout-buttons">
            {locationToAddLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-blue btn-text btn-m"
              disabled={!locationToAdd?.province || !locationToAdd?.city || !locationToAdd?.street || !locationToAdd?.number || !locationToAdd?.postalCode}
              onClick={submitAddLocation}
              >
                Agregar
              </button>}
              <button className="btn btn-text-blue btn-m btn-text" onClick={handleCancelAddLocation}>
                Cancelar
              </button>
          </div>
        </>
      : <>
          <div className="checkout-inputs gap-1 pb-4">
            {profile.locations.map((e) => 
            <InputRadio
            key={e.idLocation}
            name='location'
            id={e.idLocation}
            checked={e.idLocation === checkoutOrder.shipping?.idLocation}
            onChange={() => handleLocation(e)}
            >
              <div className="flex flex-col">
                <p className="mb-1 font-medium">{formatCapitalize(`${e.street} ${e.number} ${e.apartment ? e.apartment : ''}`)}</p>
                <p className="text-sm leading-4">C.P {e.postalCode}</p>
                <p className="text-sm leading-4">{e.province.name} - {e.city.name}</p>
              </div>
            </InputRadio>)}
          </div>
          <div className="checkout-buttons">
            <button 
            className="btn btn-m btn-blue btn-text" 
            disabled={!checkoutOrder.shipping}
            onClick={submitCheckoutShipping}
            >
              Continuar
            </button>
            <button 
            className="btn btn-text-blue btn-m btn-text"
            onClick={() => setAddLocation(true)}
            >
              Agregar domicilio
            </button>
          </div>
        </>}
    </>
  )
}
