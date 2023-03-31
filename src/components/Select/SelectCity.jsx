import { useState } from "react"
import { useGeo } from "../../hooks/useGeo"
import { Select, SelectItem, SelectSearch } from "../index.js"

export const SelectCity = ({province, label, selected, ...props}) => {
  const [searchCity, setSearchCity] = useState('')
  const {cities} = useGeo(province)

  const city = searchCity ? cities.filter(e => e.nombre.toLowerCase().includes(searchCity.toLowerCase())) : cities

  return (
    <Select label={label} selected={cities && cities.find(e => e.id === selected)?.nombre}>
      <SelectSearch name="searchCity" placeholder='Buscar ciudad' onChange={({target: {value}}) => setSearchCity(value)} />
      {city.map(e => <SelectItem key={e.id} name='city' id={e.id} {...props} >{e.nombre}</SelectItem>)}
    </Select>
  )
}
